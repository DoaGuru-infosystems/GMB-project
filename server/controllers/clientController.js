const db = require("../config/db");

// Get client profile
exports.getClientProfile = async (req, res) => {
    let clientId = req.user.clientId || req.user.clientID;
    if (req.user.role === 'admin' && !clientId) {
        clientId = 'admin';
    }
    if (!clientId) return res.status(401).json({ message: "Invalid payload" });

    const connection = db.promise();
    try {
        let [clientRows] = await connection.query(`
            SELECT 
                c.id, c.clientId, c.name, c.email, c.mobile, c.is_active as isActive,
                b.business_name as businessName, b.place_id as placeId, b.website_url as websiteUrl,
                bb.logo, bb.primary_color as primaryColor, bb.secondary_color as secondaryColor
            FROM clients c
            LEFT JOIN businesses b ON b.client_id = c.id
            LEFT JOIN business_branding bb ON bb.business_id = b.id
            WHERE c.clientId = ?
        `, [clientId]);

        if (clientRows.length === 0) {
            if (clientId === 'admin') {
                // Dynamically insert default admin client profile if it doesn't exist yet
                const [insertClient] = await connection.query(
                    "INSERT INTO clients (clientId, name, email, mobile, is_active) VALUES ('admin', 'DOAGuru InfoSystems', 'doaguruinfosystems@gmail.com', '+91-7440992424', 1)"
                );
                const clientDbId = insertClient.insertId;
                const [insertBiz] = await connection.query(
                    "INSERT INTO businesses (client_id, business_name, place_id, website_url) VALUES (?, 'DOAGuru InfoSystems', 'ChIJT-5eGRaxgTkRxyMc7_psGWI', 'www.doaguru.com')",
                    [clientDbId]
                );
                const bizId = insertBiz.insertId;
                await connection.query(
                    "INSERT INTO business_branding (business_id, logo, primary_color, secondary_color) VALUES (?, '/uploads/logonew.png', '#3b82f6', '#2dd4bf')",
                    [bizId]
                );
                // Insert default keywords
                const defaultKeywords = ['Digital Marketing', 'Web Development', 'SEO Services', 'Social Media Marketing', 'Video Editing', 'Graphic Designing'];
                for (const kw of defaultKeywords) {
                    await connection.query(
                        "INSERT INTO keywords (client_id, keyword_name, is_active) VALUES (?, ?, 1)",
                        [clientDbId, kw]
                    );
                }
                // Insert default questions
                await connection.query(
                    `INSERT INTO review_questions (client_id, question, options, sort_order, is_active) 
                     VALUES (?, 'Which service did you take?', '["Digital Marketing", "Web Development", "SEO Services", "Social Media Marketing", "Video Editing", "Graphic Designing"]', 1, 1)`,
                    [clientDbId]
                );
                await connection.query(
                    `INSERT INTO review_questions (client_id, question, options, sort_order, is_active) 
                     VALUES (?, 'Why did you choose DOAGuru InfoSystems?', '["Great Communication", "On-time Delivery", "Professional Behavior", "Increased Sales/Leads", "Exceeded Expectations"]', 2, 1)`,
                    [clientDbId]
                );

                // Re-query
                const [reQueryRows] = await connection.query(`
                    SELECT 
                        c.id, c.clientId, c.name, c.email, c.mobile, c.is_active as isActive,
                        b.business_name as businessName, b.place_id as placeId, b.website_url as websiteUrl,
                        bb.logo, bb.primary_color as primaryColor, bb.secondary_color as secondaryColor
                    FROM clients c
                    LEFT JOIN businesses b ON b.client_id = c.id
                    LEFT JOIN business_branding bb ON bb.business_id = b.id
                    WHERE c.clientId = 'admin'
                `);
                clientRows = reQueryRows;
            } else {
                return res.status(404).json({ message: "Client not found" });
            }
        }
        const client = clientRows[0];
        const clientDbId = client.id;

        // Fetch keywords from single keywords table
        const [kwRows] = await connection.query(`
            SELECT keyword_name
            FROM keywords
            WHERE client_id = ? AND is_active = 1
        `, [clientDbId]);
        client.keywords = kwRows.map(r => r.keyword_name).join(", ");

        // Fetch questions directly from single review_questions JSON table
        const [qRows] = await connection.query(`
            SELECT question, options
            FROM review_questions
            WHERE client_id = ? AND is_active = 1
            ORDER BY sort_order ASC
        `, [clientDbId]);

        client.questions = qRows.map(q => {
            let parsedOptions = [];
            if (q.options) {
                try {
                    parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
                } catch (e) {
                    parsedOptions = [];
                }
            }
            return {
                question: q.question,
                options: parsedOptions
            };
        });

        res.json(client);
    } catch (e) {
        console.error("Error in getClientProfile:", e);
        res.status(500).json({ message: "Database error" });
    }
};

