// controllers
const transactionControllers = require("../controllers/transaction");

const getTransactionsByDate = async (req, res) => {
    try {
        if(!req.query.start_date || !req.query.end_date) throw new Error("You must provide start date and end date!");

        const transacitions = await transactionControllers.getTransactionsByDate(req.query.start_date, req.query.end_date);

        res.json({ transacitions });
    } catch(e) {
        if( e.message === "You must provide start date and end date!" ) {
            return res.status(400).json({ message: e.message });
        }
        res.status(500).json({ message: e.message });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionControllers.getAllTransactions(req.hospital);

        res.json({ transactions });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
};

const getTransactionsOfDoctor = async (req, res) => {
    try {
        if( !req.query.doctor_id ) throw new Error("You must provide doctor id!");

        const transaction = await transactionControllers.getTransactionsOfDoctor( req.query.doctor_id );

        res.json(transaction);
    } catch(e) { 
        if( e.message === "You must provide doctor id!" ) {
            return res.status(400).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
}

module.exports = {
    getTransactionsByDate,
    getAllTransactions,
    getTransactionsOfDoctor,
};