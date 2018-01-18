const router = require('express').Router();
const tickerRoutes = require('./tickerRoutes');
const chartRoutes = require('./chartRoutes');
const authRoutes = require('./authRoutes');

router.use('/', tickerRoutes);
router.use('/', chartRoutes);
router.use('/', authRoutes);

module.exports = router;
