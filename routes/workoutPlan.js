const express = require('express');
const app = express();
const isAuth = require('../middlewares/auth');
const workoutPlanControllers = require('../controllers/workoutPlanControllers');

app.post('/create', isAuth, workoutPlanControllers.createWorkoutPlan);
app.get('/', isAuth, workoutPlanControllers.getAllWorkoutPlans);
app.get('/:id', isAuth, workoutPlanControllers.getWorkoutPlanById);
app.put('/:id', isAuth, workoutPlanControllers.updateWorkoutPlan);
app.delete('/:id', isAuth, workoutPlanControllers.deleteWorkoutPlan);

module.exports = app;