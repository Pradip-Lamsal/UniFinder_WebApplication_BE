const mongoose = require("mongoose");

const UniversitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    fee: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["Public", "Private"], required: true },
    img: { type: String, required: true },
});

module.exports = mongoose.model("University", UniversitySchema);
