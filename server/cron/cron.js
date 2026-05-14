const cron = require("node-cron");
const {
    sendExpiryReminder,
} = require("../controllers/notificationController");

cron.schedule("0 9 * * *", async () => {
    console.log("⏰ Running Subscription Cron...");
    await sendExpiryReminder();
});