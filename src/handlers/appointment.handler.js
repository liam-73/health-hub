const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

// controllers
const appointmentController = require('../controllers/appointment.controller');

const createAppointment = async (req, res, next) => {
  const schema = Joi.object({
    doctor: Joi.objectid().required(),
    patient: Joi.objectid().required(),
    date: Joi.date(),
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
    const appointment = await appointmentController.createAppointment({
      ...value,
      hospital: req.hospital,
    });

    res.status(201).json(appointment);
  } catch (e) {
    next(e);
  }
};

const getAppointments = async (req, res, next) => {
  const schema = Joi.object({
    skip: Joi.number().default(0),
    limit: Joi.number().default(10),
    sort: Joi.any().default('-createdAt'),
    start_date: Joi.date(),
    end_date: Joi.date(),
    doctor_id: Joi.objectid(),
    is_today_appts: Joi.boolean().default(false),
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
    const appointments = await appointmentController.getAppointments({
      ...value,
      hospital: req.hospital,
    });

    res.json({ appointments, count: appointments.length });
  } catch (e) {
    next(e);
  }
};

const getAppointmentById = async (req, res, next) => {
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
    const appointment = await appointmentController.getAppointmentsById(value);

    res.json(appointment);
  } catch (e) {
    next(e);
  }
};

const editAppointment = async (req, res, next) => {
  const schema = Joi.object({
    params: Joi.object({ id: Joi.objectid().required() }),
    body: Joi.object({
      patient: Joi.objectid(),
      doctor: Joi.objectid(),
      fee: Joi.number(),
      date: Joi.string(),
    }),
  });

  const { value, error } = schema.validate(req);

  if (error) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });
  }

  try {
    const appointment = await appointmentController.editAppointment({
      appointmentId: value.params.id,
      appointmentData: value.body,
    });

    res.json(appointment);
  } catch (e) {
    next(e);
  }
};

const deleteAppointment = async (req, res, next) => {
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
    const deletedAppointment = await appointmentController.deleteAppointment(
      value.id,
    );

    res.json(deletedAppointment);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  editAppointment,
  deleteAppointment,
};
