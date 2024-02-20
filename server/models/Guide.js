const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    guidePhoto: {
        type: String, // Store the file path
    },
    blogs: [{
        type: String, // Assuming you use strings as blog IDs
    }],
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;
