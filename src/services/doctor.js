// modules
const { photoUpload } = require("../modules/photo");
const { authToken } = require("../authentication/generateToken");

// schema
const Doctor = require("../models/doctor");

const addDoctor = async (request_body, hospital, file) => {
    try {
        const isUsedEmail = await Doctor.findOne({ email: request_body.email });

        if(isUsedEmail) throw new Error("This email is already used!");

        if(file) {
            const profile = await photoUpload(file);

            const doctor = await new Doctor({
                ...request_body,
                hospital: hospital._id,
                profile
            });

            await doctor.save();

            return doctor;
        } else {
            const doctor = await new Doctor({
                ...request_body,
                hospital: hospital._id
            });

            await doctor.save();

            return doctor;
        }
    } catch(e) {
        throw new Error(e);
    }
};

const getDoctor = async ( doctor_id ) => {
    try {
        const doctor = await Doctor.findById(doctor_id);

        if(!doctor) throw new Error("Doctor not found!");

        return doctor;
    } catch(e) {
        throw new Error(e);
    }
};

const editDoctor = async ( request_body, doctor_id, file ) => {
    try {
        const edits = Object.keys(request_body);

        const doctor = await Doctor.findById(doctor_id);

        if(!doctor) throw new Error("Doctor not found!");

        if(file) {
            const profile = await photoUpload(file);

            doctor.profile = profile;

            edits.forEach(  edit => doctor[edit] = request_body[edit] );

        } else {
            edits.forEach(  edit => doctor[edit] = request_body[edit] );
        }

        await doctor.save();

        return doctor;
    } catch(e) {
        throw new Error(e);
    }
};

const deleteDoctor = async ( doctor_id ) => {
    try {
        const doctor = await Doctor.findById(doctor_id);

        if(!doctor) throw new Error("Doctor not found!");

        return doctor;
    } catch(e) {
        throw new Error(e);
    }
};

const getAllDoctors = async (hospital) => {
    try {
        const doctors = await Doctor.find({ hospital: hospital._id });

        return doctors;
    } catch(e) {
        throw new Error(e);
    }
}

module.exports = {
    addDoctor,
    getDoctor,
    editDoctor,
    deleteDoctor,
    getAllDoctors,
};