const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    pickupLocation: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
        address: {
            type: String,
            required: true,
        }
    },
    pickupTime: {
        type: Date,
        required: true,
    },
    expiryTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'accepted', 'assigned', 'completed'],
        default: 'available',
    },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
