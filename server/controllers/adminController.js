const db = require('../config/db');
const bcrypt = require('bcryptjs');
const generateClientId = require('../utils/generateClientId');

// Create Client
exports.createClient = async (req, res) => {
    console.log("Creating client with body:", req.body);
    const { name, businessName, keywords, email, mobile, password, placeId, logo, primaryColor, secondaryColor, questions } = req.body;
    const websiteUrl = req.body.websiteUrl;

    const clientId = generateClientId();
    const connection = db.promise();

    try {
        const hashed = await bcrypt.hash(password, 10);
        
        // Start transaction
        await connection.query("START TRANSACTION");

        // 1. Insert Client credentials
        const [clientResult] = await connection.query(
            "INSERT INTO clients (clientId, name, email, mobile, password, is_active) VALUES (?, ?, ?, ?, ?, 1)",
            [clientId, name, email, mobile, hashed]
        );
        const clientDbId = clientResult.insertId;

        // 2. Insert Business details
        const [businessResult] = await connection.query(
            "INSERT INTO businesses (client_id, business_name, place_id, website_url) VALUES (?, ?, ?, ?)",
            [clientDbId, businessName, placeId, websiteUrl]
        );
        const businessId = businessResult.insertId;

        // 3. Insert Business Branding details
        await connection.query(
            "INSERT INTO business_branding (business_id, logo, primary_color, secondary_color) VALUES (?, ?, ?, ?)",
            [businessId, logo, primaryColor || '#3b82f6', secondaryColor || '#2dd4bf']
        );

        // 4. Handle Keywords (Stored in keywords table)
        if (keywords) {
            const kwList = keywords.split(",").map(k => k.trim()).filter(Boolean);
            for (const kw of kwList) {
                await connection.query(
                    "INSERT INTO keywords (client_id, keyword_name, is_active) VALUES (?, ?, 1)",
                    [clientDbId, kw]
                );
            }
        }

        // 5. Handle Questions & Options (Stored as JSON in review_questions table)
        if (questions && Array.isArray(questions)) {
            for (let i = 0; i < questions.length; i++) {
                const q = questions[i];
                const optionsList = q.options && Array.isArray(q.options)
                    ? q.options.map(opt => opt.trim()).filter(Boolean)
                    : [];

                await connection.query(
                    "INSERT INTO review_questions (client_id, question, options, sort_order, is_active) VALUES (?, ?, ?, ?, 1)",
                    [clientDbId, q.question, JSON.stringify(optionsList), i]
                );
            }
        }

        // Commit transaction
        await connection.query("COMMIT");
        res.json({ message: "Client created successfully" });

    } catch (error) {
        await connection.query("ROLLBACK");
        console.error("Error creating client:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Client with this email or ID already exists" });
        }
        res.status(500).json({ message: "Error creating client: " + error.message });
    }
};

// Get Clients
exports.getClients = async (req, res) => {
    const connection = db.promise();
    try {
        // Fetch clients along with business and branding details
        const [clients] = await connection.query(`
            SELECT 
                c.id, c.clientId, c.name, c.email, c.mobile, c.is_active as isActive, 
                c.created_at as createdAt, c.updated_at as updatedAt,
                b.business_name as businessName, b.place_id as placeId, b.website_url as websiteUrl,
                bb.logo, bb.primary_color as primaryColor, bb.secondary_color as secondaryColor
            FROM clients c
            LEFT JOIN businesses b ON b.client_id = c.id
            LEFT JOIN business_branding bb ON bb.business_id = b.id
            ORDER BY c.created_at DESC
        `);

        if (clients.length === 0) {
            return res.json([]);
        }

        // Fetch all client keywords from single keywords table
        const [keywords] = await connection.query(`
            SELECT client_id, keyword_name
            FROM keywords
            WHERE is_active = 1
        `);

        // Fetch all questions and options from review_questions table
        const [questions] = await connection.query(`
            SELECT client_id, question, options, sort_order
            FROM review_questions
            WHERE is_active = 1
            ORDER BY sort_order ASC
        `);

        // Group keywords by client_id
        const keywordMap = {};
        keywords.forEach(kw => {
            if (!keywordMap[kw.client_id]) keywordMap[kw.client_id] = [];
            keywordMap[kw.client_id].push(kw.keyword_name);
        });

        // Group questions and options by client_id
        const questionMap = {};
        questions.forEach(q => {
            if (!questionMap[q.client_id]) questionMap[q.client_id] = [];
            
            let parsedOptions = [];
            if (q.options) {
                try {
                    parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
                } catch (e) {
                    parsedOptions = [];
                }
            }

            questionMap[q.client_id].push({
                question: q.question,
                options: parsedOptions
            });
        });

        // Format responses to match old schema interface
        const safeClients = clients.map(client => {
            const clientDbId = client.id;
            
            // Format keywords as comma-separated string
            const kwList = keywordMap[clientDbId] || [];
            client.keywords = kwList.join(", ");

            // Format questions as array of objects
            client.questions = questionMap[clientDbId] || [];

            return client;
        });

        res.json(safeClients);

    } catch (error) {
        console.error("DB Error in getClients:", error);
        res.status(500).json({ message: "Error fetching clients: " + error.message });
    }
};

