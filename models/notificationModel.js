const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    currentInstituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',  // Reference to the School model
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',  // Reference to the Student model
        required: true
    },
    message: {
        type: String,   // The notification message
        required: true
    },
    applicationId: {  // New field to store the application ID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now  // Automatically set the timestamp when created
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
