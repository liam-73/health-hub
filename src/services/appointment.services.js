const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;

// schemas
const AppointmentModel = require('../models/appointment.model');
const TransactionModel = require('../models/transaction.model');
const UserModel = require('../models/user.model');

const createAppointment = async ({ doctor, patient, date, reason }) => {
  try {
    const doctorData = await UserModel.findById(doctor);

    if (!doctorData || doctorData.user_type !== 'DOCTOR')
      throw new Error('Doctor not found!');

    const appointments = await AppointmentModel.aggregate([
      {
        $match: {
          date: moment(date).utc().toISOString(),
          doctor,
        },
      },
    ]);

    if (appointments.length >= doctorData.daily_token_numbers) {
      throw new Error('Out of tokens, try again later!');
    } else {
      const patientData = await UserModel.findById(patient);

      if (!patientData || patientData.user_type !== 'PATIENT')
        throw new Error('Patient not found!');

      const appointment = await AppointmentModel.create({
        doctor,
        patient,
        fee: doctorData.appointment_fee,
        date: moment(date).utc().toISOString(),
        reason,
      });

      await TransactionModel.create({
        doctor_id: doctor,
        patient_id: patient,
        amount: doctorData.appointment_fee,
      });

      return appointment;
    }
  } catch (e) {
    throw e;
  }
};

const getAppointments = async (query) => {
  let { skip, limit, sort, start_date, end_date, doctor_id, is_today_appts } =
    query;

  let filter = {};

  if (start_date && end_date) {
    filter.date = {
      $gte: moment(start_date).utc().toISOString(),
      $lte: moment(end_date).utc().toISOString(),
    };
  }

  if (is_today_appts) {
    filter.date = moment().utc().toISOString();
    limit = 0;
  }

  if (doctor_id) {
    filter._id = doctor_id;
  }

  try {
    const appointments = await AppointmentModel.find(filter)
      .populate('doctor')
      .populate('patient')
      .limit(+limit)
      .skip(+skip)
      .sort(sort);

    return appointments;
  } catch (e) {
    throw e;
  }
};

const getAppointmentById = async (appointmentId) => {
  try {
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) throw new Error('Appointment not found!');

    return appointment;
  } catch (e) {
    throw e;
  }
};

const editAppointment = async ({ appointmentId, appointmentData }) => {
  try {
    const edits = Object.keys(appointmentData);

    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) throw new Error('Appointment not found!');

    edits.forEach((edit) => (appointment[edit] = appointmentData[edit]));

    return await appointment.save();
  } catch (e) {
    throw e;
  }
};

const deleteAppointment = async (appointmentId) => {
  try {
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) throw new Error('Appointment not found!');

    await appointment.remove();

    return appointment;
  } catch (e) {
    throw e;
  }
};

const getAppointmentsByUserId = async (user_id) => {
  try {
    const user = await UserModel.findById(user_id);

    if (!user) throw new Error('User not found!');

    const appointments = await AppointmentModel.find({
      $or: [{ patient: ObjectId(user_id) }, { doctor: ObjectId(user_id) }],
    })
      .populate('doctor')
      .populate('patient');

    return { appointments, count: appointments.length };
  } catch (e) {}
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  editAppointment,
  deleteAppointment,
  getAppointmentsByUserId,
};
