const express = require('express');
const router = express.Router();
const { enrollCourse, getMyEnrollments, updateProgress, logEmotion } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, enrollCourse).get(protect, getMyEnrollments);
router.route('/:id/progress').put(protect, updateProgress);
router.route('/emotion').post(protect, logEmotion);

module.exports = router;
