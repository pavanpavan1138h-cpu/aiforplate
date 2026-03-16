const express = require('express');
const router = express.Router();
const { createRequest, getRequests } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createRequest)
    .get(getRequests);

module.exports = router;
