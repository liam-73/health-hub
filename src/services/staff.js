// modules
const { photoUpload } = require("../modules/photo");

// schma
const Staff = require("../models/staff");

const addStaff = async ( request_body, hospital, file ) => {
    try {
        if( request_body.email ) {
            const isUsedEmail = await Staff.findOne({ email: request_body.email });

            if(isUsedEmail) throw new Error("This email is already used!");
        }

        if(file) {
            const profile = await photoUpload(file);

            const staff = await new Staff({
                ...request_body,
                hospital: hospital._id,
                profile
            });

            await staff.save();

            return staff;
        } else {
            const staff = await new Staff({
                ...request_body,
                hospital: hospital._id
            });

            await staff.save();

            return staff;
        }
    } catch(e) {
        throw (e);
    }
};

const getStaffById = async ( staff_id ) => {
    try {
        const staff = await Staff.findById(staff_id);

        if(!staff) throw new Error("Staff not found!");

        return staff;
    } catch(e) {
        throw (e);
    }
};

const editStaff = async ( request_body, staff_id, file ) => {
    try {
        const edits = Object.keys(request_body);

        const staff = await Staff.findById(staff_id);

        if(!staff) throw new Error("Staff not found!");

        if(file) {
            const profile = await photoUpload(file);

            staff.profile = profile;
        }

        edits.forEach( edit => staff[edit] = request_body[edit] );

        await staff.save();

        return staff;
    } catch(e) {
        throw (e);
    }
};

const deleteStaff = async ( staff_id ) => {
    try {
        const staff = await Staff.findById(staff_id);

        if(!staff) throw new Error("Staff not found!");

        await staff.remove();

        return staff;
    } catch(e) {
        throw (e);
    }
};

const getAllStaffs = async ( hospital ) => {
    try {
        const staffs = await Staff.find({ hospital: hospital._id });

        return staffs;
    } catch(e) {
        throw (e);
    }
}

module.exports = {
    addStaff,
    getStaffById,
    editStaff,
    deleteStaff,
    getAllStaffs,
};