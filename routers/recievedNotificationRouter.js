const express = require('express');
const router = express.Router();
const { createRecievedNotification } = require('./../controllers/recievedNotificationController'); // Adjust the path as needed


// Route to create a received notification
router.post('/received-notifications', createRecievedNotification);

module.exports = router;
