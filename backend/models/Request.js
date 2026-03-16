const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    foodTypeRequired: {
        type: String,
        required: true,
    },
    quantityNeeded: {
        type: String,
        required: true,
    },
    location: {
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
    urgency: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    status: {
        type: String,
        enum: ['pending', 'fulfilled'],
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
