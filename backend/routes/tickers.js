const express = require('express');
const router = express.Router();
const {
  getActiveTickers,
  getAllTickers,
  createTicker,
  updateTicker,
  deleteTicker,
} = require('../controllers/tickerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getActiveTickers).post(protect, createTicker);
router.route('/all').get(protect, getAllTickers);
router.route('/:id').put(protect, updateTicker).delete(protect, deleteTicker);

module.exports = router;
