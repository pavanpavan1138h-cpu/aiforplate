const Delivery = require('../models/Delivery');

// @desc    Assign a delivery to a volunteer
// @route   POST /api/deliveries
// @access  Private (Volunteer)
const assignDelivery = async (req, res) => {
    const { donationId, requestId } = req.body;

    try {
        const delivery = await Delivery.create({
            volunteerId: req.user.id,
            donationId,
            requestId,
            status: 'accepted'
        });

        res.status(201).json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all deliveries
// @route   GET /api/deliveries
// @access  Public
const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find()
            .populate('volunteerId', 'name email location')
            .populate('donationId')
            .populate('requestId');
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    assignDelivery,
    getDeliveries,
};
