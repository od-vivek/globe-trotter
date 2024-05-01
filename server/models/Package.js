// Package.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  nights: {
    type: Number,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  itn: {
    type: String,
    required: true,
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide',
    required: true,
  },
  imageUrls: [{
    type: String,
    required: true,
  }],
  reviews: [{
    user : {
      type: String, 
    },
    content: {
      type: String,
    },
  }],
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
