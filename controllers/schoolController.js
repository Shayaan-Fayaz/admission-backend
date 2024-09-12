const School = require('../models/schoolModel');  // Assuming the schema is in models folder


// Controller to create a new School document
exports.createSchool = async (req, res) => {
    try {
      const {
        schoolName,
        UDISECode,
        principalName,
        mobileNumber,
        email,
        address,
        boardAffiliated,
        affiliation,
        intakeCapacity,
        labs,
        classes,
        teachersCount,
        studentCount
      } = req.body;
  
      // Create a new School document using the request body data
      const newSchool = new School({
        schoolName,
        UDISECode,
        principalName,
        mobileNumber,
        email,
        address,
        boardAffiliated,
        affiliation,
        intakeCapacity,
        labs, // Expecting labs as key-value pairs, e.g. { physics: 3, chemistry: 5 }
        classes, // Expecting classes as key-value pairs, e.g. { "1": 18, "2": 21 }
        teachersCount,
        studentCount
      });
  
      // Save the new school document to the database
      const savedSchool = await newSchool.save();
  
      // Send a success response with the saved school document
      res.status(201).json({
        message: 'School created successfully'
      });
    } catch (error) {
      // Handle validation or server errors
      res.status(500).json({
        message: 'Error creating school',
        error: error.message
      });
    }
  };
  


// Controller to update a school by ID
exports.updateSchoolById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedSchool = await School.findByIdAndUpdate(
        id,
        { $set: req.body }, // Update the fields with the data sent in the request body
        { new: true, runValidators: true } // Return the updated document and validate the data
      );
  
      if (!updatedSchool) {
        return res.status(404).json({
          message: 'School not found'
        });
      }
  
      res.status(200).json({
        message: 'School updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating school',
        error: error.message
      });
    }
  };
  
// Controller to get a school by ID
exports.getSchoolById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const school = await School.findById(id);
  
      if (!school) {
        return res.status(404).json({
          message: 'School not found'
        });
      }
  
      res.status(200).json({
        message: 'School profile retrieved successfully',
        school: school
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving school profile',
        error: error.message
      });
    }
  };
  


// Controller to search schools by name with priority on full matches
exports.searchSchoolByName = async (req, res) => {
    const { query } = req.params; // Query for searching the school name
  
    try {
      // Perform regex search with case-insensitive matching
      const schools = await School.find({
        schoolName: { $regex: query, $options: 'i' }
      });
  
      // Prioritize the results: full match scores higher
      const sortedSchools = schools.map(school => {
        let score = 0;
  
        // If exact match, give it highest priority (score of 2)
        if (school.schoolName.toLowerCase() === query.toLowerCase()) {
          score = 2;
        }
        // If the query is contained within the name, give it a lower priority (score of 1)
        else if (school.schoolName.toLowerCase().includes(query.toLowerCase())) {
          score = 1;
        }
  
        return { ...school._doc, score }; // Attach the score to the result
      }).sort((a, b) => b.score - a.score); // Sort results by score in descending order
  
      res.status(200).json({
        message: 'Schools retrieved successfully',
        schools: sortedSchools
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error searching for schools',
        error: error.message
      });
    }
  };
  