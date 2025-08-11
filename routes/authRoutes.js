const express = require('express');
const app = express();
const authControllers = require('../controllers/authControllers');

app.post('/register', authControllers.register);
app.post('/login', authControllers.login);
app.get('/logout', authControllers.logout);

module.exports = app;