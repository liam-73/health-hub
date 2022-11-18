// controllers
const Joi = require('joi');
const adminControllers = require('../controllers/admin.controller');

const addAdmin = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { value, error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });
  }

  try {
    const admin = await adminControllers.addAdmin({
      ...value,
      hospital: req.hospital,
    });

    res.status(201).json(admin);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { value, error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });
  }

  try {
    const admin = await adminControllers.login(value);

    res.json(admin);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addAdmin,
  login,
};
