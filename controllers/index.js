const express = require('express');
// const withAuth = require('../utils/auth');

// Import our modular routers for /tips and /feedback
const api = require('./api');
const projectRoutes = require('./projectsRoutes');
const clientRoutes = require('./clientRoutes');

const app = express();

app.use('/api', api);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);

//very last cacth-all endpoint
router.get('*', (req, res) => {
    res.render('home');
});

module.exports = app;