const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    guideId: {
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
    photos: [{
        type: String,
        required: true,
    }],
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
