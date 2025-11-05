const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // --- FIX ---
    // Added user.isAdmin to the token payload
    const payload = {
      userId: user._id,
      role: user.role,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: 900, // --- FIX --- (This is 15 minutes)
    });

    res.json({
      token,
      role: user.role,
      userId: user._id,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 2. Create new user instance
    user = new User({
      email,
      password,
    });

    // 3. Save user to database
    await user.save();

    // 4. (Optional) Log the user in immediately by creating a token
    // --- FIX ---
    // Added user.isAdmin to the token payload
    const payload = {
      userId: user._id,
      role: user.role,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: 900, // --- FIX --- (This is 15 minutes)
    });

    // 5. Send back the token and role
    res
      .status(201)
      .json({
        token,
        role: user.role,
        userId: user._id,
        isAdmin: user.isAdmin,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
