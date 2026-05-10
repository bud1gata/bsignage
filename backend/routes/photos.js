const express = require('express');
const router = express.Router();
const {
  getActivePhotos,
  getAllPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
} = require('../controllers/photoController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getActivePhotos).post(protect, createPhoto);
router.route('/all').get(protect, getAllPhotos);
router.route('/:id').put(protect, updatePhoto).delete(protect, deletePhoto);

module.exports = router;
