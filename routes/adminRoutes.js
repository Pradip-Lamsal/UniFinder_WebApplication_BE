const express = require("express");
const { adminLogin, verifyAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

// ✅ Admin Login Route
router.post("/login", adminLogin);

// ✅ Protected Admin Dashboard Route
router.get("/dashboard", verifyAdmin, (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard", admin: req.admin });
});

module.exports = router;
