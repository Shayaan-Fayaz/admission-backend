const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true
  },
  UDISECode: {  // UDISE code is a unique identification number for schools in India
    type: String,
    required: true
  },
  principalName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  boardAffiliated: {
    type: String,  // Example: CBSE, ICSE, State Board, etc.
    required: true
  },
  affiliation: {
    type: String,  // Society or foundation that runs the school
    required: true
  },
  intakeCapacity: {
    type: Number,  // Number of students the school can admit
    required: true
  },
  labs: {
    type: Object,  // Number of labs the school has
    required: true
  },
  classes: {
    type: Object,  // Number of classes/grades the school has
    required: true
  },
  teachersCount: {
    type: Number,  // Total number of teachers in the school
    required: true
  },
  studentCount: {
    type: Number,  // Total number of students enrolled
    required: true
  },
  profile:{
    type: String
  }
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;