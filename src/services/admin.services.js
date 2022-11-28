const bcrypt = require('bcrypt');

const { authToken } = require('../authentication/generateToken');
const Admin = require('../models/admin.model');

const addAdmin = async (adminData) => {
  const isExisted = await Admin.findOne({ email: adminData.email });

  if (isExisted) throw new Error('This email is already used');

  try {
    const admin = await new Admin(adminData);

    return await admin.save();
  } catch (e) {
    throw e;
  }
};

const login = async ({ email, password }) => {
  try {
    const admin = await Admin.findOne({ email });

    if (!admin) throw new Error("There's no admin with this email!");

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) throw new Error('Wrong Password!');

    const token = await authToken(admin);

    return { admin, token };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  addAdmin,
  login,
};
