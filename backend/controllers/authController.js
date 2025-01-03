const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const validator = require("validator");

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expiry
  });
};

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required. Please provide full name, email, password, and role.",
    });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists. Please try logging in.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "The email address provided is invalid. Please use a valid email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullName, email, password: hashedPassword, role });
    const user = await newUser.save();

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while registering the user. Please try again later.",
    });
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Both email and password are required to log in.",
    });
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      token: createToken(user.id),
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password. Please try again.",
    });
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully.",
      user: {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found. Please check your credentials and try again.",
    });
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      user: {
        _id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      token: createToken(updatedUser.id),
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found. Please check your credentials and try again.",
    });
  }
});

// @desc Logout user
// @route GET /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "You have been logged out successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while logging out. Please try again.",
    });
  }
});

//* FORGOT PASSWORD (Generate OTP)
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found with the provided email address.",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpirationTime = Date.now() + 10 * 60 * 1000;
  user.resetToken = otp;
  user.resetTokenExpiry = otpExpirationTime;

  await user.save();

  console.log(`Generated OTP: ${otp}`);
  console.log(`OTP expiration time: ${new Date(otpExpirationTime).toISOString()}`);

  await sendPasswordResetEmail(user, otp);

  res.status(200).json({
    success: true,
    message: "An OTP has been sent to your email address for password reset.",
  });
});

//* RESET PASSWORD (Verify OTP and reset password)
const resetPassword = asyncHandler(async (req, res) => {
  const { otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ resetToken: otp });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "The provided OTP is invalid. Please try again.",
      });
    }

    if (user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "The OTP has expired. Please request a new one.",
      });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and contain both letters and numbers.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Your password has been reset successfully. You can now log in with the new password.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while resetting the password. Please try again later.",
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
};
