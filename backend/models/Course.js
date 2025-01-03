// const mongoose = require('mongoose');
// const courseSchema = new Schema({
//   name: { type: String, required: true },
//   grade: { type: String, required: true },
//   maxCapacity: { type: Number, required: true },
//   enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
// }, { timestamps: true });

// module.exports = mongoose.model('Course', courseSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  maxCapacity: { type: Number, required: true },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);