// controllers/studentController.js
const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new student
exports.createStudent = async (req, res) => {
  const student = new Student({
    fullName: req.body.fullName,
    dateOfBirth: req.body.dateOfBirth,
    grade: req.body.grade,
    contactInformation: req.body.contactInformation,
    address: req.body.address,
    documents: req.body.documents,
    enrollmentStatus: req.body.enrollmentStatus
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


































// const Student = require('../models/Student'); // Assuming you have a Student model
// const fs = require('fs');
// const path = require('path');

// // Add a new student
// const addStudent = async (req, res) => {
//   try {
//     const { name, email, course } = req.body;
//     const newStudent = new Student({ name, email, course });
//     await newStudent.save();
//     res.status(201).json(newStudent);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to add student' });
//   }
// };

// // Upload student documents
// const uploadDocuments = (req, res) => {
//   try {
//     if (!req.files) {
//       return res.status(400).json({ message: 'No files uploaded' });
//     }

//     // Assuming you store the document names or paths
//     const documentPaths = req.files.map(file => file.path);

//     res.status(200).json({ message: 'Documents uploaded successfully', documents: documentPaths });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to upload documents' });
//   }
// };

// // Get a specific student by ID
// const getStudent = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.status(200).json(student);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch student' });
//   }
// };

// // Update student enrollment status
// const updateEnrollmentStatus = async (req, res) => {
//   try {
//     const { status } = req.body; // Assuming the status is sent in the request body
//     const student = await Student.findByIdAndUpdate(
//       req.params.id,
//       { enrollmentStatus: status },
//       { new: true }
//     );
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.status(200).json(student);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to update enrollment status' });
//   }
// };

// module.exports = { addStudent, uploadDocuments, getStudent, updateEnrollmentStatus };























// const Student = require('../models/Student');

// // Create a new student
// const createStudent = async (req, res) => {
//   const { fullName, dateOfBirth, grade, contactInfo, address } = req.body;

//   try {
//     const newStudent = new Student({ fullName, dateOfBirth, grade, contactInfo, address });
//     await newStudent.save();
//     res.status(201).json(newStudent);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all students
// const getStudents = async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update student
// const updateStudent = async (req, res) => {
//   try {
//     const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedStudent);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete student
// const deleteStudent = async (req, res) => {
//   try {
//     await Student.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Student deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { createStudent, getStudents, updateStudent, deleteStudent };
