const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['Admin', 'Parent', 'Student'] },
});

module.exports = mongoose.model('User', userSchema);
