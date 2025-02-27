const express = require("express");
const router = express.Router();
const University = require("../models/University");

// ✅ GET all universities
router.get("/", async (req, res) => {
    try {
        const universities = await University.find();
        if (!universities.length) {
            return res.status(404).json({ message: "No universities found" });
        }
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ GET a university by ID
router.get("/:id", async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }
        res.json(university);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ POST: Add a new university
router.post("/", async (req, res) => {
    try {
        const { name, location, fee, description, type, img } = req.body;
        if (!name || !location || !fee || !description || !type || !img) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newUniversity = new University({ name, location, fee, description, type, img });
        await newUniversity.save();
        res.status(201).json(newUniversity);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ PUT: Update a university
router.put("/:id", async (req, res) => {
    try {
        const updatedUniversity = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUniversity) {
            return res.status(404).json({ message: "University not found" });
        }
        res.json(updatedUniversity);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ DELETE: Remove a university
router.delete("/:id", async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }
        await University.findByIdAndDelete(req.params.id);
        res.json({ message: "University deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
