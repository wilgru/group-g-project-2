const router = require('express').Router();
const clientRoutes = require('./clientRoutes');
const managerRoutes = require('./managerRoutes');

router.use('/clientRoute', clientRoutes);
router.use('/managerRoutes', managerRoutes);

module.exports = router;