const asyncHandler = require('express-async-handler');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const EmotionLog = require('../models/EmotionLog');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private/Student
const enrollCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    const alreadyEnrolled = await Enrollment.findOne({
        student: req.user._id,
        course: courseId,
    });

    if (alreadyEnrolled) {
        res.status(400);
        throw new Error('Already enrolled');
    }

    // Check active enrollment count
    const activeEnrollments = await Enrollment.countDocuments({
        student: req.user._id,
        isCompleted: false
    });

    if (activeEnrollments >= 3) {
        res.status(400);
        throw new Error('You can only enroll in up to 3 active courses at a time.');
    }

    // Payment check logic would go here
    // For MVP, assume free or auto-paid if premium

    const enrollment = await Enrollment.create({
        student: req.user._id,
        course: courseId,
    });

    res.status(201).json(enrollment);
});

// @desc    Get my enrollments
// @route   GET /api/enrollments
// @access  Private/Student
const getMyEnrollments = asyncHandler(async (req, res) => {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate('course');
    res.json(enrollments);
});

// @desc    Update progress (mark lesson complete)
// @route   PUT /api/enrollments/:id/progress
// @access  Private/Student
const updateProgress = asyncHandler(async (req, res) => {
    const { lessonId } = req.body;
    const enrollment = await Enrollment.findById(req.params.id);

    if (enrollment) {
        if (enrollment.student.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }

        if (!enrollment.completedLessons.includes(lessonId)) {
            enrollment.completedLessons.push(lessonId);

            // Calculate progress (simple logic: need total lessons count from course)
            // Ideally we fetch course to get total lessons
            const course = await Course.findById(enrollment.course);
            if (course && course.lessons.length > 0) {
                enrollment.progress = (enrollment.completedLessons.length / course.lessons.length) * 100;
                if (enrollment.progress >= 100) enrollment.isCompleted = true;
            }

            await enrollment.save();
        }

        res.json(enrollment);
    } else {
        res.status(404);
        throw new Error('Enrollment not found');
    }
});

// @desc    Log emotion
// @route   POST /api/enrollments/emotion
// @access  Private/Student
const logEmotion = asyncHandler(async (req, res) => {
    const { courseId, lessonId, emotion, note } = req.body;

    const log = await EmotionLog.create({
        student: req.user._id,
        course: courseId,
        lessonId,
        emotion,
        note
    });

    res.status(201).json(log);
});

module.exports = {
    enrollCourse,
    getMyEnrollments,
    updateProgress,
    logEmotion
};
