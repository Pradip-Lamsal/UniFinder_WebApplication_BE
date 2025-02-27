const express = require("express");
const router = express.Router();
const { addCourse, getAllCourses } = require("../controllers/courseController");

// Add a new course
router.post("/courses", addCourse);

// Get all courses
router.get("/courses", getAllCourses);

module.exports = router;
