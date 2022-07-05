// modules
const { request_validation } = require("./request.handler");

// controllers
const userControllers = require('../controllers/user');

const addUser = async (req, res) => {
    try {
        const request_body = await request_validation(req.body);
        
        const user = await userControllers.addUser(request_body, req.file);

        return res.status(201).json(user);
    } catch(e) {
        if( e.message === "Invalid Input!" ||
            e.message === "Invalid Email!" || 
            e.message === "Unexpected field"
        ) {
            return res.status(400).json({ message: e.message });
        }

        else if ( e.message === "This email is already used!" ) {
            return res.status(409).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const getUserById = async (req, res) => {
    try {
        if(!req.query.id) throw new Error('You must provide user id!');

        const user = await userControllers.getUserById( req.query.id );

        res.json(user);
    } catch(e) {
        if( e.message === "Patient not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        else if( e.message === "You must provide patient id!" ) {
            return res.status(400).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const editUser = async (req, res) => {
    try {
        if(!req.query.id) throw new Error('You must provide user id!');

        const request_body = await request_validation(req.body);

        const user = await userControllers.editUser( request_body, req.query.id, req.file );

        return res.json(user);
    } catch(e) {
        if( e.message === "Invalid Input!" ||
            e.message === "Invalid Email!" || 
            e.message === "Unexpected field" ||
            e.message === "You must provide patient id!"
        ) {
            return res.status(400).json({ message: e.message });
        }

        else if( e.message === "Patient not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if(!req.query.id) throw new Error("You must provide user id in query!");

        const user = await userControllers.deleteUser( req.query.id );

        res.json(user);
    } catch(e) {
        if( e.message === "You must provide doctor id in query!" ) {
            return res.status(400).json({ message: e.message });
        }

        else if( e.message === "Doctor not found!" ) {
            return res.status(404).json({ message: e.message });
        }
        res.status(500).json({ message: e.message });
    }
};

const getPatientsByDate = async (req, res) => {
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
        if( e.message === "You must provide start date and end date!" || e.message === "You must only provide 7 days!" ) {
            return res.status(400).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userControllers.getAllUsers();

        res.json({ users, count: users.length });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await userControllers.getAllDoctors();

        res.json({ doctors });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await userControllers.getAllPatients();

        res.json({ patients });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
};

const getAllStaffs = async (req, res) => {
    try {
        const staffs = await userControllers.getAllStaffs();

        res.json({ staffs });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
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
};