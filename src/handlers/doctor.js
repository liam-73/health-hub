// modules
const { request_validation } = require("../modules/req_validation");

// controllers
const doctorControllers = require('../controllers/doctor');

const addDoctor = async (req, res) => {
    try {
        const request_body = await request_validation(req.body);

        if(req.file) {
            if( req.file.fieldname !== 'profile' )  throw new Error("Fieldname must be profile!");

            const doctor = await doctorControllers.addDoctor( request_body, req.hospital, req.file );

            return res.status(201).json(doctor);
        } else {
            const doctor = await doctorControllers.addDoctor( request_body, req.hospital );

            return res.status(201).json(doctor);
        }
    } catch(e) {
        if( e.message === "Invalid Input!" || e.message === "Fieldname must be profile" || e.message === "Invalid Email!" ) {
            return res.status(400).json({ message: e.message });
        }

        else if ( e.message === "This email is already used!" ) {
            return res.status(409).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const getDoctor = async (req, res) => {
    try {
        const doctor = await doctorControllers.getDoctor(req.query.id);

        res.json(doctor);
    } catch(e) {
        if( e.message === "Error: Doctor not found!" ) {
            return res.status(404).json({ message: e.message });
        }
        res.status(500).json({ message: e.message });
    }
};

const editDoctor = async (req, res) => {
    try {
        const request_body = await request_validation(req.body);

        if(!req.query.id) throw new Error("You must provide doctor id in query!");

        if(req.file) {
            const doctor = await doctorControllers.editDoctor( request_body, req.query.id, req.file );

            res.json(doctor);
        } else {
            const doctor = await doctorControllers.editDoctor( request_body, req.query.id );

            res.json(doctor);
        }
    } catch(e) {
        if( e.message === "Invalid Input!" || e.message === "Invalid Email!" || e.message === "You must provide doctor id in query!" ) {
            return res.status(400).json({ message: e.message });
        }

        else if( e.message === "Error: Doctor not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        if(!req.query.id) throw new Error("You must provide doctor id in query!");
        
        const doctor = await doctorControllers.deleteDoctor( req.query.id );

        res.json(doctor);
    } catch(e) {
        if( e.message === "You must provide doctor id in query!" ) {
            return res.status(400).json({ message: e.message });
        }

        else if( e.message === "Error: Doctor not found!" ) {
            return res.status(404).json({ message: e.message });
        }
        res.status(500).json({ message: e.message });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorControllers.getAllDoctors(req.hospital);

        res.json({ doctors, count: doctors.length });
    } catch(e) {

    }
};

module.exports = {
    addDoctor,
    getDoctor,
    editDoctor,
    deleteDoctor,
    getAllDoctors,
};