// controllers
const appointmentController = require("../controllers/appointment");

const makeAppointment = async (req, res, next) => {
    try {
        const requested_fields = Object.keys(req.body);

        const valid_fields = ['doctor', 'patient', 'date' ];

        const valid_operation = requested_fields.every( field => valid_fields.includes(field) );

        if(!valid_operation) throw new Error("Invalid Input");

        const appointment = await appointmentController.makeAppointment( req.body, req.hospital );

        res.status(201).json(appointment);
    } catch(e) {
        next(e);
    }
};

const getAppointmentsByDoctorId = async (req, res, next) => {
    try {
        if(!req.params.id) throw new Error("you must provide doctor id!");

        const appointments = await appointmentController.getAppointmentsByDoctorId( req.params.id );

        res.json({ appointments, count: appointments.length });
    } catch(e) {
        next(e);
    }
};

const getAppointmentsByDate = async (req, res, next) => {
    try {
        const appointments = await appointmentController.getAppointmentsByDate( req.query.start_date, req.query.end_date );

        res.json({ appointments, count: appointments.length });
    } catch(e) {   
        next(e);
    }
};

const editAppointment = async (req, res, next) => {
    try {
        if(!req.params.id) throw new Error("You must provide appointment id!");

        const requested_fields = Object.keys(req.body);

        const valid_fields = ['patient', 'doctor', 'fee', 'date' ];

        const valid_operation = requested_fields.every( field => valid_fields.includes(field) );

        if(!valid_operation) throw new Error("Invalid Input");

        const appointment = await appointmentController.editAppointment(req.body, req.params.id);

        res.json(appointment);
    } catch(e) {
        next(e);
    }
};

const deleteAppointment = async (req, res, next) => {
    try {
        if(!req.params.id) throw new Error("You must provide appointment id!");

        const deletedAppointment = await appointmentController.deleteAppointment( req.params.id );

        res.json(deletedAppointment);
    } catch(e) {
        next(e);
    }
};

const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await appointmentController.getAllAppointments(req.hospital, req.query.limit);

        res.json({ appointments, count: appointments.length });
    } catch(e) {
        next(e);
    }
};

const getTodayTotalAppointmentsCount = async (req, res, next) => {
    try {
        const data = await appointmentController.getTodayTotalAppointmentsCount();

        res.json(data);
    } catch(e) {
        next(e);
    }
};

module.exports = {
    makeAppointment,
    getAppointmentsByDoctorId,
    getAppointmentsByDate,
    editAppointment,
    deleteAppointment,
    getAllAppointments,
    getTodayTotalAppointmentsCount,
};