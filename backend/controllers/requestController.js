const Request = require('../models/Request');

// @desc    Create a new food request
// @route   POST /api/requests
// @access  Private (Receiver)
const createRequest = async (req, res) => {
    const { foodTypeRequired, quantityNeeded, location, urgency } = req.body;

    try {
        const request = await Request.create({
            receiverId: req.user.id,
            foodTypeRequired,
            quantityNeeded,
            location,
            urgency,
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all requests
// @route   GET /api/requests
// @access  Public
const getRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('receiverId', 'name email location');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRequest,
    getRequests,
};
