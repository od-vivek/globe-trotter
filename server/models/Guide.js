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
  blogs: [{
    type: String, // Assuming you use strings as blog IDs
  }],
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;
