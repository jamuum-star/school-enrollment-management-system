// models/FeeStructure.js
const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  program: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('FeeStructure', feeStructureSchema);

// models/Payment.js
// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
//   status: { type: String, enum: ['Pending', 'Paid', 'Overdue'], required: true },
//   amount: { type: Number, required: true },
//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Payment', paymentSchema);