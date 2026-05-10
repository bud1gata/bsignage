const Photo = require('../models/Photo');

const getBaseUrl = (req) => {
  return process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
};

// @desc    Get all active photos
// @route   GET /api/photos
// @access  Public
const getActivePhotos = async (req, res) => {
  try {
    const photos = await Photo.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all photos (admin)
// @route   GET /api/photos/all
// @access  Private
const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({}).sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a photo
// @route   POST /api/photos
// @access  Private
const createPhoto = async (req, res) => {
  try {
    let url = req.body.url;
    if (req.file) {
      url = `${getBaseUrl(req)}/uploads/${req.file.filename}`;
    }

    const photoData = {
      ...req.body,
      url: url
    };

    const photo = new Photo(photoData);
    const createdPhoto = await photo.save();
    res.status(201).json(createdPhoto);
  } catch (error) {
    res.status(400).json({ message: 'Invalid photo data' });
  }
};

// @desc    Update a photo
// @route   PUT /api/photos/:id
// @access  Private
const updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (photo) {
      if (req.file) {
        photo.url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      } else if (req.body.url) {
        photo.url = req.body.url;
      }
      
      photo.title = req.body.title !== undefined ? req.body.title : photo.title;
      photo.description = req.body.description !== undefined ? req.body.description : photo.description;
      
      // Handle boolean conversion for formData
      if (req.body.isActive !== undefined) {
        photo.isActive = req.body.isActive === 'true' || req.body.isActive === true;
      }
      
      photo.order = req.body.order !== undefined ? req.body.order : photo.order;

      const updatedPhoto = await photo.save();
      res.json(updatedPhoto);
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Delete a photo
// @route   DELETE /api/photos/:id
// @access  Private
const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (photo) {
      await photo.deleteOne();
      res.json({ message: 'Photo removed' });
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getActivePhotos,
  getAllPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
