const Course = require("../models/Course");

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { courseType, courseDuration, courseCategory, timePeriod } = req.body;

    const newCourse = new Course({
      courseType,
      courseDuration,
      courseCategory,
      timePeriod,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Server error while adding course" });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Server error while fetching courses" });
  }
};
