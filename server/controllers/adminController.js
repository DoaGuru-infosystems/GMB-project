const db = require('../config/db');
const bcrypt = require('bcryptjs');
const generateClientId = require('../utils/generateClientId');

exports.createClient = async (req, res) => {
    console.log("Creating client with body:", req.body);
    const { name, businessName, keywords, email, mobile, password, placeId, logo, primaryColor, secondaryColor, questions } = req.body;

    const clientId = generateClientId();

    try {
        const hashed = await bcrypt.hash(password, 10);

        const query = `
        INSERT INTO clients 
        (clientId, name, businessName, keywords, email, mobile, password, placeId, logo, websiteUrl, primaryColor, secondaryColor, questions, isActive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

        db.query(
            query,
            [clientId, name, businessName, JSON.stringify(Array.isArray(keywords) ? keywords : (keywords ? keywords.split(',').map(k => k.trim()).filter(Boolean) : [])), email, mobile, hashed, placeId, logo, req.body.websiteUrl, primaryColor || '#3b82f6', secondaryColor || '#2dd4bf', JSON.stringify(questions || []), true], // Default active
            (err) => {
                if (err) {
                    console.error("DB Error:", err);
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ message: "Client with this email or ID already exists" });
                    }
                    return res.status(500).json({ message: "Error creating client: " + err.message });
                }

                res.json({ message: "Client created successfully" });
            }
        );
    } catch (error) {
        console.error("Hashing error", error);
        res.status(500).json({ message: "Error creating client credentials" });
    }
};

// Get Clients
exports.getClients = (req, res) => {
    db.query("SELECT * FROM clients ORDER BY createdAt DESC", (err, result) => {
        if (err) {
            console.error("DB Error in getClients:", err);
            return res.status(500).json({ message: "Error fetching clients: " + err.message, sqlError: err });
        }

        // Remove passwords before sending to frontend
        const safeClients = result.map(client => {
            const { password, ...safeData } = client;
            if (safeData.questions && typeof safeData.questions === 'string') {
                try {
                    safeData.questions = JSON.parse(safeData.questions);
                } catch (e) {
                    safeData.questions = [];
                }
            }
            if (safeData.keywords && typeof safeData.keywords === 'string') {
                try {
                    const parsed = JSON.parse(safeData.keywords);
                    safeData.keywords = Array.isArray(parsed) ? parsed : safeData.keywords.split(',').map(k => k.trim()).filter(Boolean);
                } catch (e) {
                    safeData.keywords = safeData.keywords.split(',').map(k => k.trim()).filter(Boolean);
                }
            } else if (!safeData.keywords) {
                safeData.keywords = [];
            }
            return safeData;
        });

        res.json(safeClients);
    });
};

// Toggle client status
exports.toggleClientStatus = (req, res) => {
    const { clientId } = req.params;
    const { isActive } = req.body; // Expect boolean

    const query = "UPDATE clients SET isActive = ? WHERE clientId = ?";
    db.query(query, [isActive, clientId], (err) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ message: "Error updating status" });
        }
        res.json({ message: `Client status updated to ${isActive ? 'Active' : 'Inactive'}` });
    });
};

exports.updateClient = async (req, res) => {
    const { clientId } = req.params;
    const { name, businessName, keywords, email, mobile, placeId, logo, primaryColor, secondaryColor, questions } = req.body;
    let password = req.body.password;

    try {
        const keywordsJson = JSON.stringify(Array.isArray(keywords) ? keywords : (keywords ? keywords.split(',').map(k => k.trim()).filter(Boolean) : []));
        let query = "UPDATE clients SET name=?, businessName=?, keywords=?, email=?, mobile=?, placeId=?, logo=?, websiteUrl=?, primaryColor=?, secondaryColor=?, questions=? WHERE clientId=?";
        let params = [name, businessName, keywordsJson, email, mobile, placeId, logo, req.body.websiteUrl, primaryColor, secondaryColor, JSON.stringify(questions || []), clientId];

        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            query = "UPDATE clients SET name=?, businessName=?, keywords=?, email=?, mobile=?, password=?, placeId=?, logo=?, websiteUrl=?, primaryColor=?, secondaryColor=?, questions=? WHERE clientId=?";
            params = [name, businessName, keywordsJson, email, mobile, hashed, placeId, logo, req.body.websiteUrl, primaryColor, secondaryColor, JSON.stringify(questions || []), clientId];
        }

        db.query(query, params, (err) => {
            if (err) {
                console.error("DB Error updating client:", err);
                return res.status(500).json({ message: "Error updating client" });
            }
            res.json({ message: "Client updated successfully" });
        });
    } catch (error) {
        console.error("Hashing error", error);
        res.status(500).json({ message: "Error processing request" });
    }
};

// Notifications — includes client name for display
exports.getNotifications = (req, res) => {
    const query = `
        SELECT n.*, c.name as clientName, c.businessName, c.email as clientEmail
        FROM notifications n
        LEFT JOIN clients c ON n.clientId = c.clientId
        ORDER BY n.createdAt DESC
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error("DB Error in getNotifications:", err);
            return res.status(500).json({ message: "Error fetching notifications" });
        }
        res.json(result);
    });
};

exports.getExpiringSubscriptions = (req, res) => {
    const daysAhead = parseInt(req.query.days) || 7;
    const query = `
        SELECT 
            s.id as subscriptionId,
            s.end_date,
            s.status,
            DATEDIFF(s.end_date, NOW()) as daysLeft,
            c.clientId,
            c.name as clientName,
            c.businessName,
            c.email as clientEmail,
            c.mobile as clientMobile,
            p.name as planName,
            p.price as planPrice
        FROM subscriptions s
        JOIN clients c ON s.clientId = c.clientId
        JOIN subscription_plans p ON s.planId = p.id
        WHERE s.status = 'active'
          AND c.isActive = 1
          AND s.end_date > NOW()
          AND DATEDIFF(s.end_date, NOW()) <= ?
        ORDER BY s.end_date ASC
    `;
    db.query(query, [daysAhead], (err, result) => {
        if (err) {
            console.error("DB Error in getExpiringSubscriptions:", err);
            return res.status(500).json({ message: "Error fetching expiring subscriptions" });
        }
        res.json(result);
    });
};

exports.markNotificationRead = (req, res) => {
    const { id } = req.params;
    db.query("UPDATE notifications SET is_read = 1 WHERE id = ?", [id], (err) => {
        if (err) {
            console.error("DB Error in markNotificationRead:", err);
            return res.status(500).json({ message: "Error updating notification" });
        }
        res.json({ message: "Notification marked as read" });
    });
};

