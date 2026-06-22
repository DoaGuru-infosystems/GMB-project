const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const checkClientActive = require("../middleware/checkClientActive");

const {
    getClientReviews,
    updateClientProfile,
    getClientProfile,
    getClientNotifications,
    markClientNotificationRead,
    getPublicClientProfile,
    getPublicSystemSettings
} = require("../controllers/clientController");

router.get("/public-profile/:clientId", getPublicClientProfile);
router.get("/system-settings", auth(["client", "admin"]), getPublicSystemSettings);

// For profile retrieval/update, allow both client and admin roles
router.get("/profile", auth(["client", "admin"]), (req, res, next) => {
    if (req.user.role === 'admin') return next();
    checkClientActive(req, res, next);
}, getClientProfile);

router.put("/profile", auth(["client", "admin"]), (req, res, next) => {
    if (req.user.role === 'admin') return next();
    checkClientActive(req, res, next);
}, updateClientProfile);

// Restrict client specific routes to client role and check activity
router.use(auth(["client"]), checkClientActive);

router.get("/reviews", getClientReviews);

// Notifications
router.get("/notifications", getClientNotifications);
router.put("/notifications/:id/read", markClientNotificationRead);

module.exports = router;