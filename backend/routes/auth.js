const express = require('express');
const router = express.Router();
const { loginAdmin, getStats } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/stats', protect, getStats);

module.exports = router;
