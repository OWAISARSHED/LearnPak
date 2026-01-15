const mongoose = require('mongoose');

const emotionLogSchema = mongoose.Schema({
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
    lessonId: {
        type: String, // Optional, if tied to specific lesson
    },
    emotion: {
        type: String,
        required: true,
        enum: ['happy', 'neutral', 'confused', 'bored', 'sleepy'], // standardized emotions
    },
    note: {
        type: String, // Optional user note
    },
}, {
    timestamps: true,
});

const EmotionLog = mongoose.model('EmotionLog', emotionLogSchema);
module.exports = EmotionLog;
