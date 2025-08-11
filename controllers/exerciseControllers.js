const Exercise = require('../models/Exercise');

exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json({ message: "Error fetching exercises", error });
    }
}

exports.getExerciseById = async (req, res) => {
    const {id} = req.params;
    try {
        const exercise = await Exercise.findById(id);
        if (!exercise) {
            return res.status(404).json({message: "Exercise not found."});
        }
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ message: "Error fetching exercise.", error });
    }
}