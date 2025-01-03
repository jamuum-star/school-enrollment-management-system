const express = require('express');
const router = express.Router();
const StudentModel = require('../models/Student'); // Define your Student model


// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  const { fullName, dateOfBirth, grade, parentName, phone, email, address } = req.body;
  try {
    const newStudent = new StudentModel({ fullName, dateOfBirth, grade, parentName, phone, email, address });
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding student' });
  }
});

// Define more student-related routes as needed...

module.exports = router;

  







// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Create a new user
// router.post('/', async (req, res) => {
//   const { fullName, email, password, role } = req.body;
//   try {
//     const newUser = new User({ fullName, email, password, role });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update user
// router.put('/:id', async (req, res) => {
//   const { fullName, email, role } = req.body;
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.fullName = fullName || user.fullName;
//     user.email = email || user.email;
//     user.role = role || user.role;
//     await user.save();

//     res.json({ message: 'User updated successfully', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete user
// router.delete('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     await user.remove();
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;