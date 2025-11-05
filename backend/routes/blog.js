const express = require('express');
const Blog = require('../models/Blog');
const admin = require('../middleware/admin');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up multer for cover image uploads
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

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new blog (admin only, with optional cover image)
router.post('/', admin, upload.single('coverImage'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    let coverImage = '';
    if (req.file) {
      coverImage = `/uploads/${req.file.filename}`;
    }
    const newBlog = new Blog({ title, content, author, coverImage });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a blog (admin only, with optional cover image)
router.put('/:id', admin, upload.single('coverImage'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    let updateData = { title, content, author };
    if (req.file) {
      updateData.coverImage = `/uploads/${req.file.filename}`;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a blog (admin only)
router.delete('/:id', admin, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
