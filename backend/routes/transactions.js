const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authMiddleware, authorize } = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', authorize(['ADMIN', 'USER', 'READ_ONLY']), transactionController.getTransactions);
router.post('/', authorize(['ADMIN', 'USER', ]), transactionController.createTransaction);
router.patch('/:id', authorize(['ADMIN', 'USER']), transactionController.updateTransaction);
router.delete('/:id', authorize(['ADMIN', 'USER',]), transactionController.deleteTransaction);

module.exports = router;