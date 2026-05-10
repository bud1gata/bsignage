const express = require('express');
const router = express.Router();
const { loginAdmin, getStats, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/stats', protect, getStats);
router.put('/password', protect, changePassword);

module.exports = router;
