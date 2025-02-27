const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    courseType: { type: String, required: true },
    courseDuration: { type: String, required: true },
    courseCategory: { type: String, required: true },
    timePeriod: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
