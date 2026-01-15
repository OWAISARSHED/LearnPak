const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');
const Payout = require('../models/Payout');

// @desc    Get system stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments({});
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalCourses = await Course.countDocuments({});
    const pendingCourses = await Course.countDocuments({ isApproved: false });

    // Calculate total revenue (very basic simulation)
    // In real app, we'd query Payment collection
    const courses = await Course.find({});
    let totalRevenue = 0;
    // This is inaccurate without Enrollment count stored on Course or querying Enrollments
    // For MVP, just return static or aggregate counts

    res.json({
        totalUsers,
        totalInstructors,
        totalCourses,
        pendingCourses,
        totalRevenue: 0, // Placeholder
    });
});

// @desc    Get all instructors
// @route   GET /api/admin/instructors
// @access  Private/Admin
const getInstructors = asyncHandler(async (req, res) => {
    const instructors = await User.find({ role: 'instructor' }).select('-password');
    res.json(instructors);
});

// @desc    Verify instructor
// @route   PUT /api/admin/verify-instructor/:id
// @access  Private/Admin
const verifyInstructor = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.isVerified = true;
        await user.save();
        res.json({ message: 'Instructor verified successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { getStats, getInstructors, verifyInstructor, getAllUsers, deleteUser };
