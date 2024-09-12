const Student = require('./../models/studentModel');  // Assuming your schema is in the models folder

// Controller to create a new Student document
exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      phoneNoFather,
      phoneNoMother,
      email,
      dob,
      address,
      fatherName,
      motherName,
      nationality,
      religion,
      state,
      district,
      caste,
      class: studentClass,
      academicYear,
      admissionNo
    } = req.body;

    // Create a new Student document using the request body data
    const newStudent = new Student({
      name,
      age,
      gender,
      phoneNoFather,
      phoneNoMother,
      email,
      dob,
      address,
      fatherName,
      motherName,
      nationality,
      religion,
      state,
      district,
      caste,
      class: studentClass,
      academicYear,
      admissionNo
    });

    // Save the new student document to the database
    const savedStudent = await newStudent.save();

    // Send a success response with the saved student document
    res.status(201).json({
      message: 'Student created successfully'
    });
  } catch (error) {
    // Handle validation or server errors
    res.status(500).json({
      message: 'Error creating student',
      error: error.message
    });
  }
};


// Controller to update a student by ID
exports.updateStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: req.body }, // Update the fields with the data sent in the request body
      { new: true, runValidators: true } // Return the updated document and validate the data
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.status(200).json({
      message: 'Student updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating student',
      error: error.message
    });
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.status(200).json({
      message: 'Student profile retrieved successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving student profile',
      error: error.message
    });
  }
};




// the multer part starts from here
exports.uploadDocs = async(req, res) => {
  
}