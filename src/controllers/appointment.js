// services
const appointmentServices = require("../services/appointment");

const makeAppointment = async ( request_body, hospital ) => {
    const appointment = await appointmentServices.makeAppointment( request_body, hospital );

    return appointment;
};

const getAppointmentsByDoctorId = async ( doctorId ) => {
    const appointments = await appointmentServices.getAppointmentsByDoctorId( doctorId );

    return appointments;
};

const getAppointmentsByDate = async (start_date , end_date) => {
    const appointments = await appointmentServices.getAppointmentsByDate( start_date, end_date );

    return appointments;
};

const editAppointment = async (request_body, appointment_id) => {
    const appointment = await appointmentServices.editAppointment(request_body, appointment_id);

    return appointment;
};

const deleteAppointment = async (appointment_id) => {
    const deletedAppointment = await appointmentServices.deleteAppointment( appointment_id );

    return deletedAppointment;
};

const getAllAppointments = async (hospital, limit) => {
    const appointments = await appointmentServices.getAllAppointments( hospital, limit );

    return appointments;
};

module.exports = {
    makeAppointment,
    getAppointmentsByDoctorId,
    getAppointmentsByDate,
    editAppointment,
    deleteAppointment,
    getAllAppointments
};