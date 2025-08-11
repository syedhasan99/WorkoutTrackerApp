const express = require('express');
const app = express();
const exerciseControllers = require('../controllers/exerciseControllers');

app.get('/all', exerciseControllers.getAllExercises);
app.get('/:id', exerciseControllers.getExerciseById);

module.exports = app;