const WorkoutPlan = require("../models/WorkoutPlan");

exports.createWorkoutPlan = async (req, res) => {
  const { name, exercises, scheduledAt } = req.body;
  const userId = req.user._id; // Assuming user is authenticated and user ID is available in req.user

  try {
    const workoutPlan = await WorkoutPlan.create({
      userId,
      name,
      exercises: exercises.map((exercise) => ({
        _id: exercise._id,
        sets: exercise.sets || 3,
        reps: exercise.reps || 10,
        weight: exercise.weight || 0,
      })),
      scheduledAt,
      comments: req.body.comments || "",
      status: "Pending",
    });
    res
      .status(201)
      .json({ message: "Workout plan created successfully.", workoutPlan });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating workout plan.", error: error.message });
  }
};

exports.getAllWorkoutPlans = async (req, res) => {
  const userId = req.user._id;

  try {
    const workoutPlans = await WorkoutPlan.find({ userId }).sort({ scheduledAt: -1 });
    res.status(200).json(workoutPlans);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching workout plans.", error: error.message });
  }
};

exports.getWorkoutPlanById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const workoutPlan = await WorkoutPlan.findOne({ _id: id, userId })
    if (!workoutPlan) {
      return res.status(404).json({ message: "Plan not found." });
    }
    res.status(200).json(workoutPlan);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching workout plan.", error: error.message });
  }
};

exports.updateWorkoutPlan = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { name, exercises, scheduledAt, status } = req.body;

  try {
    const workoutPlan = await WorkoutPlan.findOneAndUpdate(
      { _id: id, userId },
      {
        name,
        exercises: exercises.map((exercise) => ({
          _id: exercise._id,
          sets: exercise.sets || 3,
          reps: exercise.reps || 10,
          weight: exercise.weight || 0,
        })),
        scheduledAt,
        comments: req.body.comments || "",
        status,
      },
      { new: true, runValidators: true }
    );
    if (!workoutPlan) {
      return res.status(404).json({ message: "Workout plan not found." });
    }
    res
      .status(200)
      .json({ message: "Workout Plan updated successfully.", workoutPlan });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating workout plan.", error: error.message });
  }
};

exports.deleteWorkoutPlan = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const workoutPlan = await WorkoutPlan.findOneAndDelete({ _id: id, userId });
    if (!workoutPlan) {
      return res.status(404).json({ message: "Workout plan not found." });
    }
    res.status(200).json({ message: "Workout plan deleted successfully." });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting workout plan.", error: error.message });
  }
};
