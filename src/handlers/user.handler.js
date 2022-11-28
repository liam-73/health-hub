const moment = require('moment');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const { USER_TYPES } = require('../constants/user.properties');

// controllers
const userControllers = require('../controllers/user.controller');

const addUser = async (req, res, next) => {
  const schema = Joi.object({
    profile: Joi.any(),
    name: Joi.string(),
    email: Joi.string().email().required(),
    gender: Joi.string(),
    dateOfBirth: Joi.string(),
    address: Joi.string(),
    user_type: Joi.string()
      .valid(...USER_TYPES)
      .required(),
    diagnosis: Joi.string().when('user_type', {
      is: 'PATIENT',
      then: Joi.string().required(),
    }),
    degree: Joi.string().when('user_type', {
      is: 'DOCTOR || EMPLOYEE',
      then: Joi.string().required(),
    }),
    appointment_fee: Joi.number().when('user_type', {
      is: 'DOCTOR',
      then: Joi.number().required(),
    }),
    daily_token_numbers: Joi.number().when('user_type', {
      is: 'DOCTOR',
      then: Joi.number().required(),
    }),
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
    const user = await userControllers.addUser(value, req.file);

    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const getUsers = async (req, res, next) => {
  const schema = Joi.object({
    skip: Joi.number().integer().default(0),
    limit: Joi.number().integer().default(10),
    sort: Joi.any().default('-createdAt'),
    start_date: Joi.string(),
    end_date: Joi.string(),
    search: Joi.string(),
    user_type: Joi.string().valid(...USER_TYPES),
    is_all_employees: Joi.boolean().default(false),
    email: Joi.string().email(),
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
    const users = await userControllers.getUsers(value);

    res.json({ users, count: users.length });
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.objectid().required(),
  });

  const { value, error } = schema.validate(req.params);

  if (error) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });
  }

  try {
    const user = await userControllers.getUserById(value.id);

    res.json(user);
  } catch (e) {
    next(e);
  }
};

const getUsersByDate = async (req, res, next) => {
  const schema = Joi.object({
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    user_type: Joi.string().valid('PATIENT', 'EMPLOYEE').default('PATIENT'),
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
    const start_date = new Date(value.start_date);
    const end_date = new Date(value.end_date);
    const oneDay = 1000 * 60 * 60 * 24;

    const diffInTime = end_date.getTime() - start_date.getTime() + oneDay;

    const is7days = Math.round(diffInTime / oneDay) === 7;

    if (!is7days) throw new Error('You must only provide 7 days!');

    const data = await userControllers.getUsersByDate(
      start_date,
      end_date,
      value.user_type,
    );

    res.json(data);
  } catch (e) {
    next(e);
  }
};

const editUser = async (req, res, next) => {
  const schema = Joi.object({
    params: { id: Joi.objectid().required() },
    body: {
      profile: Joi.string(),
      name: Joi.string(),
      email: Joi.string().email(),
      gender: Joi.string(),
      dateOfBirth: Joi.string(),
      address: Joi.string(),
      degree: Joi.string(),
      appointment_fee: Joi.number(),
      daily_token_numbers: Joi.number(),
    },
  });

  const { value, error } = schema.validate(req);

  console.log(error);

  if (error) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });
  }

  try {
    const user = await userControllers.editUser({
      userId: value.params.id,
      userData: value.body,
      avatarData: req.file,
    });

    return res.json(user);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.objectid().required(),
  });

  const { value, error } = schema.validate(req.params);

  if (error) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });
  }

  try {
    await userControllers.deleteUser(value.id);

    res.status(200).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  getUsersByDate,
  editUser,
  deleteUser,
};
