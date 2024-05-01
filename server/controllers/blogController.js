// Import necessary modules
const express = require('express');
const Blog = require('../models/Blog');
const Guide = require('../models/Guide');
const  client = require("../Redis/config")

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

        const setData = await client.set("BlogDetails", JSON.stringify(allBlogs));
        if (!setData) {
            console.log("Something went wrong while caching data.");
        } else {
            await client.expire("BlogDetails", 3600)
        }

        console.log("Fetching Data From the DataBase");
        res.status(200).json({ success: true, blogs: allBlogs });
    } catch (error) {
        console.error("Error fetching all blogs:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
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

// Fetch blogs based on destination
exports.fetchBlogsByDestination = async (req, res, next) => {
    try {
        const { destination } = req.body;

        if (!destination) {
            return res.status(400).json({ success: false, message: 'Destination is required in the request body' });
        }

        // Use a regular expression to perform a case-insensitive search for blogs with the given destination in their title
        const blogsByDestination = await Blog.find({ title: { $regex: new RegExp(destination, 'i') } });

        res.status(200).json({ success: true, blogs: blogsByDestination });
    } catch (error) {
        console.error('Error fetching blogs by destination:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Fetch a blog by its ID
exports.fetchBlogById = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        if (!blogId) {
            return res.status(400).json({ success: false, message: 'BlogId is required in the request body' });
        }

        // Find the blog based on the provided blogId
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        res.status(200).json({ success: true, blog });
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

