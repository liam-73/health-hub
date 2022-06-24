const validator = require('validator');

// controllers
const hospitalControllers = require("../controllers/hospital");

const createHospitalProfile = async (req, res) => {
    try {
        const requested_fields = Object.keys(req.body);

        const valid_fields = [ 'name', 'email', 'password', 'address', 'profile' ];

        const validOperation = requested_fields.every( field => valid_fields.includes(field) );

        if(!validOperation) throw new Error("Invalid Input!");

        const validEmail = validator.isEmail(req.body.email.toLowerCase());

        if (!validEmail) throw new Error("Invalid Email!");

        for( item in req.body ) {
            if( typeof item !== 'string' ) throw new Error("Invalid Input!");
        }

        if(req.file) {
            if( req.file.fieldname !== 'profile' )  throw new Error("Fieldname must be profile!");

            const data = await hospitalControllers.createHospitalProfile( req.body, req.file );

            return res.status(201).json({ hospital: data.hospital, token: data.token });
        } else {
            const data = await hospitalControllers.createHospitalProfile(req.body);

            return res.status(201).json({ hospital: data.hospital, token: data.token });
        }
    } catch(e) {
        if( e.message === "Invalid Input!" || e.message === "Fieldname must be profile" || e.message === "Invalid Email!" ) {
            return res.status(400).json({ message: e.message });
        }

        else if ( e.message === "This email is already used!" ) {
            return res.status(409).json({ message: e.message });
        }

        return next(e);
        res.status(500).json({ message: e.message });
    }
};

const login = async (req, res) => {
    try {
        const requested_fields = Object.keys(req.body);
        
        const valid_fields = [ 'email', 'password' ];

        const validOperation = requested_fields.every( field => valid_fields.includes(field) );

        if(!validOperation) throw new Error("Invalid Input!");

        const validEmail = validator.isEmail( req.body.email.toLowerCase() );

        if (!validEmail) throw new Error("Invalid Email!");

        for( item in req.body ) {
            if( typeof item !== 'string' ) throw new Error("Invalid Input!");
        }

        const data = await hospitalControllers.login( req.body.email, req.body.password );

        res.json({ hospital: data.hospital, token: data.token });
    } catch(e) {
        if( e.message === "Invalid Input!" || e.message === "Invalid Email!" || e.message === "Wrong Password!" ) {
            return res.status(400).json({ message: e.message });
        }

        else if( e.message === "Wrong Email!" ) {
            return res.status(404).json({ message: e.message });
        }

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
        const requested_fields = Object.keys(req.body);

        const valid_fields = [ 'name', 'email', 'password', 'address', 'profile' ];

        const validOperation = requested_fields.every( field => valid_fields.includes(field) );

        if(!validOperation) throw new Error("Invalid Input!");

        if(req.body.email) {
            const validEmail = validator.isEmail( req.body.email.toLowerCase() );

            if (!validEmail) throw new Error("Invalid Email!");
        }

        for( item in req.body ) {
            if( typeof item !== 'string' ) throw new Error("Invalid Input!");
        }

        if(req.file) {
            const hospital = await hospitalControllers.editProfile(req.hospital, req.body, req.file);

            res.json(hospital);
        } else {
            const hospital = await hospitalControllers.editProfile(req.hospital, req.body);

            res.json(hospital);
        }
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
    login,
    getProfile,
    editProfile,
    deleteHospital,
};