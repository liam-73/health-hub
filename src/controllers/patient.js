const patientServices = require('../services/patient');

const addPatient = async (request_body, hospital, file) => {
    const patient = await patientServices.addPatient( request_body, hospital, file );

    return patient;
};

const getPatientById = async ( patient_id ) => {
    const patient = await patientServices.getPatientById( patient_id );

    return patient;
};

const editPatient = async (request_body, patient_id, file) => {
    const patient = await patientServices.editPatient( request_body, patient_id, file );

    return patient;
};

const deletePatient = async( patient_id ) => {
    const patient = await patientServices.deletePatient(patient_id);

    return patient;
}

const getAllPatients = async (hospital) => {
    const patients = await patientServices.getAllPatients(hospital);

    return patients;
};

module.exports = {
    addPatient,
    getPatientById,
    editPatient,
    deletePatient,
    getAllPatients,
}