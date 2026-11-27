const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getCookieOptions = (req) => {
  const host = req.headers.host || "";
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1") || host.startsWith("192.168.");
  
  return {
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: isLocalhost ? "lax" : "none",
  };
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // First check admin
  db.query("SELECT * FROM admins WHERE email = ?", [email], async (err, adminResult) => {
    if (err) {
      console.error("Admin DB Error:", err);
      return res.status(500).json({ message: "Admin DB Error: " + err.message });
    }

    try {
      if (adminResult && adminResult.length > 0) {
        const admin = adminResult[0];

        if (!admin.password) {
          return res.status(500).json({ message: "Admin account has no password set" });
        }

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
          return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
          { id: admin.id, role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.cookie("token", token, getCookieOptions(req));

        return res.json({ message: "Admin login success", role: "admin", token });
      }

      // If not admin, check client with JOIN to fetch businesses & branding details
      db.query(
        `SELECT c.id, c.clientId, c.name, c.email, c.password, c.is_active as isActive,
                b.business_name as businessName, bb.logo
         FROM clients c
         LEFT JOIN businesses b ON b.client_id = c.id
         LEFT JOIN business_branding bb ON bb.business_id = b.id
         WHERE c.email = ?`,
        [email],
        async (err2, clientResult) => {
          if (err2) {
            console.error("Client DB Error:", err2);
            return res.status(500).json({ message: "Client DB Error: " + err2.message });
          }

          try {
            if (!clientResult || clientResult.length === 0) {
              return res.status(400).json({ message: "User not found" });
            }

            const user = clientResult[0];

            if (!user.password) {
              return res.status(500).json({ message: "Client account has no password set" });
            }

            if (!user.isActive) {
              return res.status(403).json({ message: "Account is deactivated. Contact admin." });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
              return res.status(400).json({ message: "Invalid password" });
            }

            // Check subscription validity on normalized table
            db.query(
              `SELECT s.id, s.end_date, p.plan_name as planName 
               FROM subscriptions s 
               JOIN subscription_plans p ON s.plan_id = p.id 
               WHERE s.client_id = ? AND s.status = 'active' AND s.end_date > NOW()
               ORDER BY s.created_at DESC LIMIT 1`,
              [user.id],
              (err, subscriptionResult) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ message: "Error checking subscription" });
                }

                const hasActiveSubscription = subscriptionResult && subscriptionResult.length > 0;

                if (!hasActiveSubscription) {
                  return res.status(403).json({
                    message: "No active subscription. Please register for a subscription plan.",
                    needsSubscription: true,
                    clientId: user.clientId
                  });
                }

                const token = jwt.sign(
                  {
                    clientId: user.clientId,
                    role: "client",
                    businessName: user.businessName,
                    logo: user.logo,
                    subscriptionId: subscriptionResult[0].id,
                    planName: subscriptionResult[0].planName
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: "1d" }
                );

                res.cookie("token", token, getCookieOptions(req));

                return res.json({
                  message: "Client login success",
                  role: "client",
                  token,
                  subscription: {
                    id: subscriptionResult[0].id,
                    planName: subscriptionResult[0].planName,
                    endDate: subscriptionResult[0].end_date
                  }
                });
              }
            );
          } catch (error) {
            console.error("Client login verification error:", error);
            return res.status(500).json({ message: "Internal server error during login" });
          }
        }
      );
    } catch (error) {
      console.error("Admin login verification error:", error);
      return res.status(500).json({ message: "Internal server error during login" });
    }
  });
};

exports.logout = (req, res) => {
  const cookieOptions = getCookieOptions(req);
  res.cookie("token", "", {
    ...cookieOptions,
    expires: new Date(0),
  });
  res.json({ message: "Logout successful" });
};

exports.verifyAuth = (req, res) => {
  if (req.user.role === 'admin') {
    return res.json({ isAuthenticated: true, user: req.user });
  }

  // For clients, fetch latest branding and profile info via JOINs
  db.query(
    `SELECT c.clientId, c.name, c.email, c.mobile,
            b.business_name as businessName, bb.logo, bb.primary_color as primaryColor, bb.secondary_color as secondaryColor
     FROM clients c
     LEFT JOIN businesses b ON b.client_id = c.id
     LEFT JOIN business_branding bb ON bb.business_id = b.id
     WHERE c.clientId = ?`,
    [req.user.clientId],
    (err, results) => {
      if (err || results.length === 0) {
        return res.json({ isAuthenticated: true, user: req.user });
      }
      const latestUser = { ...req.user, ...results[0] };
      res.json({ isAuthenticated: true, user: latestUser });
    }
  );
};
