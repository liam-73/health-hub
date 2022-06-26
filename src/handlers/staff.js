// modules
const { request_validation } = require("../modules/req_validation");

// controllers
const staffControllers = require("../controllers/staff");

const addStaff = async (req, res) => {
    try {
        const request_body = await request_validation(req.body);

        if(req.file) {
            const staff = await staffControllers.addStaff( request_body, req.hospital, req.file );

            return res.status(201).json(staff);
        } else {
            const staff = await staffControllers.addStaff( request_body, req.hospital, req.file );

            res.status(201).json(staff);
        }
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

const getStaffById = async (req, res) => {
    try {
        if( !req.query.id ) throw new Error("You must provide staff id!");

        const staff = await staffControllers.getStaffById( req.query.id );

        res.json(staff);
    } catch(e) {
        if( e.message === "Staff not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        else if( e.message === "You must provide staff id!" ) {
            return res.status(400).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const editStaff = async (req, res) => {
    try {
        if(!req.query.id) throw new Error("You must provide staff id!");

        const request_body = await request_validation(req.body);

        if(req.file) {
            const staff = await staffControllers.editStaff( request_body, req.query.id, req.file );

            return res.json(staff);
        } else {
            const staff = await staffControllers.editStaff( request_body, req.query.id );

            res.json(staff);
        }
    } catch(e) {
        if( e.message === "Invalid Input!" ||
            e.message === "Invalid Email!" ||
            e.message === "You must provide staff id!"
        ) {
            return res.status(400).json({ message: e.message });
        }

        else if( e.message === "Staff not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const deleteStaff = async (req, res) => {
    try {
        if(!req.query.id) throw new Error("You must provide staff id!");

        const staff = await staffControllers.deleteStaff(req.query.id);

        res.json(staff);
    } catch(e) {
        if( e.message === "You must provide staff id!" ) {
            return res.status(400).json({ message: e.message });
        }
         
        else if( e.message === "Staff not found!" ) {
            return res.status(404).json({ message: e.message });
        }

        res.status(500).json({ message: e.message });
    }
};

const getAllStaffs = async (req, res) => {
    try {
        const staffs = await staffControllers.getAllStaffs(req.hospital);

        res.json(staffs);
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = {
    addStaff,
    getStaffById,
    editStaff,
    deleteStaff,
    getAllStaffs,
};