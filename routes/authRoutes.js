const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// User Login Route
router.post("/login", async (req, res) => {
  try {
    console.log("📥 Incoming Login Request:", req.body);

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find user in the database
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User Not Found:", username);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid Password Attempt");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login Successful, Token Generated:", token);

    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.json({ message: "Login successful", token });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// JWT Verification Middleware
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    console.log("❌ No Token Provided");
    return res.status(403).json({ error: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("❌ Invalid Token");
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

// Example of a Protected Route
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
