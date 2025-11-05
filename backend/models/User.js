const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member',
  },
  // Membership information
  membershipPlan: {
    type: String,
    enum: ['6-month', '1-year', 'lifetime', null],
    default: null,
  },
  membershipExpiry: {
    type: Date,
    default: null,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  paymentAmount: {
    type: Number,
    default: 0,
  },
  membershipStartDate: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if membership is active
UserSchema.methods.isMembershipActive = function() {
  if (this.membershipPlan === 'lifetime') {
    return this.paymentStatus === 'completed';
  }
  if (!this.membershipExpiry || !this.membershipStartDate) {
    return false;
  }
  return this.paymentStatus === 'completed' && new Date() <= this.membershipExpiry;
};

module.exports = mongoose.model('User', UserSchema);