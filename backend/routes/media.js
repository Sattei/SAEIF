const express = require('express');
const multer = require('multer');
const path = require('path');
const Media = require('../models/Media');

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/media/upload - Upload a file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { filename, originalname, mimetype, size } = req.file;
    const url = `/uploads/${filename}`;
    const media = new Media({ filename, originalname, mimetype, size, url });
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/media - List all media
router.get('/', async (req, res) => {
  try {
    const media = await Media.find().sort({ uploadedAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/media/:id - Get a single media file's metadata
router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: 'Media not found' });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 