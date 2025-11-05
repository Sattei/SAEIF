const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  planType: {
    type: String,
    enum: ['6-month', '1-year', 'lifetime'],
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // in months, 0 for lifetime
    required: true,
  },
  features: [{
    type: String,
    required: true,
  }],
  isPopular: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Membership', MembershipSchema); 