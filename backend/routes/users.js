const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, authorize } = require('../middlewares/auth');

router.use(authMiddleware);
router.get('/',  authorize(['ADMIN']), userController.getUsers);

module.exports = router;