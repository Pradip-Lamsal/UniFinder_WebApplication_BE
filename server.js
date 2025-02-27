const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

//logs

console.log("Admin Username:", process.env.ADMIN_USERNAME);  // Log the ADMIN_USERNAME
console.log("Admin Password:", process.env.ADMIN_PASSWORD);  // Log the ADMIN_PASSWORD
console.log("Admin JWT Secret:", process.env.ADMIN_JWT_SECRET);  // Log the ADMIN_JWT_SECRET

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const universityRoutes = require("./routes/universityRoutes");

// ✅ Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/universities", universityRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the UniFinder API" });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




