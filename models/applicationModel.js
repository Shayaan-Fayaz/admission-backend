const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    currentInstituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    application: {
        type: String,
        enum: ['Pending', 'In Process', 'Approved', 'Rejected']
    }
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;