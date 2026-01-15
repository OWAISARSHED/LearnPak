const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, uploadIdentity, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/verify-identity', protect, uploadIdentity);

module.exports = router;
