const express = require('express');
const router = express.Router();
const { getSettings, updateSetting } = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSettings);
router.put('/:key', protect, updateSetting);

module.exports = router;
