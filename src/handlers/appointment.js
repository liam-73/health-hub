// controllers
const appointmentController = require("../controllers/appointment");

const makeAppointment = async (req, res) => {
    try {
        const requested_fields = Object.keys(req.body);

        const valid_fields = ['doctor_id', 'patient_id', 'date' ];

        const valid_operation = requested_fields.every( field => valid_fields.includes(field) );

        if(!valid_operation) throw new Error("Invalid Input");

        const appointment = await appointmentController.makeAppointment( req.body, req.hospital );

        res.status(201).json(appointment);
    } catch(e) {
        if( e.message === "Invalid Input" || e.message === "Out of tokens, try again later!" ) {
            return res.status(400).json({ message: e.message });
        }

        else if( e.message === "Doctor not found!" || e.message === "Patient not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const getAppointmentsByDoctorId = async (req, res) => {
    try {
        if(!req.params.id) throw new Error("you must provide doctor id!");

        const appointments = await appointmentController.getAppointmentsByDoctorId( req.params.id );

        res.json({ appointments, count: appointments.length });
    } catch(e) {
        if( e.message === "Doctor not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        else if( e.message === "you must provide doctor id!" ) {
            return res.status(400).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const getAppointmentsByDate = async (req, res) => {
    try {
        const appointments = await appointmentController.getAppointmentsByDate( req.query.start_date, req.query.end_date );

        res.json({ appointments, count: appointments.length });
    } catch(e) {
        if( e.message === "Doctor not found!" ) {
            return res.status(404).json({ message: e.message });
        }
    
        res.status(500).json({ message: e.message });
    }
};

const editAppointment = async (req, res) => {
    try {
        if(!req.params.id) throw new Error("You must provide appointment id!");

        const requested_fields = Object.keys(req.body);

        const valid_fields = ['patient_id', 'doctor_id', 'fee', 'date' ];

        const valid_operation = requested_fields.every( field => valid_fields.includes(field) );

        if(!valid_operation) throw new Error("Invalid Input");

        const appointment = await appointmentController.editAppointment(req.body, req.params.id);

        res.json(appointment);
    } catch(e) {
        if( e.message === "You must provide appointment id!" || e.message || "Invalid Input" ) {
            return res.status(400).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        if(!req.params.id) throw new Error("You must provide appointment id!");

        const deletedAppointment = await appointmentController.deleteAppointment( req.params.id );

        res.json(deletedAppointment);
    } catch(e) {
        if( e.message === "You must provide appointment id!" ) {
            return res.status(400).json({ message: e.message });
        }
        
        else if( e.message === "Appointment not found!") {
            return res.status(404).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentController.getAllAppointments(req.hospital, req.query.limit);

        res.json({ appointments, count: appointments.length });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {
    makeAppointment,
    getAppointmentsByDoctorId,
    getAppointmentsByDate,
    editAppointment,
    deleteAppointment,
    getAllAppointments
};