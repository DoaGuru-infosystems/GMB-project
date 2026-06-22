const db = require("../config/db");
const { sendEmail } = require("../utils/emailService");

// For Cron Job (Automatic Expiry Reminder)
exports.sendExpiryReminder = async () => {
    console.log("Checking for expiring subscriptions...");
    const daysAhead = 3; // Remind 3 days before expiry
    const query = `
        SELECT 
            s.id as subscriptionId,
            s.end_date,
            c.id as clientDbId,
            c.clientId,
            c.name as clientName,
            c.email as clientEmail,
            b.business_name as businessName,
            p.plan_name as planName
        FROM subscriptions s
        JOIN clients c ON s.client_id = c.id
        LEFT JOIN businesses b ON b.client_id = c.id
        JOIN subscription_plans p ON s.plan_id = p.id
        WHERE s.status = 'active'
          AND c.is_active = 1
          AND DATEDIFF(s.end_date, NOW()) = ?
    `;

    db.query(query, [daysAhead], async (err, subscriptions) => {
        if (err) {
            console.error("Cron Email Query Error:", err);
            return;
        }

        for (const sub of subscriptions) {
            const subject = "Subscription Renewal Reminder";
            const text = `Dear ${sub.clientName}, your subscription for ${sub.businessName} (Plan: ${sub.planName}) is expiring in ${daysAhead} days. Please renew it to continue service.`;
            const html = `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #2563eb;">Renewal Reminder</h2>
                    <p>Dear <b>${sub.clientName}</b>,</p>
                    <p>This is a friendly reminder that your subscription for <b>${sub.businessName}</b> is expiring soon.</p>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><b>Plan:</b> ${sub.planName}</p>
                        <p style="margin: 5px 0;"><b>Expiry Date:</b> ${new Date(sub.end_date).toLocaleDateString()}</p>
                        <p style="margin: 5px 0; color: #dc2626;"><b>Days Left:</b> ${daysAhead} days</p>
                    </div>
                    <p>Please log in to your dashboard to renew your subscription.</p>
                    <p>Best Regards,<br/>DOAGuru Team</p>
                </div>
            `;

            const success = await sendEmail(sub.clientEmail, subject, text, html);
            
            // Log to notifications table if email was successful
            if (success) {
                const notifMsg = `AUTOMATIC REMINDER: Renewal email sent to ${sub.clientName} for ${sub.planName} plan. Expiry in ${daysAhead} days.`;
                db.query(
                    "INSERT INTO notifications (client_id, type, message, is_read) VALUES (?, ?, ?, 0)",
                    [sub.clientDbId, 'renewal_reminder', notifMsg],
                    (err) => { if (err) console.error("Error logging notification:", err); }
                );
            }
        }
    });
};

// For Manual Trigger from Dashboard
exports.sendManualReminder = async (req, res) => {
    const { clientId, subscriptionId } = req.body;

    const query = `
        SELECT 
            s.id as subscriptionId,
            s.end_date,
            c.id as clientDbId,
            c.name as clientName,
            c.email as clientEmail,
            b.business_name as businessName,
            p.plan_name as planName,
            DATEDIFF(s.end_date, NOW()) as daysLeft
        FROM subscriptions s
        JOIN clients c ON s.client_id = c.id
        LEFT JOIN businesses b ON b.client_id = c.id
        JOIN subscription_plans p ON s.plan_id = p.id
        WHERE c.clientId = ? AND s.id = ?
    `;

    db.query(query, [clientId, subscriptionId], async (err, result) => {
        if (err || result.length === 0) {
            console.error("Manual Reminder Error: Subscription not found", { clientId, subscriptionId });
            return res.status(500).json({ message: "Failed to find subscription details" });
        }

        const sub = result[0];
        const subject = "Urgent: Subscription Renewal Needed";
        const text = `Dear ${sub.clientName}, your subscription for ${sub.businessName} is expiring in ${sub.daysLeft} days.`;
        const html = `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2563eb;">Subscription Renewal Notice</h2>
                <p>Dear <b>${sub.clientName}</b>,</p>
                <p>Your subscription for <b>${sub.businessName}</b> is set to expire on <b>${new Date(sub.end_date).toLocaleDateString()}</b>.</p>
                <p>To avoid any interruption in service, please renew your <b>${sub.planName}</b> plan.</p>
                <p>Days remaining: <b>${sub.daysLeft}</b></p>
                <p>Best Regards,<br/>DOAGuru Team</p>
            </div>
        `;

        const success = await sendEmail(sub.clientEmail, subject, text, html);
        if (success) {
            // Log to notifications table
            const notifMsg = `MANUAL REMINDER: Admin sent renewal follow-up to ${sub.clientName}. Plan: ${sub.planName}.`;
            db.query(
                "INSERT INTO notifications (client_id, type, message, is_read) VALUES (?, ?, ?, 0)",
                [sub.clientDbId, 'renewal_reminder', notifMsg],
                (err) => { if (err) console.error("Error logging notification:", err); }
            );

            res.json({ message: "Reminder email sent successfully" });
        } else {
            res.status(500).json({ message: "Failed to send email. Check server configuration." });
        }
    });
};
