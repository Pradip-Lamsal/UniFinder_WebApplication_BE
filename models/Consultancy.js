const mongoose = require("mongoose");

const ConsultancySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    services: { type: [String], required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultancy", ConsultancySchema);
