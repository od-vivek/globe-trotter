const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  bookings: [{
    type: String,
    unique: true
  }],
  wishlist: [{
    type: String,
    unique: true
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
