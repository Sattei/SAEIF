const mongoose = require('mongoose');

const blogPageContentSchema = new mongoose.Schema({
  intro: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPageContent', blogPageContentSchema);