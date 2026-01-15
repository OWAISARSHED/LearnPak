const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
    },
    completedLessons: [{
        type: String, // Lesson IDs
    }],
    isCompleted: {
        type: Boolean,
        default: false,
    },
    progress: {
        type: Number, // Percentage 0-100
        default: 0,
    },
}, {
    timestamps: true,
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;
