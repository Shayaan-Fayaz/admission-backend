const ReceivedNotification = require('./../models/recievedNotificationModel');
const Notification = require('../models/notificationModel'); // Adjust the path as needed
const Application = require('../models/applicationModel'); // Adjust the path as needed

exports.createRecievedNotification = async (req, res) => {
    const { notificationId, decision, instituteId, studentId} = req.body;

    try {
        // Validate input
        if (!notificationId || !decision || !instituteId || !studentId) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
    
        // Find the related notification
        const notification = await Notification.findById(notificationId);
        if (!notification) {
          return res.status(404).json({ message: 'Notification not found' });
        }
    
        // Create and save the ReceivedNotification document
        const receivedNotification = new ReceivedNotification({
          notificationId,
          studentId,
          instituteId,
          decision
        });
    
        await receivedNotification.save();
    
        // Update the application status based on the decision
        const application = await Application.findById(notification.applicationId);
        if (application) {
          application.application = decision;
          await application.save();
        }
    
        res.status(201).json({
          message: 'ReceivedNotification created successfully',
          data: receivedNotification
        });
      } catch (error) {
        res.status(500).json({
          message: 'Error creating ReceivedNotification',
          error: error.message
        });
      }

}