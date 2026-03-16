const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    donationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
    },
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
    },
    status: {
        type: String,
        enum: ['accepted', 'in_progress', 'completed'],
        default: 'accepted',
    },
    route: {
        type: String, // Can store as JSON string or array of coordinates depending on complex needs
    }
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
