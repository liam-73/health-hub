const { v4: uuidv4 } = require("uuid");

const { admin_validation } = require("./request.handler");

// schema
const Admin = require("../models/admin");

// controllers
const adminControllers = require("../controllers/admin");

const addNewAdmin = async ( req, res, next ) => {
    try {
        const user_id = uuidv4();
        const password = uuidv4();
    
        const admin = await adminControllers.addNewAdmin( user_id, password, req.hospital );
    
        res.status(201).json({ user_id, password });
    } catch(e) {
        next(e);
    }
};

const login = async ( req, res, next ) => {
    try {
        const body = await admin_validation(req.body);
        const {user_id, password} = body;

        const admin = await adminControllers.login( user_id, password );

        res.json(admin);
    } catch(e) {
        next(e);
    }
};

module.exports = {
    addNewAdmin,
    login,
}