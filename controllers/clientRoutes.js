const router = require('express').Router();
// const withAuth = require('../utils/auth');
const {} = require('../models');

router.get('/list', (req, res) => {
    res.render('clientList');
});

router.get('/add', (req, res) => {
    res.render('clientAdd');
});

router.get('/view/projects', (req, res) => {
    res.render('home');
});

router.get('/view', (req, res) => {
    res.render('clientView');
});

module.exports = router;