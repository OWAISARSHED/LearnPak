const express = require('express');
const router = express.Router();
const { getStats, getInstructors, verifyInstructor, getAllUsers, deleteUser } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getStats);
router.get('/instructors', protect, admin, getInstructors);
router.put('/verify-instructor/:id', protect, admin, verifyInstructor);
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
