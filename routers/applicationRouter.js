const express = require('express');
const router = express.Router();
const applicationController = require('./../controllers/applicationController');

// Create a new application
router.post('/', applicationController.createApplication);

// Update an application by ID
router.put('/:id', applicationController.updateApplicationStatusById);

// Get all non-approved applications
router.get('/non-approved', applicationController.getAllNonApprovedApplications);

module.exports = router;