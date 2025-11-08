const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// --- 1. EMAIL TRANSPORTER (for password reset) ---
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT == 465, // true if 465, false otherwise
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- 2. LOGIN ROUTE ---
router.post("/login", async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // find user by email or phone
    const user = await User.findOne(email ? { email } : { phone });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (err) {
    console.error("LOGIN_ERROR:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// --- 3. REGISTER ROUTE (optional if you already have one elsewhere) ---
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone is required" });
    }

    const existing = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "user",
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("REGISTER_ERROR:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// --- 4. FORGOT PASSWORD ROUTE ---
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Always respond success (security measure)
      return res.status(200).json({
        message:
          "If an account with this email exists, a reset code has been sent.",
      });
    }

    // generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const mailOptions = {
      from: `"SAEIF" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: "Your Password Reset Code",
      html: `<p>Your password reset code is: <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message:
        "If an account with this email exists, a reset code has been sent.",
    });
  } catch (err) {
    console.error("FORGOT_PASSWORD_ERROR:", err);
    res.status(500).json({ error: "Error sending reset email." });
  }
});

// --- 5. RESET PASSWORD ROUTE ---
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired OTP. Please try again." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({
      message: "Password reset successful. You can now log in.",
    });
  } catch (err) {
    console.error("RESET_PASSWORD_ERROR:", err);
    res.status(500).json({ error: "Error resetting password." });
  }
});

module.exports = router;
