const express = require('express');
const YouTubeVideo = require('../models/YouTubeVideo');
const admin = require('../middleware/admin');

const router = express.Router();

// GET /api/youtube - List all videos (public/member)
router.get('/', async (req, res) => {
  try {
    const videos = await YouTubeVideo.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/youtube - Add new video (admin only)
router.post('/', admin, async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const video = new YouTubeVideo({ title, url, description });
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/youtube/:id - Edit video (admin only)
router.put('/:id', admin, async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const video = await YouTubeVideo.findByIdAndUpdate(
      req.params.id,
      { title, url, description },
      { new: true }
    );
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/youtube/:id - Delete video (admin only)
router.delete('/:id', admin, async (req, res) => {
  try {
    const video = await YouTubeVideo.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;