require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function resetPassword() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/saeif');
  const hash = await bcrypt.hash('123', 10);
  const result = await User.updateOne({ email: 'astitva' }, { $set: { password: hash } });
  if (result.modifiedCount > 0) {
    console.log('User astitva password reset to 123');
  } else {
    console.log('No user found or password already set');
  }
  process.exit();
}

resetPassword();