const express = require('express');
const {
  addCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getCourse,
} = require('../controllers/courseController');

const router = express.Router();

// Course routes
router.post('/', addCourse); // Add a new course
router.put('/:id', updateCourse); // Update a course
router.delete('/:id', deleteCourse); // Delete a course
router.get('/', getCourses); // Get all courses
router.get('/:id', getCourse); // Get a specific course by ID

module.exports = router;



































// const express = require('express');
// const { addCourse, getCourses } = require('../controllers/courseController');
// const router = express.Router();

// router.post('/add', addCourse);   
// router.get('/', getCourses);      

// module.exports = router;
