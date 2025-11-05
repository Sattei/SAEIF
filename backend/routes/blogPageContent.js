const express = require('express');
const BlogPageContent = require('../models/BlogPageContent');
const admin = require('../middleware/admin');

const router = express.Router();

// GET /api/blogpagecontent - Get current blog page intro/description
router.get('/', async (req, res) => {
  try {
    const content = await BlogPageContent.findOne().sort({ updatedAt: -1 });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/blogpagecontent - Create new intro/description (admin only)
router.post('/', admin, async (req, res) => {
  try {
    const { intro } = req.body;
    const content = new BlogPageContent({ intro });
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/blogpagecontent/:id - Update intro/description (admin only)
router.put('/:id', admin, async (req, res) => {
  try {
    const { intro } = req.body;
    const content = await BlogPageContent.findByIdAndUpdate(
      req.params.id,
      { intro, updatedAt: Date.now() },
      { new: true }
    );
    if (!content) return res.status(404).json({ error: 'Content not found' });
    res.json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;