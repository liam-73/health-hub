const hospitalServices = require("../services/hospital");

const createHospitalProfile = async (hospital_data, file) => {
    const hospital = await hospitalServices.createHospitalProfile( hospital_data, file )

    return hospital;
};

const editProfile = async (hospital, requestBody, file) => {
    const data = await hospitalServices.editProfile(hospital, requestBody, file);

    return data;
};

module.exports = {
    createHospitalProfile,
    editProfile,
}