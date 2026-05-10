const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  getActivePhotos,
  getAllPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
} = require('../controllers/photoController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 } // Max 2MB
});

router.route('/').get(getActivePhotos).post(protect, upload.single('image'), createPhoto);
router.route('/all').get(protect, getAllPhotos);
router.route('/:id').put(protect, upload.single('image'), updatePhoto).delete(protect, deletePhoto);

module.exports = router;
