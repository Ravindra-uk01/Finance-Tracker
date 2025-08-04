const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authMiddleware, authorize } = require('../middlewares/auth');

router.use(authMiddleware);
router.get('/', authorize(['ADMIN', 'USER', 'READONLY']), analyticsController.getAnalytics);

module.exports = router;