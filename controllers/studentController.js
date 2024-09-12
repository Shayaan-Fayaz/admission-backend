const Student = require('./../models/studentModel');  // Assuming your schema is in the models folder
const cloudinary = require('./../utils/cloudinary');


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


exports.updateStudentById = async (req, res) => {
  const { id } = req.params;
  const files = req.files; // Get the files from the request

  try {
    // Handle the update for other fields
    const { body } = req;
    let documents = {};

    if (files && files.length > 0) {
      // Upload files to Cloudinary
      const fileUploads = files.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({ fieldname: file.fieldname, url: result.secure_url });
            }
          }).end(file.buffer);
        });
      });

      const uploadResults = await Promise.all(fileUploads);

      // Map file results to document URLs
      documents = uploadResults.reduce((acc, file) => {
        acc[file.fieldname] = file.url;
        return acc;
      }, {});
    }

    // Prepare update data
    const updateData = { ...body };

    // If documents are present, merge them with the updateData
    if (Object.keys(documents).length > 0) {
      updateData.documents = { ...updateData.documents, ...documents };
    }

    // Update student document
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student information updated successfully', data: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error: error.message });
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