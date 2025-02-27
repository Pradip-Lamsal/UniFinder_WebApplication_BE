const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ User Registration Route
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ User Login Route
router.post("/login", async (req, res) => {
  try {
      console.log("📥 Incoming Login Request:", req.body);

      const { username, password } = req.body;
      if (!username || !password) {
          return res.status(400).json({ error: "All fields are required" });
      }

      // 🔍 Find user in the database
      const user = await User.findOne({ username });
      if (!user) {
          console.log("❌ User Not Found:", username);
          return res.status(400).json({ error: "Invalid credentials" });
      }

      // 🔑 Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log("❌ Invalid Password Attempt");
          return res.status(400).json({ error: "Invalid credentials" });
      }

      // 🛡️ Generate JWT Token and include isAdmin field
      const token = jwt.sign(
          { id: user._id, username: user.username, isAdmin: user.isAdmin },
          JWT_SECRET,
          { expiresIn: "1h" }
      );

      console.log("✅ Login Successful, Token Generated:", token);

      // 🔐 Store token in cookie
      res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.json({ message: "Login successful", token, isAdmin: user.isAdmin });

  } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ error: "Server error" });
  }
});


// ✅ JWT Verification Middleware
function verifyToken(req, res, next) {
    const token = req.cookies.token; // Read token from cookies
    if (!token) {
        console.log("❌ No Token Provided");
        return res.status(403).json({ error: "Unauthorized" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("❌ Invalid Token");
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = decoded; // Attach decoded user data to request
        next();
    });
}

// ✅ Protected Route (User Profile)
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("❌ Profile Fetch Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
