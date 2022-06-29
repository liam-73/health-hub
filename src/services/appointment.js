const moment = require('moment');

// schemas
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Appointment = require("../models/appointment");

const makeAppointment = async ( request_body, hospital ) => {
    try {
        const doctor = await Doctor.findById(request_body.doctor_id);

        if(!doctor) throw new Error("Doctor not found!");

        const appointments = await Appointment.aggregate([
            {
                $match: {
                    date: moment().format("MM-DD-YYYY"),
                    doctor_id: doctor._id
                },
            }
        ]);

        if(appointments.length >= doctor.daily_token_numbers ) {
            throw new Error("Out of tokens, try again later!");
        }

        const patient = await Patient.findById(request_body.patient_id);

        if(!patient) throw new Error("Patient not found!");

        const appointment = await new Appointment({
            doctor_id: doctor._id,
            patient_id: patient._id,
            fee: doctor.appointment_fee,
            date: moment().format("MM-DD-YYYY"),
            hospital: hospital._id
        });

        await appointment.save();

        return appointment;
    } catch(e) {
        throw (e);
    }
};

const getAppointmentsByDoctorId = async (doctorId) => {
    try {
        const doctor = await Doctor
            .findById(doctorId)
            .populate({ 
                path: 'appointments',
                options: { sort: { createdAt: -1 } }
            });

        if(!doctor) throw new Error("Doctor not found!");

        return doctor.appointments
    } catch(e) {
        throw (e);
    }
};

const getAppointmentsByDate = async (start_date, end_date) => {
    try {
        const appointments = await Appointment.aggregate([
            {
                $match: {
                    date: {
                        $gte: start_date,
                        $lte: end_date
                    }
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        return appointments;
    } catch(e) {
        throw (e);
    }
};

const editAppointment = async (request_body, appointment_id) => {
    try {
        const edits = Object.keys(request_body);

        const appointment = await Appointment.findById(appointment_id);

        if(!appointment) throw new Error("Appointment not found!");

        edits.forEach( edit => appointment[edit] = request_body[edit] );

        await appointment.save();

        return appointment;
    } catch(e) {
        throw (e);
    }
};

const deleteAppointment = async (appointment_id) => {
    try {
        const appointment = await Appointment.findById(appointment_id);

        if(!appointment) throw new Error("Appointment not found!");

        await appointment.remove();

        return appointment;
    } catch(e) {
        throw (e);
    }
};

const getAllAppointments = async (hospitalData) => {
    try {
        const hospital = await hospitalData.populate({
            path: 'appointments',
            options: { sort: { createdAt: -1 } }
        });

        return hospital.appointments;
    } catch(e) {
        throw (e);
    }
}

module.exports = {
    makeAppointment,
    getAppointmentsByDoctorId,
    getAppointmentsByDate,
    editAppointment,
    deleteAppointment,
    getAllAppointments,
};