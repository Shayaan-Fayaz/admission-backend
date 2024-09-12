const express = require('express');
const studentController = require('../controllers/studentController'); // Import the controller
const upload = require('./../multerConfig');

const router = express.Router();

// Define the POST route to create a new student
router.post('/students', studentController.createStudent);

// Route to update a student by ID
router.put('/students/:id', studentController.updateStudentById);

// Route to get a student profile by ID
router.get('/students/:id', studentController.getStudentById);

module.exports = router;