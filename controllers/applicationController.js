const Application = require('./../models/applicationModel');
const School = require('./../models/schoolModel');  // Assuming School model exists for institute data
const Student = require('./../models/studentModel');
const Notification = require('./../models/notificationModel'); // Import the Notification model
const ReceivedNotification = require('./../models/recievedNotificationModel');


// Function to simulate sending a notification to the currentInstitute
const sendNotificationToInstitute = (instituteId, message) => {
  // Here you can implement the actual notification logic, e.g., email, SMS, etc.
  console.log(`Notification sent to institute with ID ${instituteId}: ${message}`);
};

// Controller to create a new Application
exports.createApplication = async (req, res) => {
    try {
      const { studentName, studentId, currentInstituteId, application } = req.body;
  
      // Create a new Application document
      const newApplication = new Application({
        studentName,
        studentId,
        currentInstituteId,
        application: application || 'Pending'  // Default to 'Pending' if not provided
      });
  
      // Save the new application document to the database
      const savedApplication = await newApplication.save();
  
      res.status(201).json({
        message: 'Application created successfully',
        application: savedApplication
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating application',
        error: error.message
      });
    }
  };

// Controller to update application status by ID and notify the institute
exports.updateApplicationStatusById = async (req, res) => {
  const { id } = req.params;  // Application ID from URL
  const { application } = req.body;  // New status from request body

  try {
    // Find the application by ID
    const applicationDoc = await Application.findById(id);
    if (!applicationDoc) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the current status is 'Pending'
    if (applicationDoc.application === 'Pending') {
      // Send a notification to the currentInstitute
      const instituteId = applicationDoc.currentInstituteId;
      const studentId = applicationDoc.studentId;
      
      const institute = await School.findById(instituteId); // Assuming School model is linked
      const student = await Student.findById(studentId); // Assuming Student model is linked

      if (!institute) {
        return res.status(404).json({ message: 'Institute not found' });
      }

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // Create a new notification
      const notification = new Notification({
        currentInstituteId: instituteId,
        studentId: studentId,
        applicationId: id, // Add the application ID here
        message: `The application for student ${student.name} is now In Process.`
      });

      // Save the notification to the database
      await notification.save();

      // Update the application status to 'In Process'
      applicationDoc.application = 'In Process';
    } else {
      // Handle other status updates, or return if it's not 'Pending'
      return res.status(400).json({ message: 'Cannot change status unless application is in Pending state' });
    }

    // Save the updated application
    const updatedApplication = await applicationDoc.save();

    res.status(200).json({
      message: 'Application status updated to In Process successfully, notification sent to institute.',
      data: updatedApplication
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating application status',
      error: error.message
    });
  }
};

// Controller to get all Applications that are not 'Approved'
exports.getAllNonApprovedApplications = async (req, res) => {
    try {
      // Find all applications where the status is not 'Approved'
      const applications = await Application.find({ application: { $ne: 'Approved' } });
  
      res.status(200).json({
        message: 'Non-approved applications retrieved successfully',
        applications: applications
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving applications',
        error: error.message
      });
    }
  };

// // Controller to handle decision (approve/reject)
// exports.handleDecision = async (req, res) => {
//   const { id } = req.params;
//   const { decision } = req.body;

//   try {
//     const receivedNotification = await ReceivedNotification.findById(id);
//     if (!receivedNotification) {
//       return res.status(404).json({ message: 'Received notification not found' });
//     }

//     if (decision === 'Approved' || decision === 'Rejected') {
//       const application = await Application.findById(receivedNotification.notificationId);
//       if (!application) {
//         return res.status(404).json({ message: 'Application not found' });
//       }

//       application.application = decision;
//       receivedNotification.decision = decision;

//       await application.save();
//       await receivedNotification.save();

//       res.status(200).json({
//         message: `Application ${decision} successfully`,
//         data: application
//       });
//     } else {
//       res.status(400).json({ message: 'Invalid decision' });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error handling decision',
//       error: error.message
//     });
//   }
// };