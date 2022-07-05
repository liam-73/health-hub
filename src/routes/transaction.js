const express = require("express");

const router = new express.Router();

// authentication
const auth = require("../authentication/auth");

// handlers
const transactionHandlers = require("../handlers/transaction");

router.get("/transactions", auth, transactionHandlers.getTransactionsByDate );

router.get("/all_transactions", auth, transactionHandlers.getAllTransactions );

router.get("/doctor_transactions", auth, transactionHandlers.getTransactionsOfDoctor );

module.exports = router;