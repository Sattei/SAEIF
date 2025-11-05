const mongoose = require('mongoose');

const youTubeVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('YouTubeVideo', youTubeVideoSchema);