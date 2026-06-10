const QRCode = require('qrcode');
const db = require('../config/db');

exports.generateQRCode = async (req, res) => {
    try {
        const clientId = req.user?.clientId || req.user?.clientID || 'admin';
        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const reviewUrl = `${baseUrl}/review/${clientId}`;

        // Fetch business details if it's a specific client
        let businessDetails = {
            businessName: "DOAGuru InfoSystems",
            logo: null,
            websiteUrl: "www.doaguru.com"
        };

        if (clientId !== 'admin') {
            const [rows] = await db.promise().query(
                "SELECT businessName, logo, websiteUrl FROM clients WHERE clientId = ?",
                [clientId]
            );
            if (rows && rows.length > 0) {
                businessDetails = {
                    businessName: rows[0].businessName || businessDetails.businessName,
                    logo: rows[0].logo || null,
                    websiteUrl: rows[0].websiteUrl || (rows[0].businessName ? `www.${rows[0].businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com` : businessDetails.websiteUrl)
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

