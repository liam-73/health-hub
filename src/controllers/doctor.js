const doctorServices = require("../services/doctor");

const addDoctor = async (request_body, hospital, file) => {
    const doctor = await doctorServices.addDoctor( request_body, hospital, file );

    return doctor;
};

const getDoctor = async (doctor_id) => {
    const doctor = await doctorServices.getDoctor( doctor_id );

    return doctor;
};

const editDoctor = async (request_body, doctor_id, file) => {
    const doctor = await doctorServices.editDoctor( request_body, doctor_id, file );

    return doctor;
};

const deleteDoctor = async ( doctor_id ) => {
    const doctor = await doctorServices.deleteDoctor( doctor_id );

    return doctor;
};

const getAllDoctors = async (hospital) => {
    const doctors = await doctorServices.getAllDoctors( hospital );

    return doctors;
}

module.exports = {
    addDoctor,
    getDoctor,
    editDoctor,
    deleteDoctor,
    getAllDoctors,
};