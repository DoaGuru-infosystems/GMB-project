const QRCode = require('qrcode');
const db = require('../config/db');

exports.generateQRCode = async (req, res) => {
    try {
        const clientId = req.user?.clientId || req.user?.clientID || 'admin';
        const baseUrl = process.env.FRONTEND_URL || 'https://gmbreviews.siarasystems.com';
        const reviewUrl = `${baseUrl}/review/${clientId}`;

        // Fetch business details if it's a specific client
        let businessDetails = {
            businessName: "DOAGuru InfoSystems",
            logo: null,
            websiteUrl: "www.doaguru.com"
        };

        if (clientId !== 'admin') {
            const [rows] = await db.promise().query(
                `SELECT 
                    b.business_name as businessName, 
                    bb.logo, 
                    b.website_url as websiteUrl 
                 FROM clients c
                 LEFT JOIN businesses b ON b.client_id = c.id
                 LEFT JOIN business_branding bb ON bb.business_id = b.id
                 WHERE c.clientId = ?`,
                [clientId]
            );
            if (rows && rows.length > 0) {
                businessDetails = {
                    businessName: rows[0].businessName || businessDetails.businessName,
                    logo: rows[0].logo || null,
                    websiteUrl: rows[0].websiteUrl || businessDetails.websiteUrl
                };
            }
        }

        // Generate QR Code as Data URI
        const qrCodeDataUrl = await QRCode.toDataURL(reviewUrl, {
            width: 400,
            color: {
                dark: '#0f172a',
                light: '#ffffff'
            }
        });

        res.json({
            qrCodeDataUrl,
            reviewUrl,
            ...businessDetails
        });
    } catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).json({ message: "Failed to generate QR code" });
    }
};
