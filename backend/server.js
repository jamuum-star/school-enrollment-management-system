
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating tokens

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/schooldb1")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Import models
const User = require("./models/User");
const Student = require("./models/Student");
const Course = require("./models/Course");

// Import routes
const authRouter = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const feeRoutes = require("./routes/feeRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

// Use routes
app.use("/api/users", authRouter); // Auth routes
app.use("/api/students", studentRoutes); // Endpoint for students
app.use("/api/courses", courseRoutes); // Endpoint for courses
app.use("/api/fee", feeRoutes);
app.use("/api/settings", settingsRoutes);

// Register endpoint
app.post("/api/register", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  // Validation
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user
    const savedUser = await newUser.save();

    // Generate a token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      "your_jwt_secret", // Make sure this is a secure secret key
      { expiresIn: "1h" }
    );

    res.status(201).json({
      token,
      user: { email: savedUser.email, role: savedUser.role },
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "your_jwt_secret", // Ensure this secret is secure
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT endpoint to update a user
app.put("/api/users/:id", async (req, res) => {
  const { fullName, email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email, role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE endpoint to delete a user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// Endpoint to get total counts for users, students, and courses
app.get("/api/total-counts", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();

    res.json({
      totalUsers,
      totalStudents,
      totalCourses,
    });
  } catch (err) {
    console.error("Error fetching total counts:", err);
    res.status(500).json({ message: "Server error while fetching counts." });
  }
});

// Server Listening
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