// Toggle client status
exports.toggleClientStatus = (req, res) => {
    const { clientId } = req.params; // clientId string
    const { isActive } = req.body;

    const query = "UPDATE clients SET is_active = ? WHERE clientId = ?";
    db.query(query, [isActive ? 1 : 0, clientId], (err) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ message: "Error updating status" });
        }
        res.json({ message: `Client status updated to ${isActive ? 'Active' : 'Inactive'}` });
    });
};

// Update Client
exports.updateClient = async (req, res) => {
    const { clientId } = req.params; // clientId string
    const { name, businessName, keywords, email, mobile, placeId, logo, primaryColor, secondaryColor, questions } = req.body;
    const websiteUrl = req.body.websiteUrl;
    let password = req.body.password;

    const connection = db.promise();

    try {
        await connection.query("START TRANSACTION");

        // 1. Find the client BIGINT ID
        const [clientRows] = await connection.query("SELECT id FROM clients WHERE clientId = ?", [clientId]);
        if (clientRows.length === 0) {
            await connection.query("ROLLBACK");
            return res.status(404).json({ message: "Client not found" });
        }
        const clientDbId = clientRows[0].id;

        // 2. Update Client Credentials
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            await connection.query(
                "UPDATE clients SET name = ?, email = ?, mobile = ?, password = ?, updated_at = NOW() WHERE id = ?",
                [name, email, mobile, hashed, clientDbId]
            );
        } else {
            await connection.query(
                "UPDATE clients SET name = ?, email = ?, mobile = ?, updated_at = NOW() WHERE id = ?",
                [name, email, mobile, clientDbId]
            );
        }

        // 3. Update Business details
        const [bizRows] = await connection.query("SELECT id FROM businesses WHERE client_id = ?", [clientDbId]);
        let businessId;
        if (bizRows.length > 0) {
            businessId = bizRows[0].id;
            await connection.query(
                "UPDATE businesses SET business_name = ?, place_id = ?, website_url = ? WHERE id = ?",
                [businessName, placeId, websiteUrl, businessId]
            );
        } else {
            const [bizResult] = await connection.query(
                "INSERT INTO businesses (client_id, business_name, place_id, website_url) VALUES (?, ?, ?, ?)",
                [clientDbId, businessName, placeId, websiteUrl]
            );
            businessId = bizResult.insertId;
        }

        // 4. Update Business Branding details
        const [brandRows] = await connection.query("SELECT id FROM business_branding WHERE business_id = ?", [businessId]);
        if (brandRows.length > 0) {
            if (logo !== undefined) {
                await connection.query(
                    "UPDATE business_branding SET logo = ?, primary_color = ?, secondary_color = ? WHERE id = ?",
                    [logo, primaryColor, secondaryColor, brandRows[0].id]
                );
            } else {
                await connection.query(
                    "UPDATE business_branding SET primary_color = ?, secondary_color = ? WHERE id = ?",
                    [primaryColor, secondaryColor, brandRows[0].id]
                );
            }
        } else {
            await connection.query(
                "INSERT INTO business_branding (business_id, logo, primary_color, secondary_color) VALUES (?, ?, ?, ?)",
                [businessId, logo || null, primaryColor || '#3b82f6', secondaryColor || '#2dd4bf']
            );
        }

        // 5. Update Keywords (Delete existing and insert new)
        await connection.query("DELETE FROM keywords WHERE client_id = ?", [clientDbId]);
        if (keywords) {
            const kwList = keywords.split(",").map(k => k.trim()).filter(Boolean);
            for (const kw of kwList) {
                await connection.query(
                    "INSERT INTO keywords (client_id, keyword_name, is_active) VALUES (?, ?, 1)",
                    [clientDbId, kw]
                );
            }
        }

        // 6. Update Questions (Delete existing and insert new as JSON)
        await connection.query("DELETE FROM review_questions WHERE client_id = ?", [clientDbId]);
        if (questions && Array.isArray(questions)) {
            for (let i = 0; i < questions.length; i++) {
                const q = questions[i];
                const optionsList = q.options && Array.isArray(q.options)
                    ? q.options.map(opt => opt.trim()).filter(Boolean)
                    : [];

                await connection.query(
                    "INSERT INTO review_questions (client_id, question, options, sort_order, is_active) VALUES (?, ?, ?, ?, 1)",
                    [clientDbId, q.question, JSON.stringify(optionsList), i]
                );
            }
        }

        await connection.query("COMMIT");
        res.json({ message: "Client updated successfully" });

    } catch (error) {
        await connection.query("ROLLBACK");
        console.error("DB Error updating client:", error);
        res.status(500).json({ message: "Error updating client: " + error.message });
    }
};

