const Ticker = require('../models/Ticker');

// @desc    Get all active tickers
// @route   GET /api/tickers
// @access  Public
const getActiveTickers = async (req, res) => {
  try {
    const tickers = await Ticker.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(tickers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all tickers (admin)
// @route   GET /api/tickers/all
// @access  Private
const getAllTickers = async (req, res) => {
  try {
    const tickers = await Ticker.find({}).sort({ createdAt: -1 });
    res.json(tickers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a ticker
// @route   POST /api/tickers
// @access  Private
const createTicker = async (req, res) => {
  try {
    const ticker = new Ticker(req.body);
    const createdTicker = await ticker.save();
    res.status(201).json(createdTicker);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ticker data' });
  }
};

// @desc    Update a ticker
// @route   PUT /api/tickers/:id
// @access  Private
const updateTicker = async (req, res) => {
  try {
    const ticker = await Ticker.findById(req.params.id);

    if (ticker) {
      ticker.text = req.body.text || ticker.text;
      ticker.urgent = req.body.urgent !== undefined ? req.body.urgent : ticker.urgent;
      ticker.isActive = req.body.isActive !== undefined ? req.body.isActive : ticker.isActive;
      ticker.order = req.body.order !== undefined ? req.body.order : ticker.order;

      const updatedTicker = await ticker.save();
      res.json(updatedTicker);
    } else {
      res.status(404).json({ message: 'Ticker not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Delete a ticker
// @route   DELETE /api/tickers/:id
// @access  Private
const deleteTicker = async (req, res) => {
  try {
    const ticker = await Ticker.findById(req.params.id);

    if (ticker) {
      await ticker.deleteOne();
      res.json({ message: 'Ticker removed' });
    } else {
      res.status(404).json({ message: 'Ticker not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getActiveTickers,
  getAllTickers,
  createTicker,
  updateTicker,
  deleteTicker,
};
