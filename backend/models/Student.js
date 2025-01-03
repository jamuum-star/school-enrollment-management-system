// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const studentSchema = new Schema({
//   fullName: { type: String, required: true },
//   dateOfBirth: { type: Date, required: true },
//   grade: { type: String, required: true },
//   contactInfo: {
//     parentName: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true },
//   },
//   address: { type: String, required: true },
//   enrollmentStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
// }, { timestamps: true });

// module.exports = mongoose.model('Student', studentSchema);

// models/Student.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const studentSchema = new Schema(
  {
    _id: { type: Number }, // Auto-incrementing ID
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    grade: { type: String, required: true },
    contactInformation: {
      parentName: { type: String, required: true },
      parentPhoneNumber: { type: String, required: true },
      parentEmail: { type: String, required: true },
    },
    address: { type: String, required: true },
    documents: [{ type: String }],
    enrollmentStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

// Apply the auto-increment plugin to the schema
studentSchema.plugin(AutoIncrement, {
  id: "student_id_counter",
  inc_field: "_id",
});

module.exports = mongoose.model("Student", studentSchema);
