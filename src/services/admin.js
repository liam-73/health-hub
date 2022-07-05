const bcrypt = require("bcrypt");

const { authToken } = require("../authentication/generateToken");
const Admin = require("../models/admin");

const addNewAdmin = async (user_id, password, hospital) => {
    try {
        const admin = await new Admin({
            user_id,
            password,
            hospital
        });

        await admin.save();

        return admin;
    } catch(e) {
        throw (e);
    }
};

const login = async (user_id, password) => {
    try{
        const admin = await Admin.findOne({ user_id });

        if(!admin) throw new Error("There's no admin with this user id!");

        const isMatch = await bcrypt.compare( password, admin.password );

        if(!isMatch) throw new Error("Wrong Password!");

        const token = await authToken(admin);

        return { admin, token };
    } catch(e) {
        throw (e);
    }
};

module.exports = {
    addNewAdmin,
    login,
}