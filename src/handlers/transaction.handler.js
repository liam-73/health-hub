const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

// controllers
const transactionControllers = require('../controllers/transaction.controller');

const getTransactions = async (req, res, next) => {
  const schema = Joi.object({
    start_date: Joi.string(),
    end_date: Joi.string(),
    doctor_id: Joi.objectid(),
  });

  const { value, error } = schema.validate(req.query);

  if (error) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });
  }

  try {
    const transactions = await transactionControllers.getTransactions(value);

    res.json(transactions);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getTransactions,
};
