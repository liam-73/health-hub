const adminServices = require("../services/admin.services");

const addNewAdmin = async (adminData) => {
    return await adminServices.addAdmin(adminData);
};

const login = async (data) => {
    return await adminServices.login(data);
};

module.exports = {
    addNewAdmin,
    login,
}