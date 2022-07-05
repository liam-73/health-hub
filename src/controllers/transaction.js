// services
const transactionServices = require("../services/transaction");

const getTransactionsByDate = async (start_date, end_date) => {
    const transactions = await transactionServices.getTransactionsByDate(start_date, end_date);

    return transactions;
};

const getAllTransactions = async (hospital) => {
    const transactions = await transactionServices.getAllTransactions(hospital);

    return transactions;
};

const getTransactionsOfDoctor = async (doctor_id) => {
    const transaction = await transactionServices.getTransactionsOfDoctor( doctor_id );

    return transaction;
};

module.exports = {
    getTransactionsByDate,
    getAllTransactions,
    getTransactionsOfDoctor,
}