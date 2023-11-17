// Destination.js
const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrls: [{
    type: String,
    required: true,
  }],
  // Add other properties as needed
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
