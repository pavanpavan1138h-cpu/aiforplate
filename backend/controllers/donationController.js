const Donation = require('../models/Donation');

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private (Donor)
const createDonation = async (req, res) => {
    const { foodType, quantity, description, pickupLocation, pickupTime, expiryTime } = req.body;

    try {
        const donation = await Donation.create({
            donorId: req.user.id,
            foodType,
            quantity,
            description,
            pickupLocation,
            pickupTime,
            expiryTime,
        });

        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Public
const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate('donorId', 'name email location');
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a donation
// @route   PUT /api/donations/:id
// @access  Private (Donor/Admin)
const updateDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // Check for user ownership or admin role if needed
        // if (donation.donorId.toString() !== req.user.id) { ... }

        const updatedDonation = await Donation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDonation,
    getDonations,
    updateDonation,
};
