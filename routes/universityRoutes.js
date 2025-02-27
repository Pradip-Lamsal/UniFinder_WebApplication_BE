const express = require('express');
const { getAllUniversities, addNewUniversity } = require('../controllers/universityController');
const router = express.Router();

// Get all universities
router.get("/universities", getAllUniversities);

// Add new university
router.post("/universities", addNewUniversity);

module.exports = router;
