const Course = require('../models/Course');
const Student = require('../models/Student');

// Add a new course
exports.addCourse = async (req, res) => {
  const { name, grade, maxCapacity } = req.body;
  try {
    const newCourse = new Course({ name, grade, maxCapacity });
    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error adding course', error });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, grade, maxCapacity } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, { name, grade, maxCapacity }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('enrolledStudents');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};

// Get a specific course by ID
exports.getCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id).populate('enrolledStudents');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
};


















































// const Course = require('../models/Course');

// exports.addCourse = async (req, res) => {
//   const { courseName, description, grade, capacity } = req.body;

//   try {
//     const course = new Course({
//       courseName,
//       description,
//       grade,
//       capacity,
//     });

//     await course.save();
//     res.status(201).json({ message: 'Course added successfully!', course });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
