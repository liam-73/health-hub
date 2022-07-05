const R = require("ramda");
const mongoose = require("mongoose");

// schema
const Transaction = require("../models/transaction");

const getTransactionsByDate = async (start_date, end_date) => {
    try {
        const transactions = await Transaction.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(start_date),
                        $lte: new Date(end_date)
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt'
                        }
                    },
                    amount: 1
                }
            },
            {
                $group: {
                    _id: "$date",
                    total: { $sum: "$amount" }
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ]);

        const result = R.compose(
            R.mergeAll,
            R.map( ({ _id, total }) => ({ [_id]: total }) )
        );

        return result(transactions);
    } catch(e) {
        throw (e);
    }
};

const getAllTransactions = async (hospitalData) => {
    try {
        const transactions = await Transaction.aggregate([
            {
                $match: {
                    hospital: hospitalData._id
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt'
                        }
                    },
                    amount: 1
                }
            },
            {
                $group: {
                    _id: "$date",
                    total: { $sum: "$amount" }
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ]);

        const result = R.compose(
            R.mergeAll,
            R.map( ({ _id, total }) => ({ [_id]: total }) )
        );

        return result(transactions);
    } catch(e) {
        throw (e);
    }
};

const getTransactionsOfDoctor = async (doctor_id) => {
    try {
        const transactions = await Transaction.aggregate([
            {
                $match: {
                    doctor_id: mongoose.Types.ObjectId(doctor_id),
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt'
                        }
                    },
                    amount: 1
                }
            },
            {
                $group: {
                    _id: "$date",
                    total: { $sum: "$amount" }
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ]);
        
        console.log(transactions);

        const result = R.compose(
            R.mergeAll,
            R.map( ({ _id, total }) => ({ [_id]: total }) )
        );

        return result(transactions);
    } catch(e) {
        throw (e);
    }
}

module.exports = {
    getTransactionsByDate,
    getAllTransactions,
    getTransactionsOfDoctor,
};