// modules
const { request_validation } = require("./request.handler");

// controllers
const hospitalControllers = require("../controllers/hospital");

const createHospitalProfile = async (req, res) => {
    try {
        const request_body = await request_validation(req.body);

        for( item in request_body ) {
            if( typeof item !== 'string' ) throw new Error("Invalid Input!");
        }

        const data = await hospitalControllers.createHospitalProfile(request_body, req.file);

        return res.status(201).json({ hospital: data.hospital, token: data.token });
        
    } catch(e) {
        if( e.message === "Invalid Input!" || e.message === "Fieldname must be profile" || e.message === "Invalid Email!" ) {
            return res.status(400).json({ message: e.message });
        }

        else if ( e.message === "This email is already used!" ) {
            return res.status(409).json({ message: e.message });
        }

        // return next(e);
        res.status(500).json({ message: e.message });
    }
};

const getProfile = async (req, res) => {
    try {
        res.json( req.hospital );
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
};

const editProfile = async (req, res) => {
    try {
        const request_body = await request_validation(req.body);

        for( item in request_body ) {
            if( typeof item !== 'string' ) throw new Error("Invalid Input!");
        }

        console.log(req.file);

        const hospital = await hospitalControllers.editProfile( req.hospital, request_body, req.file );

        res.json(hospital);
    } catch(e) {
        if( e.message === "Invalid Input!" || e.message === "Invalid Email!" ) {
            return res.status(400).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const deleteHospital = async (req, res) => {
    try {
        await req.hospital.remove();

        res.json({ message: "Hospital deleted!" });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {
    createHospitalProfile,
    getProfile,
    editProfile,
    deleteHospital,
};