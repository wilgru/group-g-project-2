const router = require('express').Router();

const api = require('./api');
const projectsRoutes = require('./projectsRoutes');

router.use('/', projectsRoutes);
router.use('/api', api);

module.exports = router;
