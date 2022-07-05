const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },

        patient_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        },

        amount: {
            type: Number
        },

        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital'
        }
    },
    {
        timestamps: true
    }
);

const Transaction = mongoose.model( 'Transaction', transactionSchema );

module.exports = Transaction;