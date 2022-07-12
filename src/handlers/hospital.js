// modules
const { hospital_validation } = require("./request.handler");

// controllers
const hospitalControllers = require("../controllers/hospital");

const createHospitalProfile = async (req, res, next) => {
    try {
        const request_body = await hospital_validation(req.body);

        const data = await hospitalControllers.createHospitalProfile(request_body, req.file);

        return res.status(201).json({ hospital: data.hospital, token: data.token });
        
    } catch(e) {
        next(e);
    }
};

const getProfile = async (req, res, next) => {
    try {
        res.json( req.hospital );
    } catch(e) {
        next(e);
    }
};

const editProfile = async (req, res, next) => {
    try {
        const request_body = await hospital_validation(req.body);

        const hospital = await hospitalControllers.editProfile( req.hospital, request_body, req.file );

        res.json(hospital);
    } catch(e) {
        next(e);
    }
};

const deleteHospital = async (req, res, next) => {
    try {
        await req.hospital.remove();

        res.json({ message: "Hospital deleted!" });
    } catch(e) {
        next(e);
    }
};

module.exports = {
    createHospitalProfile,
    getProfile,
    editProfile,
    deleteHospital,
};