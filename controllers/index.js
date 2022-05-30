const express = require('express');

// Import our modular routers for /tips and /feedback
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

const app = express();

app.use('/api', apiRoutes);
// make sure this is last
app.use('/', homeRoutes);

module.exports = app;