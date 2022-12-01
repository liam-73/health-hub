const express = require('express');

const router = new express.Router();

// authentication
const auth = require('../authentication/auth');

// handlers
const transactionHandlers = require('../handlers/transaction.handler');

router.use(auth);

router.get('/', transactionHandlers.getTransactions);

module.exports = router;
