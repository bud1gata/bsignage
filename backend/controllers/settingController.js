const Setting = require('../models/Setting');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    const settings = await Setting.find({});
    // Convert array to key-value object
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });
    
    // Default tickerSpeed if not set
    if (!settingsObj.tickerSpeed) {
      settingsObj.tickerSpeed = 30;
    }
    
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a setting
// @route   PUT /api/settings/:key
// @access  Private
const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    let setting = await Setting.findOne({ key });
    
    if (setting) {
      setting.value = value;
      await setting.save();
    } else {
      setting = await Setting.create({ key, value });
    }
    
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSettings, updateSetting };
