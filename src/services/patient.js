// modules
const { photoUpload } = require("../modules/photo");

// schema
const Patient = require("../models/patient");

const addPatient = async (request_body, hospital, file) => {
    try {
        const isUsedEmail = await Patient.findOne({ email: request_body.email });

        if(isUsedEmail) throw new Error("This email is already used!");

        if(file) {
            const profile = await photoUpload(file);

            const patient = await new Patient({
                ...request_body,
                hospital: hospital._id,
                profile
            });

            await patient.save();

            return patient;
        } else {
            const patient = await new Patient({
                ...request_body,
                hospital: hospital._id
            });

            await patient.save();

            return patient;
        }
    } catch(e) {
        throw new Error(e);
    }
};

const getPatientById = async (patient_id) => {
    try {
        const patient = await Patient.findById(patient_id);

        if(!patient) throw new Error("Patient not found!");

        return patient;
    } catch(e) {
        throw new Error(e);
    }
};

const editPatient = async (request_body, patient_id, file) => {
    try {
        const edits = Object.keys(request_body);

        const patient = await Patient.findById(patient_id);

        if(!patient) throw new Error("Patient not found!");

        if(file) {
            const profile = await photoUpload(file);

            patient.profile = profile;
        }

        edits.forEach( edit => patient[edit] = request_body[edit] );

        await patient.save();

        return patient;
    } catch(e) {
        throw new Error(e);
    }
};

const deletePatient = async (patient_id) => {
    try {
        const patient = await Patient.findById(patient_id);

        if(!patient) throw new Error("Patient not found!");

        await patient.remove();

        return patient;
    } catch(e) {
        throw new Error(e);
    }
}

const getAllPatients = async (hospital) => {
    try {
        const patients = await Patient.find({ hospital: hospital._id });

        return patients;
    } catch(e) {
        throw new Error(e);
    }
};

module.exports = {
    addPatient,
    getPatientById,
    editPatient,
    deletePatient,
    getAllPatients,
};