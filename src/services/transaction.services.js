const R = require('ramda');
const mongoose = require('mongoose');

// schema
const TransactionModel = require('../models/transaction.model');

const reshapeTranx = (tranxs) => {
  return R.compose(
    R.mergeAll,
    R.map(({ _id, total }) => ({ [_id]: total })),
  )(tranxs);
};

const getTransactions = async () => {
  try {
    const transactions = await TransactionModel.aggregate([
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
          amount: 1,
        },
      },
      {
        $group: {
          _id: '$date',
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    return reshapeTranx(transactions);
  } catch (e) {
    throw e;
  }
};

const getTransactionsByDate = async (start_date, end_date) => {
  try {
    const transactions = await TransactionModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date),
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
          amount: 1,
        },
      },
      {
        $group: {
          _id: '$date',
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    return reshapeTranx(transactions);
  } catch (e) {
    throw e;
  }
};

const getTransactionsByDoctorId = async (doctor_id) => {
  try {
    let transactions = await TransactionModel.aggregate([
      {
        $match: {
          doctor_id: mongoose.Types.ObjectId(doctor_id),
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
          amount: 1,
        },
      },
      {
        $group: {
          _id: '$date',
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    return reshapeTranx(transactions);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getTransactions,
  getTransactionsByDate,
  getTransactionsByDoctorId,
};
