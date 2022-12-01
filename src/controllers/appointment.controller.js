// services
const appointmentServices = require('../services/appointment.services');

const createAppointment = async (data) => {
  return await appointmentServices.createAppointment(data);
};

const getAppointments = async (query) => {
  return await appointmentServices.getAppointments(query);
};

const getAppointmentById = async (appointmentId) => {
  return await appointmentServices.getAppointmentById(appointmentId);
};

const editAppointment = async (data) => {
  return await appointmentServices.editAppointment(data);
};

const deleteAppointment = async (appointmentId) => {
  return await appointmentServices.deleteAppointment(appointmentId);
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  editAppointment,
  deleteAppointment,
};
