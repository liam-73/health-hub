const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },

    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },

    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
