const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');
const User = require('../models/User');
const adminAuth = require('../middleware/admin');

// Get all membership plans
router.get('/plans', async (req, res) => {
  try {
    const plans = await Membership.find({ isActive: true }).sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create/Update membership plan (Admin only)
router.post('/plans', adminAuth, async (req, res) => {
  try {
    const { planType, name, price, duration, features, isPopular } = req.body;
    
    const plan = await Membership.findOneAndUpdate(
      { planType },
      { name, price, duration, features, isPopular },
      { upsert: true, new: true }
    );
    
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user membership (Admin only)
router.put('/user/:userId', adminAuth, async (req, res) => {
  try {
    const { membershipPlan, paymentStatus, paymentAmount } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.membershipPlan = membershipPlan;
    user.paymentStatus = paymentStatus;
    user.paymentAmount = paymentAmount;
    
    if (paymentStatus === 'completed') {
      user.membershipStartDate = new Date();
      
      if (membershipPlan === 'lifetime') {
        user.membershipExpiry = null;
      } else {
        const months = membershipPlan === '6-month' ? 6 : 12;
        user.membershipExpiry = new Date();
        user.membershipExpiry.setMonth(user.membershipExpiry.getMonth() + months);
      }
    }
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user membership status
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const membershipStatus = {
      plan: user.membershipPlan,
      status: user.paymentStatus,
      isActive: user.isMembershipActive(),
      expiry: user.membershipExpiry,
      startDate: user.membershipStartDate,
      amount: user.paymentAmount
    };
    
    res.json(membershipStatus);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 