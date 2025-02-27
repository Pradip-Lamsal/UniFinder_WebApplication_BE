const jwt = require("jsonwebtoken");

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

// ✅ Admin Login Middleware
const adminLogin = (req, res) => {
    console.log("Incoming Login Request:", req.body);
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Invalid admin credentials" });
    }

    // ✅ Generate Admin JWT
    const token = jwt.sign(
        { username, role: "admin" },
        ADMIN_JWT_SECRET,
        { expiresIn: "2h" }
    );

    // ✅ Set token in HTTP-only cookie
    res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    res.json({ message: "Admin login successful", token });
};

// ✅ Middleware to Verify Admin
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token) {
        return res.status(403).json({ error: "Unauthorized access" });
    }

    jwt.verify(token, ADMIN_JWT_SECRET, (err, decoded) => {
        if (err || decoded.role !== "admin") {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.admin = decoded;
        next();
    });
};

module.exports = { adminLogin, verifyAdmin };
