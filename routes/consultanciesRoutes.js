const express = require("express");
const router = express.Router();
const { addConsultancy, getAllConsultancies, getConsultancyById } = require("../controllers/consultancyController");

// Add new consultancy
router.post("/consultancies", addConsultancy);

// Get all consultancies
router.get("/consultancies", getAllConsultancies);

// Get consultancy by ID
router.get("/consultancies:id", getConsultancyById);

module.exports = router;
