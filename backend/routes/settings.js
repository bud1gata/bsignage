const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getSettings, updateSetting } = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');
const Setting = require('../models/Setting');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'logo' + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }
});

router.get('/', getSettings);
router.put('/:key', protect, updateSetting);

// Logo upload
router.post('/logo', protect, upload.single('logo'), async (req, res) => {
  try {
    const logoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    let setting = await Setting.findOne({ key: 'logoUrl' });
    if (setting) {
      setting.value = logoUrl;
      await setting.save();
    } else {
      await Setting.create({ key: 'logoUrl', value: logoUrl });
    }
    
    res.json({ logoUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload logo' });
  }
});

module.exports = router;
