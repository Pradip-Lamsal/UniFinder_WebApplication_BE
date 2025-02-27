const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware");

// ✅ Get User Profile
router.get("/profile", protect, getUserProfile);

module.exports = router; // ✅ Ensure this line exists
