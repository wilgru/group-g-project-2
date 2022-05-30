const express = require('express');

// Import our modular routers for /tips and /feedback
const api = require('./api');
const projectRoutes = require('./projectsRoutes');

const app = express();

app.use('/api', api);
// make sure this is last
app.use('/', projectRoutes);

module.exports = app;