// const express = require("express");
// const {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   updateUserProfile,
//   logoutUser,
//   forgotPassword,
//   resetPassword,
// } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // @desc Register a new user
// // @route POST /api/users/register
// router.post("/register", registerUser);

// // @desc Login a user
// // @route POST /api/users/login
// router.post("/login", loginUser);

// // @desc Get user profile
// // @route GET /api/users/profile
// // @access Private
// router.get("/profile", protect, getUserProfile);

// // @desc Update user profile
// // @route PUT /api/users/profile
// // @access Private
// router.put("/profile", protect, updateUserProfile);

// // @desc Logout user
// // @route GET /api/users/logout
// // @access Private
// router.get("/logout", protect, logoutUser);

// // @desc Forgot Password
// // @route POST /api/users/forgot-password
// router.post("/forgot-password", forgotPassword);

// // @desc Reset Password
// // @route POST /api/users/reset-password
// router.post("/reset-password", resetPassword);

// module.exports = router;









//kan 2
// Register Route
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// router.get('/api/User', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // Handle user registration
// router.post('/register', async (req, res) => {
//   const { fullName, email, password, role } = req.body;
//   try {
//     const newUser = new User({ fullName, email, password, role });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (error) {
//     console.error('Error registering user:', error); // Log the error to the console
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// });


// // Login user
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Hubi haddii email uu database-ka ku jiro
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     // Hubi haddii password sax yahay
//     if (user.password !== password) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     // Login guuleystay
//     res.status(200).json({ message: 'Login successful.', user });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

module.exports = router;