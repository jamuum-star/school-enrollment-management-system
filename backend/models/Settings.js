const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  theme: {
    type: String,
    default: 'light',
  },
  notifications: {
    type: Boolean,
    default: true,
  },
  language: {
    type: String,
    default: 'en',
  },
});

module.exports = mongoose.model('Settings', SettingsSchema);