const adminServices = require("../services/admin");

const addNewAdmin = async ( user_id, password, hospital ) => {
    const admin = await adminServices.addNewAdmin(user_id, password, hospital );
    
    return admin;
};

const login = async (user_id, password) => {
    const admin = await adminServices.login(user_id, password);

    return admin;
};

module.exports = {
    addNewAdmin,
    login,
}