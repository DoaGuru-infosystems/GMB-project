const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const adminRoutes = require("./routes/adminRoutes");
const clientRoutes = require("./routes/clientRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const ensureSubscriptionSchema = require("./utils/ensureSubscriptionSchema");

app.use(morgan("dev"));
app.use(cors({
    origin: function (origin, callback) {
        // Automatically allow any origin dynamically to make it completely zero-config
        callback(null, origin || true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
}, express.static(path.join(__dirname, "uploads")));

// Debug logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/review", reviewRoutes);
app.use("/api/login", authRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/subscription", subscriptionRoutes);

// Testing
app.get("/", (req, res) => {
    res.send("API IS RUNNING....");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Start Cron Job
    require("./cron/cron");
});

ensureSubscriptionSchema()
    .then(() => console.log("Subscription tables and default plans are ready"))
    .catch((err) => console.error("Subscription setup failed:", err.message));
