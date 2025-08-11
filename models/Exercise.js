const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: ['cardio', 'strength', 'flexibility'],
    },
    muscleGroup: {
        type: String
    }
})

module.exports = mongoose.model('Exercise', exerciseSchema);