// services
const staffServices = require("../services/staff");

const addStaff = async (request_body, hospital, file) => {
    const staff = await staffServices.addStaff( request_body, hospital, file );

    return staff;
};

const getStaffById = async ( staff_id ) => {
    const staff = await staffServices.getStaffById( staff_id );

    return staff;
};

const editStaff = async ( request_body, staff_id, file ) => {
    const staff = await staffServices.editStaff( request_body, staff_id, file );

    return staff;
};

const deleteStaff = async ( staff_id ) => {
    const staff = await staffServices.deleteStaff( staff_id );

    return staff;
};

const getAllStaffs = async (hospital) => {
    const staffs = await staffServices.getAllStaffs(hospital);

    return staffs;
}
module.exports = {
    addStaff,
    getStaffById,
    editStaff,
    deleteStaff,
    getAllStaffs,
};