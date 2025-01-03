const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: String,
    dateOfBirth: Date,
    grade: String,
    contactInfo: String,
    address: String,
    enrollmentStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    documents: [String],
});

module.exports = mongoose.model('Student', studentSchema);
