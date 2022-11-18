const moment = require('moment');

// schemas
const AppointmentModel = require('../models/appointment');
const Transacition = require('../models/transaction');
const UserModel = require('../models/user');

const createAppointment = async ({ doctor, patient, date, hospital }) => {
  try {
    const doctorData = await UserModel.findById(doctor);

    if (!doctorData || doctorData.user_type !== 'DOCTOR')
      throw new Error('Doctor not found!');

    const appointments = await AppointmentModel.aggregate([
      {
        $match: {
          date: moment().format('MM-DD-YYYY'),
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
        date: date ? date : moment().format('MM-DD-YYYY'),
        hospital: hospital._id,
      });

      await Transacition.create({
        doctor_id: doctor,
        patient_id: patient,
        amount: doctorData.appointment_fee,
        hospital: hospital._id,
      });

      return appointment;
    }
  } catch (e) {
    throw e;
  }
};

const getAppointments = async (query) => {
  const {
    skip,
    limit,
    sort,
    start_date,
    end_date,
    doctor_id,
    is_today_appts,
    hospital,
  } = query;

  let filter = {};

  if (start_date && end_date) {
    filter.date = {
      $gte: new Date(start_date),
      $lte: new Date(end_date),
    };
    filter.hospital = hospital._id;
  }

  if (is_today_appts) {
    filter.date = moment().format('MM-DD-YYYY');
    filter.hospital = hospital._id;
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

    if (!appointment) throw new Error('Doctor not found!');

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

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  editAppointment,
  deleteAppointment,
};
