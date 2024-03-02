const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    package: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    numberOfMembers: {
        type: Number,
        required: true,
    },
    memberDetails: {
        type: [String],
        required: true,
    },
    selectedDate: {
        type: Date,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
});