// modules
const {
    doctor_validation,
    patient_validation,
    staff_validation
} = require("./request.handler");

const moment = require("moment");

// controllers
const userControllers = require('../controllers/user');

const addUser = async (req, res, next) => {
    try {
        let request_body;
        const role = req.body.role;

        if( role.charAt(0) !== role.charAt(0).toUpperCase() ) {
            req.body.role = role.charAt(0).toUpperCase() + role.slice(1);
        }

        if( req.body.role === 'Doctor' ) {

            request_body = await doctor_validation(req.body);

        } else if( req.body.role === 'Patient' ) {

            request_body = await patient_validation(req.body);
        
        } else {

            request_body = await staff_validation(req.body);

        }
        
        const user = await userControllers.addUser(request_body, req.file);

        return res.status(201).json(user);
    } catch(e) {
        next(e);
    }
};

const getUserById = async (req, res, next) => {
    try {
        if(!req.params.id) throw new Error('You must provide user id!');

        const user = await userControllers.getUserById( req.params.id );

        res.json(user);
    } catch(e) {
        next(e);
    }
};

const editUser = async (req, res, next) => {
    try {
        if(!req.params.id) throw new Error('You must provide user id!');

        let request_body;

        if( req.body.role === 'Doctor' ) {

            request_body = await doctor_validation(req.body);

        } else if( req.body.role === 'Patient' ) {

            request_body = await patient_validation(req.body);
        
        } else {

            request_body = await staff_validation(req.body);

        }

        const user = await userControllers.editUser( request_body, req.params.id, req.file );

        return res.json(user);
    } catch(e) {
       next(e);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        if(!req.params.id) throw new Error("You must provide user id!");

        const user = await userControllers.deleteUser( req.params.id );

        res.json(user);
    } catch(e) {
        next(e);
    }
};

const getPatientsByDate = async (req, res, next) => {
    try {
        if(!req.query.start_date || !req.query.end_date ) throw new Error("You must provide start date and end date!");

        const start_date = new Date(req.query.start_date);
        const end_date = new Date(req.query.end_date);
        const oneDay = 1000 * 60 * 60 * 24;

        const diffInTime = end_date.getTime() - start_date.getTime() + oneDay;

        const is7days = Math.round(diffInTime / oneDay) === 7;

        if(!is7days) throw new Error("You must only provide 7 days!");

        const data = await userControllers.getPatientsByDate(req.query.start_date, req.query.end_date);

        res.json(data);
    } catch(e) {
        next(e);
    }
};

const getStaffsByDate = async (req, res, next) => {
    try {
        if(!req.query.date) throw new Error("You must provide a date!");

        const start_date = moment(new Date(req.query.date).toISOString()).subtract(1, 'months').format("YYYY-MM-DD");

        const data = await userControllers.getStaffsByDate(start_date, req.query.date);

        res.json(data);
    } catch(e) {
        next(e);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userControllers.getAllUsers();

        res.json({ users, count: users.length });
    } catch(e) {
        next(e);
    }
};

const getUsersByRole = async (req, res, next) => {
    try {
        if(!req.query.role || typeof req.query.role !== 'string' ) throw new Error("you must provide role!");

        const  users = await userControllers.getUsersByRole(req.query.role);

        res.json({ users });
    } catch(e) {
        next(e);
    }
};

const getUsersByNameAndRole = async (req, res, next) => {
    try {
        if(!req.query.name || !req.query.role ) throw new Error("you must provide a name and role!");

        const users = await userControllers.getUsersByNameAndRole(req.query.name, req.query.role);

        res.json({ users });
    } catch(e) {
       next(e);
    }
};

module.exports = {
    addUser,
    getUserById,
    editUser,
    deleteUser,
    getAllUsers,
    getUsersByRole,
    getPatientsByDate,
    getStaffsByDate,
    getUsersByNameAndRole,
};