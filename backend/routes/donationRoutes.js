const express = require('express');
const router = express.Router();
const { createDonation, getDonations, updateDonation } = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createDonation)
    .get(getDonations);

router.route('/:id')
    .put(protect, updateDonation);

module.exports = router;
