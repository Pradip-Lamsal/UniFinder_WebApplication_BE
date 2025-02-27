const Consultancy = require("../models/Consultancy");

// Create a new consultancy
exports.addConsultancy = async (req, res) => {
  try {
    const { name, description, location, services, contact } = req.body;

    // Create a new consultancy entry
    const newConsultancy = new Consultancy({
      name,
      description,
      location,
      services,
      contact,
    });

    await newConsultancy.save();
    res.status(201).json({ message: "Consultancy added successfully", newConsultancy });
  } catch (error) {
    console.error("Error adding consultancy:", error);
    res.status(500).json({ error: "Server error while adding consultancy" });
  }
};

// Get all consultancies
exports.getAllConsultancies = async (req, res) => {
  try {
    const consultancies = await Consultancy.find();
    res.status(200).json(consultancies);
  } catch (error) {
    console.error("Error fetching consultancies:", error);
    res.status(500).json({ error: "Server error while fetching consultancies" });
  }
};

// Get consultancy by ID
exports.getConsultancyById = async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.params.id);
    if (!consultancy) {
      return res.status(404).json({ error: "Consultancy not found" });
    }
    res.status(200).json(consultancy);
  } catch (error) {
    console.error("Error fetching consultancy:", error);
    res.status(500).json({ error: "Server error while fetching consultancy" });
  }
};