// Get Notifications — includes client name for display
exports.getNotifications = (req, res) => {
    const query = `
        SELECT n.id, c.clientId, n.type, n.message, n.is_read, n.created_at as createdAt,
               c.name as clientName, b.business_name as businessName, c.email as clientEmail
        FROM notifications n
        LEFT JOIN clients c ON n.client_id = c.id
        LEFT JOIN businesses b ON b.client_id = c.id
        ORDER BY n.created_at DESC
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error("DB Error in getNotifications:", err);
            return res.status(500).json({ message: "Error fetching notifications" });
        }
        res.json(result);
    });
};

// Get expiring subscriptions
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
            b.business_name as businessName,
            c.email as clientEmail,
            c.mobile as clientMobile,
            p.plan_name as planName,
            p.price as planPrice
        FROM subscriptions s
        JOIN clients c ON s.client_id = c.id
        LEFT JOIN businesses b ON b.client_id = c.id
        JOIN subscription_plans p ON s.plan_id = p.id
        WHERE s.status = 'active'
          AND c.is_active = 1
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

// Mark notification read
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

// Get all system settings (Admin only)
exports.getSystemSettings = async (req, res) => {
    const connection = db.promise();
    try {
        const [rows] = await connection.query("SELECT * FROM system_settings");
        const settings = {};
        rows.forEach(r => {
            settings[r.key_name] = r.key_value;
        });
        res.json(settings);
    } catch (e) {
        console.error("Error in getSystemSettings:", e);
        res.status(500).json({ message: "Error loading system settings" });
    }
};

// Update system settings (Admin only)
exports.updateSystemSettings = async (req, res) => {
    const connection = db.promise();
    const settingsPayload = req.body;
    try {
        await connection.query("START TRANSACTION");
        for (const [key, value] of Object.entries(settingsPayload)) {
            await connection.query(
                "INSERT INTO system_settings (key_name, key_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE key_value = VALUES(key_value)",
                [key, value !== null ? String(value) : null]
            );
        }
        await connection.query("COMMIT");
        res.json({ message: "System settings updated successfully" });
    } catch (e) {
        await connection.query("ROLLBACK");
        console.error("Error in updateSystemSettings:", e);
        res.status(500).json({ message: "Error updating system settings" });
    }
};
