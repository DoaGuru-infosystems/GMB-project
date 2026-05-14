const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    triggerReminderNow,
} = require("../controllers/notificationController");

// POST /api/notification/send-reminder — manually trigger (admin only)
router.post("/send-reminder", auth(["admin"]), triggerReminderNow);

module.exports = router;