const express = require("express");
const User = require("../models/User"); // <-- This is the critical line
const admin = require("../middleware/admin");
const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Admin
router.get("/", admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message); // Log the error
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/users/promote/:id
// @desc    Promote a user to admin (admin only)
// @access  Admin
router.put("/promote/:id", admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin" });
  } catch (err) {
    console.error(err.message); // Log the error
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/users/demote/:id
// @desc    Demote an admin back to user (admin only)
// @access  Admin
router.put("/demote/:id", admin, async (req, res) => {
  try {
    // 1. Check that the admin is not demoting themselves
    if (req.user.userId === req.params.id) {
      return res.status(400).json({ error: "You cannot demote yourself." });
    }

    // 2. Find and demote the user
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = "member";
    await user.save();

    res.json({ message: "User demoted to user" });
  } catch (err) {
    console.error(err.message); // Log the error
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
