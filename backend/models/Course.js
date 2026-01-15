const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true }, // Can be local path or URL
    audioUrl: { type: String },
    pdfUrl: { type: String },
    notesUrl: { type: String },
    duration: { type: Number }, // in minutes
    isFree: { type: Boolean, default: false }, // Preview available
    chapter: { type: String, default: 'General' }, // Grouping identifier
});

const courseSchema = mongoose.Schema({
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        default: 'Urdu', // Default to Urdu for LearnPak
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    lessons: [lessonSchema],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    quizzes: [{
        title: String,
        fileUrl: String, // URL to uploaded quiz file
        questions: [{
            question: String,
            options: [String],
            correctAnswer: Number // Index
        }]
    }],
    assignments: [{
        title: String,
        description: String,
        fileUrl: String, // URL to uploaded assignment file
        dueDate: Date
    }],
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
