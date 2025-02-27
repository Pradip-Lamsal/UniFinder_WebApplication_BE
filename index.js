require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Fix CORS Issue
app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend to access backend
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);

// Root Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the UniFinder API" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const universityRoutes = require("./routes/universityRoutes");
app.use("/api", universityRoutes);
