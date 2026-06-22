const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const adminRoutes = require("./routes/adminRoutes");
const clientRoutes = require("./routes/clientRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
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

// Serve React static build if directory exists
const buildPath = path.join(__dirname, "build");
if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
}

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



// Fallback to React router or show running status
if (fs.existsSync(buildPath)) {
    app.use((req, res) => {
        res.sendFile(path.join(buildPath, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API IS RUNNING....");
    });
}

const PORT = process.env.PORT || 5050;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Start Cron Job
    require("./cron/cron");
});
