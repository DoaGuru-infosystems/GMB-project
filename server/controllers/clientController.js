const db = require("../config/db");

exports.getClientProfile = (req, res) => {
    const clientId = req.user.clientId || req.user.clientID;
    if (!clientId) return res.status(401).json({ message: "Invalid payload" });

    db.query("SELECT id, clientId, name, businessName, keywords, email, mobile, placeId, logo, isActive, primaryColor, secondaryColor, questions FROM clients WHERE clientId = ?", [clientId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        if (results.length === 0) return res.status(404).json({ message: "Client not found" });
        const client = results[0];
        if (client.questions && typeof client.questions === 'string') {
            try {
                client.questions = JSON.parse(client.questions);
            } catch (e) {
                client.questions = [];
            }
        }
        res.json(client);
    });
};

exports.updateClientProfile = (req, res) => {
    const clientId = req.user.clientId || req.user.clientID;
    const { name, businessName, mobile, logo, keywords, placeId } = req.body;

    const query = `
        UPDATE clients
        SET name = ?, businessName = ?, mobile = ?, logo = ?, keywords = ?, placeId = ?, updatedAt = NOW()
        WHERE clientId = ?
    `;

    db.query(query, [name, businessName, mobile, logo, keywords, placeId, clientId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Update failed" });
        }

        res.json({ message: "Profile updated successfully" });
    });
};

exports.getClientReviews = (req, res) => {
    const clientId = req.user.clientId || req.user.clientID;
    if (!clientId) return res.status(401).json({ message: "Invalid payload" });

    const { type, search, dateRange, startDate, endDate, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = " FROM reviews WHERE clientId = ?";
    let params = [clientId];

    // Optional filters if they exist
    if (dateRange) {
        if (dateRange === 'Custom Range' && startDate && endDate) {
            query += " AND createdAt >= ? AND createdAt <= ?";
            params.push(`${startDate} 00:00:00`, `${endDate} 23:59:59`);
        } else if (dateRange === 'This Month') {
            query += " AND MONTH(createdAt) = MONTH(NOW()) AND YEAR(createdAt) = YEAR(NOW())";
        } else if (dateRange === 'Last Month') {
            query += " AND createdAt >= DATE_SUB(DATE_FORMAT(NOW() ,'%Y-%m-01'), INTERVAL 1 MONTH) AND createdAt < DATE_FORMAT(NOW() ,'%Y-%m-01')";
        } else if (dateRange === 'Last 3 Months') {
            query += " AND createdAt >= DATE_SUB(NOW(), INTERVAL 3 MONTH)";
        } else if (dateRange === 'Last 6 Months') {
            query += " AND createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)";
        } else if (dateRange === 'Last 12 Months') {
            query += " AND createdAt >= DATE_SUB(NOW(), INTERVAL 12 MONTH)";
        }
    }
    if (type) {
        query += " AND isPositive = ?";
        params.push(type === 'positive');
    }
    if (search) {
        query += " AND (fullName LIKE ? OR email LIKE ?)";
        params.push(`%${search}%`, `%${search}%`);
    }

    const countQuery = `SELECT COUNT(*) as total ${query}`;

    db.query(countQuery, params, (err, countResult) => {
        if (err) {
            console.error("Error in getClientReviews count:", err);
            return res.status(500).json({ message: "Database error" });
        }

        const total = countResult[0].total;
        const dataQuery = `SELECT * ${query} ORDER BY createdAt DESC LIMIT ? OFFSET ?`;

        db.query(dataQuery, [...params, parseInt(limit), parseInt(offset)], (err, results) => {
            if (err) {
                console.error("Error in getClientReviews data:", err);
                return res.status(500).json({ message: "Database error" });
            }
            const processedResults = results.map(r => {
                if (r.questions && typeof r.questions === 'string') {
                    try {
                        r.questions = JSON.parse(r.questions);
                    } catch (e) {
                        r.questions = [];
                    }
                }
                return r;
            });
            res.json({
                reviews: processedResults,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            });
        });
    });
};

exports.getClientNotifications = (req, res) => {
    const clientId = req.user.clientId || req.user.clientID;
    db.query("SELECT * FROM notifications WHERE clientId = ? ORDER BY createdAt DESC", [clientId], (err, result) => {
        if (err) {
            console.error("DB Error in getClientNotifications:", err);
            return res.status(500).json({ message: "Error fetching notifications" });
        }
        res.json(result);
    });
};

exports.markClientNotificationRead = (req, res) => {
    const { id } = req.params;
    const clientId = req.user.clientId || req.user.clientID;
    db.query("UPDATE notifications SET is_read = 1 WHERE id = ? AND clientId = ?", [id, clientId], (err) => {
        if (err) {
            console.error("DB Error in markClientNotificationRead:", err);
            return res.status(500).json({ message: "Error updating notification" });
        }
        res.json({ message: "Notification marked as read" });
    });
};

exports.getPublicClientProfile = (req, res) => {
    const { clientId } = req.params;

    db.query("SELECT businessName, keywords, logo, primaryColor, secondaryColor, questions FROM clients WHERE clientId = ?", [clientId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        if (results.length === 0) return res.status(404).json({ message: "Client not found" });

        const client = results[0];
        if (client.questions && typeof client.questions === 'string') {
            try {
                client.questions = JSON.parse(client.questions);
            } catch (e) {
                client.questions = [];
            }
        }
        res.json(client);
    });
};