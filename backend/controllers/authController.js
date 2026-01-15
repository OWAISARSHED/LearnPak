const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Default approval for students, pending for others/instructors if needed. 
    // Requirement says: "Approve instructors". So if role is instructor, isApproved = false (default).

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'student',
        isApproved: role === 'instructor' ? false : true,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
            isVerified: user.isVerified,
            identityDoc: user.identityDoc,
            earnings: user.earnings, // Return earnings
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
            isVerified: user.isVerified,
            identityDoc: user.identityDoc, // Return doc status
            earnings: user.earnings, // Return earnings
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Upload Identity Document
// @route   POST /api/auth/verify-identity
// @access  Private
const uploadIdentity = asyncHandler(async (req, res) => {
    console.log('uploadIdentity called');
    const { identityDoc } = req.body;
    console.log('Doc URL:', identityDoc);
    const user = await User.findById(req.user._id);

    if (user) {
        user.identityDoc = identityDoc;
        const updatedUser = await user.save();
        console.log('User identity updated:', updatedUser.identityDoc);
        res.json({ message: 'Identity document uploaded successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        user.avatar = req.body.avatar || user.avatar;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            isApproved: updatedUser.isApproved,
            isVerified: updatedUser.isVerified,
            identityDoc: updatedUser.identityDoc, // Return doc status
            earnings: updatedUser.earnings, // Return earnings
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { registerUser, loginUser, getUserProfile, uploadIdentity, updateUserProfile };
