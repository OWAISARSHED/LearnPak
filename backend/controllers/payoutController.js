const asyncHandler = require('express-async-handler');
const Payout = require('../models/Payout');
const User = require('../models/User');

// @desc    Request a payout
// @route   POST /api/payouts
// @access  Private/Instructor
const requestPayout = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    // Check if user has enough withdrawable earnings (mock logic)
    // For MVP, just allow request

    const payout = await Payout.create({
        instructor: req.user._id,
        amount,
    });

    res.status(201).json(payout);
});

// @desc    Get my payouts
// @route   GET /api/payouts/my
// @access  Private/Instructor
const getMyPayouts = asyncHandler(async (req, res) => {
    const payouts = await Payout.find({ instructor: req.user._id });
    res.json(payouts);
});

// @desc    Get all payouts
// @route   GET /api/payouts
// @access  Private/Admin
const getPayouts = asyncHandler(async (req, res) => {
    const payouts = await Payout.find({}).populate('instructor', 'name email');
    res.json(payouts);
});

// @desc    Update payout status
// @route   PUT /api/payouts/:id
// @access  Private/Admin
const updatePayoutStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const payout = await Payout.findById(req.params.id);

    if (payout) {
        payout.status = status;
        await payout.save();
        res.json(payout);
    } else {
        res.status(404);
        throw new Error('Payout not found');
    }
});

module.exports = { requestPayout, getMyPayouts, getPayouts, updatePayoutStatus };
