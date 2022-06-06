const express = require('express');
// const withAuth = require('../utils/auth');

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
// very last cacth-all endpoint
// app.get("*", (req, res) => {
// 	res.render("home");
// });

module.exports = app;
