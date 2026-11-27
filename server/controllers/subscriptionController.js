const db = require("../config/db");

const getCodeDrivenPlans = async () => {
  const [dbPlans] = await db
    .promise()
    .query("SELECT * FROM subscription_plans WHERE is_active = 1");
  return dbPlans.map(plan => ({
    id: plan.id,
    plan_code: plan.plan_code,
    name: plan.plan_name,
    description: plan.description,
    price: parseFloat(plan.price),
    currency: plan.currency || "INR",
    duration_days: plan.duration_days,
    max_reviews_per_month: plan.max_reviews_per_month,
    features: typeof plan.features === 'string' ? JSON.parse(plan.features) : (plan.features || []),
    badge: plan.badge || null
  }));
};

// Get all subscription plans
exports.getSubscriptionPlans = async (req, res) => {
  try {
    const plans = await getCodeDrivenPlans();
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

exports.getSubscriptionPlanById = async (req, res) => {
  const { planId } = req.params;

  try {
    const plans = await getCodeDrivenPlans();
    const numericPlanId = Number(planId);
    const plan = plans.find(
      (item) => item.id === numericPlanId || item.plan_code === planId
    );

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

// Get active client details for subscription page
exports.getActiveClientForSubscription = (req, res) => {
  const { clientId } = req.params;

  if (!clientId) {
    return res.status(400).json({ message: "clientId is required" });
  }

  const query = `
    SELECT 
      c.id,
      c.clientId,
      c.name,
      b.business_name as businessName,
      c.email,
      c.mobile,
      bb.logo,
      c.is_active as isActive,
      s.id as subscriptionId,
      s.status as subscriptionStatus,
      s.start_date,
      s.end_date,
      p.plan_name as planName,
      p.price as planPrice,
      p.duration_days
    FROM clients c
    LEFT JOIN businesses b ON b.client_id = c.id
    LEFT JOIN business_branding bb ON bb.business_id = b.id
    LEFT JOIN subscriptions s 
      ON s.client_id = c.id 
      AND s.status = 'active' 
      AND s.end_date > NOW()
    LEFT JOIN subscription_plans p ON s.plan_id = p.id
    WHERE c.clientId = ? AND c.is_active = 1
    ORDER BY s.created_at DESC
    LIMIT 1
  `;

  db.query(query, [clientId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Active client not found" });
    }

    res.json(results[0]);
  });
};

// Get client's current subscription
exports.getClientSubscription = (req, res) => {
  const clientId = req.user.clientId || req.user.clientID;

  const query = `
    SELECT s.id, s.client_id, s.plan_id as planId, s.status, s.start_date, s.end_date, s.renewal_date,
           s.auto_renew, s.amount_paid, s.payment_method, s.transaction_id, s.notes,
           s.created_at as createdAt, s.updated_at as updatedAt, s.reminder_sent,
           p.plan_name as planName, p.price, p.duration_days, p.max_reviews_per_month, p.features
    FROM subscriptions s
    JOIN clients c ON s.client_id = c.id
    JOIN subscription_plans p ON s.plan_id = p.id
    WHERE c.clientId = ? AND s.status = 'active'
    ORDER BY s.created_at DESC
    LIMIT 1
  `;

  db.query(query, [clientId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    if (results.length === 0) {
      return res.json(null); // No active subscription
    }
    res.json(results[0]);
  });
};

// Register a subscription for a client (Admin only)
exports.registerSubscription = async (req, res) => {
  const {
    clientId,
    planId,
    planCode,
    auto_renew = true,
    amount_paid = 0,
    payment_method = 'manual',
    transaction_id = null,
    notes = ''
  } = req.body;

  if (!clientId || (!planId && !planCode)) {
    return res.status(400).json({ message: "clientId and planId are required" });
  }

  try {
    const connection = db.promise();
    
    // Get client database ID
    const [clientRows] = await connection.query("SELECT id FROM clients WHERE clientId = ?", [clientId]);
    if (clientRows.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    const clientDbId = clientRows[0].id;

    const planLookupQuery = planId
      ? "SELECT * FROM subscription_plans WHERE id = ? AND is_active = 1"
      : "SELECT * FROM subscription_plans WHERE plan_code = ? AND is_active = 1";
    const planLookupValue = planId || planCode;
    const [planResults] = await connection.query(planLookupQuery, [planLookupValue]);

    if (planResults.length === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const dbPlan = planResults[0];
    const resolvedPlanId = dbPlan.id;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + dbPlan.duration_days);

    // Start transaction
    await connection.query("START TRANSACTION");

    const [existingResults] = await connection.query(
      "SELECT * FROM subscriptions WHERE client_id = ? AND status = 'active'",
      [clientDbId]
    );

    if (existingResults.length > 0) {
      const oldSubscriptionId = existingResults[0].id;
      const oldPlanId = existingResults[0].plan_id;

      await connection.query(
        "UPDATE subscriptions SET status = 'expired' WHERE id = ?",
        [oldSubscriptionId]
      );

      await connection.query(
        "INSERT INTO subscription_history (client_id, subscription_id, action, old_plan_id, new_plan_id, notes) VALUES (?, ?, ?, ?, ?, ?)",
        [clientDbId, oldSubscriptionId, 'upgraded', oldPlanId, resolvedPlanId, 'Subscription changed']
      );
    }

    const [result] = await connection.query(
      `
        INSERT INTO subscriptions
        (client_id, plan_id, status, start_date, end_date, auto_renew, amount_paid, payment_method, transaction_id, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [clientDbId, resolvedPlanId, 'active', startDate, endDate, auto_renew ? 1 : 0, amount_paid, payment_method, transaction_id, notes]
    );

    await connection.query(
      "INSERT INTO subscription_history (client_id, subscription_id, action, new_plan_id) VALUES (?, ?, ?, ?)",
      [clientDbId, result.insertId, 'created', resolvedPlanId]
    );

    await connection.query("COMMIT");

    res.status(201).json({
      message: "Subscription registered successfully",
      subscriptionId: result.insertId,
      clientId,
      planId: resolvedPlanId,
      planCode: dbPlan.plan_code,
      startDate,
      endDate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register subscription" });
  }
};

// Get all subscriptions for a client (Admin)
exports.getClientSubscriptionHistory = (req, res) => {
  const { clientId } = req.params;

  const query = `
    SELECT s.id, s.start_date, s.end_date, s.renewal_date, s.status, s.amount_paid, s.payment_method, s.transaction_id, s.notes,
           s.created_at as createdAt, p.plan_name as planName, p.price
    FROM subscriptions s
    JOIN clients c ON s.client_id = c.id
    JOIN subscription_plans p ON s.plan_id = p.id
    WHERE c.clientId = ?
    ORDER BY s.created_at DESC
  `;

  db.query(query, [clientId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

// Get all subscriptions (Admin only)
exports.getAllSubscriptions = (req, res) => {
  const query = `
    SELECT s.id, s.start_date, s.end_date, s.renewal_date, s.status, s.amount_paid, s.payment_method, s.transaction_id, s.notes,
           s.created_at as createdAt, p.plan_name as planName, p.price, c.name as clientName, c.email, c.clientId
    FROM subscriptions s
    JOIN subscription_plans p ON s.plan_id = p.id
    JOIN clients c ON s.client_id = c.id
    ORDER BY s.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

// Get subscription statistics
exports.getSubscriptionStats = (req, res) => {
  const query = `
    SELECT 
      COUNT(DISTINCT CASE WHEN s.status = 'active' THEN c.clientId END) as activeSubscriptions,
      COUNT(DISTINCT CASE WHEN s.status = 'expired' THEN c.clientId END) as expiredSubscriptions,
      COUNT(DISTINCT CASE WHEN s.status = 'cancelled' THEN c.clientId END) as cancelledSubscriptions,
      SUM(CASE WHEN s.status = 'active' THEN s.amount_paid ELSE 0 END) as totalActiveRevenue,
      p.plan_name as planName,
      COUNT(*) as count
    FROM subscriptions s
    LEFT JOIN subscription_plans p ON s.plan_id = p.id
    LEFT JOIN clients c ON s.client_id = c.id
    GROUP BY p.plan_name
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

// Check if subscription is valid
exports.checkSubscriptionValidity = (req, res) => {
  const clientId = req.user.clientId || req.user.clientID;

  const query = `
    SELECT s.id, s.start_date as start_date, s.end_date as end_date, s.auto_renew, p.plan_name as planName
    FROM subscriptions s
    JOIN clients c ON s.client_id = c.id
    JOIN subscription_plans p ON s.plan_id = p.id
    WHERE c.clientId = ? AND s.status = 'active' AND s.end_date > NOW()
  `;

  db.query(query, [clientId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.json({ isValid: false, message: "No active subscription found" });
    }

    const subscription = results[0];
    const daysRemaining = Math.ceil((new Date(subscription.end_date) - new Date()) / (1000 * 60 * 60 * 24));

    res.json({
      isValid: true,
      subscription: {
        id: subscription.id,
        planName: subscription.planName,
        startDate: subscription.start_date,
        endDate: subscription.end_date,
        daysRemaining,
        autoRenew: subscription.auto_renew
      }
    });
  });
};

// Cancel subscription
exports.cancelSubscription = (req, res) => {
  const { subscriptionId } = req.params;

  const query = "UPDATE subscriptions SET status = 'cancelled' WHERE id = ?";

  db.query(query, [subscriptionId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to cancel subscription" });
    }

    // Get subscription details for history
    db.query("SELECT * FROM subscriptions WHERE id = ?", [subscriptionId], (err, results) => {
      if (results && results.length > 0) {
        db.query(
          "INSERT INTO subscription_history (client_id, subscription_id, action) VALUES (?, ?, ?)",
          [results[0].client_id, subscriptionId, 'cancelled'],
          (err) => {
            if (err) console.error(err);
          }
        );
      }
    });

    res.json({ message: "Subscription cancelled successfully" });
  });
};

// Renew subscription
exports.renewSubscription = (req, res) => {
  const { subscriptionId } = req.params;

  db.query("SELECT * FROM subscriptions WHERE id = ?", [subscriptionId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const subscription = results[0];

    db.query("SELECT * FROM subscription_plans WHERE id = ?", [subscription.plan_id], (err, planResults) => {
      if (err || planResults.length === 0) {
        return res.status(404).json({ message: "Plan not found" });
      }

      const dbPlan = planResults[0];
      const newEndDate = new Date();
      newEndDate.setDate(newEndDate.getDate() + dbPlan.duration_days);

      db.query(
        "UPDATE subscriptions SET end_date = ?, status = 'active', renewal_date = NOW() WHERE id = ?",
        [newEndDate, subscriptionId],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to renew subscription" });
          }

          // Record in history
          db.query(
            "INSERT INTO subscription_history (client_id, subscription_id, action) VALUES (?, ?, ?)",
            [subscription.client_id, subscriptionId, 'renewed'],
            (err) => {
              if (err) console.error(err);
            }
          );

          res.json({ message: "Subscription renewed successfully", newEndDate });
        }
      );
    });
  });
};

// Create a new subscription plan
exports.createSubscriptionPlan = async (req, res) => {
  const { plan_code, plan_name, description, price, currency, duration_days, max_reviews_per_month, features, badge } = req.body;
  if (!plan_code || !plan_name) {
    return res.status(400).json({ message: "Plan code and name are required" });
  }
  const connection = db.promise();
  try {
    const [result] = await connection.query(
      `INSERT INTO subscription_plans 
       (plan_code, plan_name, description, price, currency, duration_days, max_reviews_per_month, features, badge, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [plan_code, plan_name, description || '', price || 0, currency || 'INR', duration_days || 30, max_reviews_per_month || null, JSON.stringify(features || []), badge || null]
    );
    res.status(201).json({ message: "Plan created successfully", id: result.insertId });
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// Update an existing subscription plan
exports.updateSubscriptionPlan = async (req, res) => {
  const { planId } = req.params;
  const { plan_code, plan_name, description, price, currency, duration_days, max_reviews_per_month, features, badge, is_active } = req.body;
  const connection = db.promise();
  try {
    await connection.query(
      `UPDATE subscription_plans SET 
        plan_code = ?, plan_name = ?, description = ?, price = ?, currency = ?, 
        duration_days = ?, max_reviews_per_month = ?, features = ?, badge = ?, is_active = ?
       WHERE id = ?`,
      [plan_code, plan_name, description || '', price || 0, currency || 'INR', duration_days || 30, max_reviews_per_month || null, JSON.stringify(features || []), badge || null, is_active ?? 1, planId]
    );
    res.json({ message: "Plan updated successfully" });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// Delete a subscription plan
exports.deleteSubscriptionPlan = async (req, res) => {
  const { planId } = req.params;
  const connection = db.promise();
  try {
    await connection.query("DELETE FROM subscription_plans WHERE id = ?", [planId]);
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ message: "Database error" });
  }
};
