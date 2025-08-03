const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// need to add authentication middleware with roles 

router.get('/',  transactionController.getTransactions);
router.post('/',  transactionController.createTransaction);
router.put('/:id',  transactionController.updateTransaction);
router.delete('/:id',  transactionController.deleteTransaction);

module.exports = router;