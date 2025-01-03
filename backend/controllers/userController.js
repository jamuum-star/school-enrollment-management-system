// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Register a new user
// const registerUser = async (req, res) => {
//     const { fullName, email, password, role } = req.body;

//     // Check if all required fields are provided
//     if (!fullName || !email || !password || !role) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User already exists with this email' });
//         }

//         // Hash password before saving to DB
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({
//             fullName,
//             email,
//             password: hashedPassword,
//             role,
//         });

//         // Save the user to the database
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error registering user. Please try again later.' });
//     }
// };

// // Login user
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     // Check if both email and password are provided
//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required' });
//     }

//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         // Send token in response
//         res.json({ token });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };

// module.exports = { registerUser, loginUser };


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  // Check if all required fields are provided
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password,
      role,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering user. Please try again later.' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send token in response
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = { registerUser, loginUser };