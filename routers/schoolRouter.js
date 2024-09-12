const express = require('express');
const schoolController = require('../controllers/schoolController'); // Import the controller
const router = express.Router();

// Define the POST route to create a new school
router.post('/schools', schoolController.createSchool);

// Route to update a school by ID
router.put('/schools/:id', schoolController.updateSchoolById);

// Route to get a school by ID
router.get('/schools/:id', schoolController.getSchoolById);


// Route to search for schools by name
router.get('/schools/search/:query', schoolController.searchSchoolByName);

module.exports = router;