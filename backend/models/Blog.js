const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    // ✅ Updated to store GridFS filename instead of local path
    coverImage: {
      type: String, // stores the GridFS filename (e.g., "1731099334256-image.jpg")
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
