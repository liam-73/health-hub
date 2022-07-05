const userServices = require('../services/user');

const { doctorPropeties } = require("../constants/user.properties");

const addUser = async (request_body, file) => {
    if( doctorPropeties.includes(key) ) {
        doctorData[key] = request_body[key];

        delete request_body[key];
    }
    
    const user = await userServices.addUser( request_body, file );

    return user;
};

const getUserById = async ( user_id ) => {
    const user = await userServices.getUserById( user_id );

    return user;
};

const editUser = async (request_body, user_id, file) => {
    const doctorData = {};

    for await ( const key of Object.keys(request_body) ) {

        if( doctorPropeties.includes(key) ) {
            doctorData[key] = request_body[key];

            delete request_body[key];
        }

    };

    request_body.doctor_data = doctorData;

    const user = await userServices.editUser( request_body, user_id, file );

    return user;
};

const deleteUser = async( user_id ) => {
    const user = await userServices.deleteUser(user_id);

    return user;
}

const getAllUsers = async () => {
    const users = await userServices.getAllUsers();

    return users;
};

const getAllDoctors = async () => {
    const doctors = await userServices.getAllDoctors();

    return doctors;
};

const getAllPatients = async () => {
    const patients = await userServices.getAllPatients();

    return patients;
};

const getAllStaffs = async () => {
    const staffs = await userServices.getAllStaffs();

    return staffs;
};

const getPatientsByDate = async (start_date, end_date) => {
    const data = await userServices.getPatientsByDate(start_date, end_date);

    return data;
};

module.exports = {
    addUser,
    getUserById,
    editUser,
    deleteUser,
    getAllUsers,
    getAllDoctors,
    getAllPatients,
    getAllStaffs,
    getPatientsByDate,
}