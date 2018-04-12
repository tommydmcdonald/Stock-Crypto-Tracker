const router = require('express').Router();
const tickerRoutes = require('./tickerRoutes');
const chartRoutes = require('./chartRoutes');
const authRoutes = require('./authRoutes');
const newsRoutes = require('./newsRoutes');

router.use('/', newsRoutes);
router.use('/', tickerRoutes);
router.use('/', chartRoutes);
router.use('/', authRoutes);

module.exports = router;
