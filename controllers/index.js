const express = require('express');

// Import our modular routers for /tips and /feedback
const api = require('./api');
const projectRoutes = require('./projectPageRoutes');
const clientRoutes = require('./clientPageRoutes');
const homeRoutes = require('./homePageRoutes');

const app = express();

app.use('/api', api);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);

app.use('/', homeRoutes);

module.exports = app;
