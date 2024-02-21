const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  guide: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: [String], // Array of userIds who liked the blog
    default: [],
  },
  dislikes: {
    type: [String], // Array of userIds who disliked the blog
    default: [],
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
