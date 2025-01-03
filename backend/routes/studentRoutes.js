// const express = require('express');
// const {
//     addStudent,
//     uploadDocuments,
//     getStudent,
//     updateEnrollmentStatus,
// } = require('../controllers/studentController');
// const multer = require('multer');

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

// // Student routes
// router.post('/', addStudent); // Add a new student
// router.post('/:id/documents', upload.array('documents'), uploadDocuments); // Upload student documents
// router.get('/:id', getStudent); // Get a specific student by ID
// router.put('/:id/status', updateEnrollmentStatus); // Update student enrollment status

// module.exports = router;










































// // const express = require('express');
// // const {
// //     addStudent,
// //     uploadDocuments,
// //     getStudent,
// //     updateEnrollmentStatus,
// // } = require('../controllers/studentController');
// // const multer = require('multer');

// // const router = express.Router();
// // const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

// // // Student routes
// // router.post('/', addStudent); // Add a new student
// // router.post('/:id/documents', upload.array('documents'), uploadDocuments); // Upload student documents
// // router.get('/:id', getStudent); // Get a specific student by ID
// // router.put('/:id/status', updateEnrollmentStatus); // Update student enrollment status

// // module.exports = router;






















// // // // const express = require('express');
// // // // const {
// // // //   createStudent,
// // // //   getStudents,
// // // //   updateStudent,
// // // //   deleteStudent,
// // // // } = require('../controllers/studentController');

// // // // const router = express.Router();

// // // // // Route to get all students
// // // // router.get('/', getStudents);

// // // // // Route to create a new student
// // // // router.post('/', createStudent);

// // // // // Route to update a student by ID
// // // // router.put('/:id', updateStudent);

// // // // // Route to delete a student by ID
// // // // router.delete('/:id', deleteStudent);

// // // // module.exports = router;



// // // // routes/studentRoutes.js
// // // const express = require('express');
// // // const Student = require('../models/User'); // Import the Student model

// // // const router = express.Router();

// // // // Fetch all students
// // // router.get('/', async (req, res) => {
// // //     try {
// // //         const students = await Student.find();
// // //         res.json(students);
// // //     } catch (error) {
// // //         res.status(500).json({ message: 'Error fetching students' });
// // //     }
// // // });

// // // // Add a new student
// // // router.post('/', async (req, res) => {
// // //     const { fullName, email, role } = req.body;
// // //     try {
// // //         const newStudent = new Student({ fullName, email, role });
// // //         await newStudent.save();
// // //         res.status(201).json({ message: 'Student added successfully', student: newStudent });
// // //     } catch (error) {
// // //         res.status(500).json({ message: 'Error adding student' });
// // //     }
// // // });

// // // // Update a student
// // // router.put('/:id', async (req, res) => {
// // //     const { id } = req.params;
// // //     const { fullName, email, role } = req.body;
// // //     try {
// // //         const updatedStudent = await Student.findByIdAndUpdate(id, { fullName, email, role }, { new: true });
// // //         res.json({ message: 'Student updated successfully', student: updatedStudent });
// // //     } catch (error) {
// // //         res.status(500).json({ message: 'Error updating student' });
// // //     }
// // // });

// // // // Delete a student
// // // router.delete('/:id', async (req, res) => {
// // //     const { id } = req.params;
// // //     try {
// // //         await Student.findByIdAndDelete(id);
// // //         res.json({ message: 'Student deleted successfully' });
// // //     } catch (error) {
// // //         res.status(500).json({ message: 'Error deleting student' });
// // //     }
// // // });

// // // module.exports = router;

// // routes/studentRoutes.js
// const express = require('express');
// const router = express.Router();
// const studentController = require('../controllers/studentController');

// // Get all students
// router.get('/', studentController.getAllStudents);

// // Get student by ID
// router.get('/:id', studentController.getStudentById);

// // Create new student
// router.post('/', studentController.createStudent);

// // Update student
// router.put('/:id', studentController.updateStudent);

// // Delete student
// router.delete('/:id', studentController.deleteStudent);

// module.exports = router;











// routes/studentRoutes.js
// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Get all students
router.get('/', studentController.getAllStudents);

// Get student by ID
router.get('/:id', studentController.getStudentById);

// Create new student
router.post('/', studentController.createStudent);

// Update student
router.put('/:id', studentController.updateStudent);

// Delete student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;