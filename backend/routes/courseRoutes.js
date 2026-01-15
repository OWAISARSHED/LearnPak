const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    updateCourseStatus,
    getInstructorStats,
} = require('../controllers/courseController');
const { protect, instructor, admin, optionalProtect } = require('../middleware/authMiddleware');

router.get('/instructor/stats', protect, instructor, getInstructorStats);
router.route('/').get(optionalProtect, getCourses).post(protect, instructor, createCourse);
router.route('/:id').get(getCourseById).put(protect, instructor, updateCourse);
router.route('/:id/status').put(protect, admin, updateCourseStatus);

module.exports = router;
