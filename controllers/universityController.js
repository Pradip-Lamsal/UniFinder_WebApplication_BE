const University = require('../models/University');

// Get all universities
exports.getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a new university
exports.addNewUniversity = async (req, res) => {
  try {
    const { name, location, tuition, website, description, img } = req.body;
    
    const newUniversity = new University({
      name,
      location,
      tuition,
    //   website,
      description,
    //   img
    });

    await newUniversity.save();
    res.status(201).json({ message: "University added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