// Update client profile
exports.updateClientProfile = async (req, res) => {
    let clientId = req.user.clientId || req.user.clientID;
    if (req.user.role === 'admin' && !clientId) {
        clientId = 'admin';
    }
    const { name, email, businessName, mobile, logo, keywords, placeId, primaryColor, secondaryColor, password, questions } = req.body;

    const connection = db.promise();
    try {
        await connection.query("START TRANSACTION");

        // Get client DB ID
        const [clientRows] = await connection.query("SELECT id FROM clients WHERE clientId = ?", [clientId]);
        if (clientRows.length === 0) {
            await connection.query("ROLLBACK");
            return res.status(404).json({ message: "Client not found" });
        }
        const clientDbId = clientRows[0].id;

        // Update Client details
        await connection.query(
            "UPDATE clients SET name = ?, email = ?, mobile = ?, updated_at = NOW() WHERE id = ?",
            [name, email, mobile, clientDbId]
        );

        // Update login credentials based on role
        const bcrypt = require("bcryptjs");
        if (req.user.role === 'admin') {
            if (password) {
                const hashedPass = await bcrypt.hash(password, 10);
                await connection.query("UPDATE admins SET email = ?, password = ? WHERE id = ?", [email, hashedPass, req.user.id]);
            } else {
                await connection.query("UPDATE admins SET email = ? WHERE id = ?", [email, req.user.id]);
            }
        } else {
            if (password) {
                const hashedPass = await bcrypt.hash(password, 10);
                await connection.query("UPDATE clients SET password = ? WHERE id = ?", [hashedPass, clientDbId]);
            }
        }

        // Update or Insert Business details
        const [bizRows] = await connection.query("SELECT id FROM businesses WHERE client_id = ?", [clientDbId]);
        let businessId;
        if (bizRows.length > 0) {
            businessId = bizRows[0].id;
            await connection.query(
                "UPDATE businesses SET business_name = ?, place_id = ? WHERE id = ?",
                [businessName, placeId, businessId]
            );
        } else {
            const [bizResult] = await connection.query(
                "INSERT INTO businesses (client_id, business_name, place_id) VALUES (?, ?, ?)",
                [clientDbId, businessName, placeId]
            );
            businessId = bizResult.insertId;
        }

        // Update or Insert Branding details
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

        // Update Keywords in keywords table
        if (keywords !== undefined) {
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
        }

        // Update Questions
        if (questions !== undefined && Array.isArray(questions)) {
            await connection.query("DELETE FROM review_questions WHERE client_id = ?", [clientDbId]);
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
        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        await connection.query("ROLLBACK");
        console.error("Error in updateClientProfile:", err);
        res.status(500).json({ message: "Update failed" });
    }
};

// Get Client Reviews (with filters & pagination)
exports.getClientReviews = async (req, res) => {
    const clientId = req.user.clientId || req.user.clientID;
    if (!clientId) return res.status(401).json({ message: "Invalid payload" });

    const { type, search, dateRange, startDate, endDate, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const connection = db.promise();

    try {
        let whereClause = " WHERE c.clientId = ?";
        let params = [clientId];

        if (dateRange) {
            if (dateRange === 'Custom Range' && startDate && endDate) {
                whereClause += " AND r.created_at >= ? AND r.created_at <= ?";
                params.push(`${startDate} 00:00:00`, `${endDate} 23:59:59`);
            } else if (dateRange === 'This Month') {
                whereClause += " AND MONTH(r.created_at) = MONTH(NOW()) AND YEAR(r.created_at) = YEAR(NOW())";
            } else if (dateRange === 'Last Month') {
                whereClause += " AND r.created_at >= DATE_SUB(DATE_FORMAT(NOW() ,'%Y-%m-01'), INTERVAL 1 MONTH) AND r.created_at < DATE_FORMAT(NOW() ,'%Y-%m-01')";
            } else if (dateRange === 'Last 3 Months') {
                whereClause += " AND r.created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)";
            } else if (dateRange === 'Last 6 Months') {
                whereClause += " AND r.created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)";
            } else if (dateRange === 'Last 12 Months') {
                whereClause += " AND r.created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)";
            }
        }
        if (type) {
            whereClause += " AND r.is_positive = ?";
            params.push(type === 'positive' ? 1 : 0);
        }
        if (search) {
            whereClause += " AND (r.customer_name LIKE ? OR r.customer_email LIKE ?)";
            params.push(`%${search}%`, `%${search}%`);
        }

        const countQuery = `
            SELECT COUNT(*) as total 
            FROM reviews r
            JOIN clients c ON r.client_id = c.id
            ${whereClause}
        `;

        const [countResult] = await connection.query(countQuery, params);
        const total = countResult[0].total;

        const dataQuery = `
            SELECT 
                r.id, c.clientId, r.customer_name as fullName, 
                r.customer_mobile as mobile, r.customer_email as email, 
                r.rating, r.review, r.is_positive as isPositive, r.created_at as createdAt
            FROM reviews r
            JOIN clients c ON r.client_id = c.id
            ${whereClause}
            ORDER BY r.created_at DESC 
            LIMIT ? OFFSET ?
        `;

        const [results] = await connection.query(dataQuery, [...params, parseInt(limit), parseInt(offset)]);

        res.json({
            reviews: results,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        console.error("Error in getClientReviews:", err);
        res.status(500).json({ message: "Database error" });
    }
};

// Get Client Notifications
exports.getClientNotifications = (req, res) => {
    const clientId = req.user.clientId || req.user.clientID;
    const query = `
        SELECT n.id, c.clientId, n.type, n.message, n.is_read, n.created_at as createdAt
        FROM notifications n
        JOIN clients c ON n.client_id = c.id
        WHERE c.clientId = ? 
        ORDER BY n.created_at DESC
    `;
    db.query(query, [clientId], (err, result) => {
        if (err) {
            console.error("DB Error in getClientNotifications:", err);
            return res.status(500).json({ message: "Error fetching notifications" });
        }
        res.json(result);
    });
};

// Mark Client Notification as Read
exports.markClientNotificationRead = (req, res) => {
    const { id } = req.params;
    const clientId = req.user.clientId || req.user.clientID;
    const query = `
        UPDATE notifications n
        JOIN clients c ON n.client_id = c.id
        SET n.is_read = 1 
        WHERE n.id = ? AND c.clientId = ?
    `;
    db.query(query, [id, clientId], (err) => {
        if (err) {
            console.error("DB Error in markClientNotificationRead:", err);
            return res.status(500).json({ message: "Error updating notification" });
        }
        res.json({ message: "Notification marked as read" });
    });
};

// Get Public Client Profile (unauthenticated)
exports.getPublicClientProfile = async (req, res) => {
    const { clientId } = req.params;
    const connection = db.promise();
    try {
        const [clientRows] = await connection.query(`
            SELECT 
                c.id, c.clientId,
                b.business_name as businessName, b.website_url as websiteUrl,
                bb.logo, bb.primary_color as primaryColor, bb.secondary_color as secondaryColor
            FROM clients c
            LEFT JOIN businesses b ON b.client_id = c.id
            LEFT JOIN business_branding bb ON bb.business_id = b.id
            WHERE c.clientId = ? AND c.is_active = 1
        `, [clientId]);

        if (clientRows.length === 0) return res.status(404).json({ message: "Client not found" });
        const client = clientRows[0];
        const clientDbId = client.id;

        // Fetch keywords from keywords table
        const [kwRows] = await connection.query(`
            SELECT keyword_name
            FROM keywords
            WHERE client_id = ? AND is_active = 1
        `, [clientDbId]);
        client.keywords = kwRows.map(r => r.keyword_name).join(", ");

        // Fetch questions directly from review_questions JSON table
        const [qRows] = await connection.query(`
            SELECT question, options
            FROM review_questions
            WHERE client_id = ? AND is_active = 1
            ORDER BY sort_order ASC
        `, [clientDbId]);

        client.questions = qRows.map(q => {
            let parsedOptions = [];
            if (q.options) {
                try {
                    parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
                } catch (e) {
                    parsedOptions = [];
                }
            }
            return {
                question: q.question,
                options: parsedOptions
            };
        });

        res.json(client);
    } catch (e) {
        console.error("Error in getPublicClientProfile:", e);
        res.status(500).json({ message: "Database error" });
    }
};

// Get public/important settings (available to clients too)
exports.getPublicSystemSettings = async (req, res) => {
    const connection = db.promise();
    try {
        const publicKeys = ["platform_name", "platform_logo", "support_email", "support_number"];
        const [rows] = await connection.query("SELECT * FROM system_settings WHERE key_name IN (?)", [publicKeys]);
        const settings = {};
        rows.forEach(r => {
            settings[r.key_name] = r.key_value;
        });
        res.json(settings);
    } catch (e) {
        console.error("Error in getPublicSystemSettings:", e);
        res.status(500).json({ message: "Error loading system settings" });
    }
};