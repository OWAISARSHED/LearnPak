const mongoose = require('mongoose');

const payoutSchema = mongoose.Schema({
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const Payout = mongoose.model('Payout', payoutSchema);
module.exports = Payout;
