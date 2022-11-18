// services
const transactionServices = require('../services/transaction.services');

const getTransactions = async ({ start_date, end_date, doctor_id }) => {
  if (start_date && end_date) {
    return await transactionServices.getTransactionsByDate(
      start_date,
      end_date,
    );
  } else if (doctor_id) {
    return await transactionServices.getTransactionsOfDoctor(doctor_id);
  }

  return await transactionServices.getAllTransactions(query);
};

module.exports = {
  getTransactions,
};
