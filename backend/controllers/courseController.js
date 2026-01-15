const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    // Filter by language if provided
    const language = req.query.language ? { language: req.query.language } : {};

    // Filter by instructor if provided
    const instructor = req.query.instructor ? { instructor: req.query.instructor } : {};

    // Filter by status
    let statusFilter = { status: 'approved' }; // Default public view

    // If Admin or Instructor requests specific status or 'all'
    if (req.user && (req.user.role === 'admin' || req.user.role === 'instructor')) {
        if (req.query.status === 'all') {
            statusFilter = {};
        } else if (req.query.status) {
            statusFilter = { status: req.query.status };
        } else if (req.query.instructor && req.query.instructor === req.user._id.toString()) {
            // If instructor is viewing their own courses, show all by default
            statusFilter = {};
        }
    }

    const courses = await Course.find({ ...keyword, ...language, ...statusFilter, ...instructor }).populate('instructor', 'name');
    res.json(courses);
});

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email bio avatar');

    if (course) {
        res.json(course);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = asyncHandler(async (req, res) => {
    const { title, description, language, category, price, thumbnail, lessons, quizzes, assignments } = req.body;

    const course = new Course({
        instructor: req.user._id,
        title,
        description,
        language,
        category,
        price,
        thumbnail,
        lessons,
        quizzes,
        assignments,
        status: 'pending',
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Instructor
const updateCourse = asyncHandler(async (req, res) => {
    const { title, description, language, category, price, thumbnail, lessons } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
        if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to update this course');
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.language = language || course.language;
        course.category = category || course.category;
        course.price = price || course.price;
        course.thumbnail = thumbnail || course.thumbnail;
        if (lessons) course.lessons = lessons;

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Approve or Reject a course
// @route   PUT /api/courses/:id/status
// @access  Private/Admin
const updateCourseStatus = asyncHandler(async (req, res) => {
    const { status } = req.body; // 'approved' or 'rejected'
    const course = await Course.findById(req.params.id);

    if (course) {
        course.status = status;
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Get instructor dashboard stats
// @route   GET /api/courses/instructor/stats
// @access  Private/Instructor
const getInstructorStats = asyncHandler(async (req, res) => {
    const courses = await Course.find({ instructor: req.user._id });
    const courseIds = courses.map(c => c._id);

    // Dynamic Student Count
    // Requires Enrollment model
    const Enrollment = require('../models/Enrollment');
    const totalStudents = await Enrollment.countDocuments({ course: { $in: courseIds } });

    // Mock Watch Time (In a real app, this would be summed from progress logs)
    // For new instructors, this will be 0.
    const totalWatchTime = 0;

    // Completion Rate
    // Assuming progress is tracked 0-100 in Enrollment
    const completedEnrollments = await Enrollment.countDocuments({
        course: { $in: courseIds },
        progress: 100
    });

    const completionRate = totalStudents > 0 ? Math.round((completedEnrollments / totalStudents) * 100) : 0;

    res.json({
        totalStudents,
        totalWatchTime,
        completionRate
    });
});

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    updateCourseStatus,
    getInstructorStats,
};
