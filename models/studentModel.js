const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phoneNoFather: {
    type: String,  // Array to store both parents' phone numbers
    required: true
  },
  phoneNoMother: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {  // Date of Birth
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  motherName:{
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  religion: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  caste: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  admissionNo: {
    type: String,
    required: true
  },
  // Modified documents field to store key-value pairs of document types and their URLs
  documents: {
    type: Map,
    of: String,  // Maps document type (e.g., "sports certificate") to Cloudinary URL
    default: {}
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;