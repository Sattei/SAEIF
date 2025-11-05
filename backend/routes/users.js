const express = require("express");
const User = require("../models/User");
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
    console.error(err.message);
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
    user.isAdmin = true; // ✅ Ensure flag is updated
    await user.save();

    res.json({ message: "User promoted to admin successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/users/demote/:id
// @desc    Demote an admin back to user (admin only)
// @access  Admin
router.put("/demote/:id", admin, async (req, res) => {
  try {
    // Prevent self-demotion
    if (req.user.userId === req.params.id) {
      return res.status(400).json({ error: "You cannot demote yourself." });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = "member";
    user.isAdmin = false; // ✅ Ensure flag is updated
    await user.save();

    res.json({ message: "User demoted to member successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
