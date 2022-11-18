const adminServices = require("../services/admin.services");

const addAdmin = async (adminData) => {
    return await adminServices.addAdmin(adminData);
};

const login = async (data) => {
    return await adminServices.login(data);
};

module.exports = {
    addAdmin,
    login,
}