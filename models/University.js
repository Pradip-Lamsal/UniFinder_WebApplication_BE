const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
 // ranking: { type: String, required: true },
  location: { type: String, required: true },
  tuition: { type: String, required: true },
  //website: { type: String, required: true },
  description: { type: String, required: true },
 // img: { type: String, required: true },  // Store URL or image path
}, { timestamps: true });

module.exports = mongoose.model("University", UniversitySchema);
