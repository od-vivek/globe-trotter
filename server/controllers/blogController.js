const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Guide = require('../models/Guide');

// Create a new blog
exports.postBlog = async (req, res) => {
  try {
    const { guideName, title, content, photos } = req.body;

    // Find the guide based on the provided name
    const guide = await Guide.findOne({ name: guideName });

    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    // Create a new blog object
    const newBlog = new Blog({
      guideId: guide._id.toString(), // Ensure guideId is a string
      title,
      content,
      photos,
    });

    // Save the new blog to the database
    const savedBlog = await newBlog.save();

    // Update the guide's blogs array with the new blog's ID
    guide.blogs.unshift(savedBlog._id.toString());
    await guide.save();

    return res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
