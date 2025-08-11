const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    exercises: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
            sets: Number,
            reps: Number,
            weight: Number
        }
    ],
    scheduledAt: {
        type: Date,
        required: true
    },
    comments: String,
    status: {
        type: String,
        enums: ['Pending', 'Completed'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);