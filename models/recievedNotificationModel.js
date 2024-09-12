const mongoose = require('mongoose');

const receivedNotificationSchema = new mongoose.Schema({
  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  decision: {
    type: String,
    enum: ['Approved', 'Rejected'],
    default: null  // No default value for decision
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ReceivedNotification = mongoose.model('ReceivedNotification', receivedNotificationSchema);

module.exports = ReceivedNotification;
