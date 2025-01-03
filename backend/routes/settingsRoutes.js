const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get settings
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save settings
router.post('/', async (req, res) => {
  const { theme, notifications, language } = req.body;

  try {
    let settings = await Settings.findOne();
    if (settings) {
      settings.theme = theme;
      settings.notifications = notifications;
      settings.language = language;
    } else {
      settings = new Settings({ theme, notifications, language });
    }

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;