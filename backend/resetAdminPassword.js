require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function resetPassword() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/saeif');
  const hash = await bcrypt.hash('12345', 10);
  const result = await User.updateOne({ email: 'SAEIF.MANYA' }, { $set: { password: hash } });
  if (result.modifiedCount > 0) {
    console.log('Admin password reset to 12345');
  } else {
    console.log('No user found or password already set');
  }
  process.exit();
}

resetPassword();