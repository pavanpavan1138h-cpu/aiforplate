const express = require('express');
const router = express.Router();
const { assignDelivery, getDeliveries } = require('../controllers/deliveryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, assignDelivery)
    .get(getDeliveries);

module.exports = router;
