// modules
const { request_validation } = require("../modules/req_validation");

// controllers
const patientControllers = require('../controllers/patient');

const addPatient = async (req, res) => {
    try {
        const request_body = await request_validation(req.body);
        
        if(req.file) {
            const patient = await patientControllers.addPatient(request_body, req.hospital, req.file);

            return res.status(201).json(patient);
        } else {
            const patient = await patientControllers.addPatient( request_body, req.hospital );

            return res.status(201).json(patient);
        }
    } catch(e) {
        if( e.message === "Invalid Input!" ||
            e.message === "Invalid Email!" || 
            e.message === "Unexpected field"
        ) {
            return res.status(400).json({ message: e.message });
        }

        else if ( e.message === "This email is already used!" ) {
            return res.status(409).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        if(!req.query.id) throw new Error('You must provide patient id!');

        const patient = await patientControllers.getPatientById( req.query.id );

        res.json(patient);
    } catch(e) {
        if( e.message === "Error: Patient not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        else if( e.message === "You must provide patient id!" ) {
            return res.status(400).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const editPatient = async (req, res) => {
    try {
        if(!req.query.id) throw new Error('You must provide patient id!');

        const request_body = await request_validation(req.body);

        if(req.file) {
            const patient = await patientControllers.editPatient( request_body, req.query.id, req.file );

            return res.json(patient);
        } else {
            const patient = await patientControllers.editPatient( request_body, req.query.id );

            return res.json(patient);
        }
    } catch(e) {
        if( e.message === "Invalid Input!" ||
            e.message === "Invalid Email!" || 
            e.message === "Unexpected field" ||
            e.message === "You must provide patient id!"
        ) {
            return res.status(400).json({ message: e.message });
        }

        else if( e.message === "Error: Patient not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const deletePatient = async (req, res) => {
    try {
        if(!req.query.id) throw new Error("You must provide doctor id in query!");

        const patient = await patientControllers.deletePatient( req.query.id );

        res.json(patient);
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

const getAllPatients = async (req, res) => {
    try {
        const patients = await patientControllers.getAllPatients( req.hospital );

        res.json(patients);
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {
    addPatient,
    getPatientById,
    editPatient,
    deletePatient,
    getAllPatients,
};