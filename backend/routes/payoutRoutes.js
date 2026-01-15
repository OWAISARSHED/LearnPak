const express = require('express');
const router = express.Router();
const { requestPayout, getMyPayouts, getPayouts, updatePayoutStatus } = require('../controllers/payoutController');
const { protect, instructor, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, instructor, requestPayout).get(protect, admin, getPayouts);
router.route('/my').get(protect, instructor, getMyPayouts);
router.route('/:id').put(protect, admin, updatePayoutStatus);

module.exports = router;
