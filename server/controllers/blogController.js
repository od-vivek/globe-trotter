// Import necessary modules
const express = require('express');
const Blog = require('../models/Blog');
const Guide = require('../models/Guide');

// Create a new blog
exports.postBlog = async (req, res) => {
  try {
    const { guideName, title, content } = req.body;
    console.log(req.body);
    // Find the guide based on the provided guideName
    const guide = await Guide.findOne({ name: guideName });

    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    // Create a new blog object
    const newBlog = new Blog({
      guide: guideName, // Use guide's _id directly
      title,
      content,
    });

    // Save the new blog to the database
    const savedBlog = await newBlog.save();

    // Update the guide's blogs array with the new blog's ID
    guide.blogs.unshift(savedBlog._id);
    await guide.save();

    return res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetch all blogs
exports.fetchAllBlogs = async (req, res, next) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json({ success: true, blogs: allBlogs });
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Fetch blogs for a specific guide
exports.fetchGuideBlogs = async (req, res, next) => {
  try {
    const guideName = req.body.guideName; 
    if (!guideName) {
      return res.status(400).json({ success: false, message: 'GuideName is required in the request body' });
    }

    const guideBlogs = await Blog.find({ guide: guideName });
    res.status(200).json({ success: true, blogs: guideBlogs });
  } catch (error) {
    console.error('Error fetching guide blogs:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
