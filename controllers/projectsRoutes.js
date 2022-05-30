const router = require('express').Router();
// const withAuth = require('../utils/auth');
const { Manager } = require('../models');



//very last cacth-all endpoint
router.get('*', (req, res) => {
    res.render('home');
});

module.exports = router;