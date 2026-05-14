const express = require("express");
const router = express.Router();
const { submitReview, getAllReviews, generateReview } = require("../controllers/reviewController");
const authmiddleware = require("../middleware/authMiddleware");

router.post("/", submitReview);
router.post("/generate", generateReview);

router.get("/all", authmiddleware(["admin"]), getAllReviews);
module.exports = router;