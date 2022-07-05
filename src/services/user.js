const R = require('ramda');

// modules
const { photoUpload } = require("../modules/photo");

// schema
const User = require("../models/user");

const addUser = async (request_body, file) => {
    try {
        const isUsedEmail = await User.findOne({ email: request_body.email });

        if(isUsedEmail) throw new Error("This email is already used!");

        let profile;

        if(file) {
            profile = await photoUpload(file);
        }

        const user = await User.create({
            ...request_body,
            profile
        });

        return user;
    } catch(e) {
        throw (e);
    }
};

const getUserById = async (user_id) => {
    try {
        const user = await User.findById(user_id);

        if(!user) throw new Error("User not found!");

        return user;
    } catch(e) {
        throw (e);
    }
};

const editUser = async (request_body, user_id, file) => {
    try {
        const edits = Object.keys(request_body);
        
        const user = await User.findById(user_id);
        
        if(!user) throw new Error("User not found!");

        if(file) {
            const profile = await photoUpload(file);

            user.profile = profile;
        }

        if(request_body.doctor_data) {
            user.doctor_data = R.mergeRight(user.doctor_data, request_body.doctor_data);
        }

        edits.forEach( edit => user[edit] = request_body[edit] );

        await user.save();

        return user;
    } catch(e) {
        throw (e);
    }
};

const deleteUser = async (user_id) => {
    try {
        const user = await User.findById(user_id);

        if(!user) throw new Error("User not found!");

        await user.remove();

        return user;
    } catch(e) {
        throw (e);
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find();

        return users;
    } catch(e) {
        throw (e);
    }
};

const getAllDoctors = async () => {
    try {
        const doctors = await User.find({ role: 'doctor'});

        return doctors;
    } catch(e) {
        throw (e);
    }
};

const getAllPatients = async () => {
    try {
        const patients = await User.find({ role: 'patient' });

        return patients;
    } catch(e) {
        throw (e);
    }
};

const getAllStaffs = async () => {
    try {
        const staffs = await User.aggregate([
            {
                $match: {
                    $and: [
                        { role: { $ne: 'doctor' } },
                        { role: { $ne: 'patient' } }
                    ]
                }
            }
        ]);

        return staffs;
    } catch(e) {
        throw new Error(e);
    }
};

const getPatientsByDate = async (start_date, end_date) => {
    try {
        const days = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ];

        const data = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(start_date),
                        $lte: new Date(end_date)
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt'
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$date",
                    count: { $sum: 1 }
                }
            }
        ]);

        const dateToDay = (date) => {
            const d = new Date(date).getDay();
            
            return days[d]
        };

        const result = R.compose(
            R.mergeRight( R.zipObj( days, new Array(7).fill(0) ) ),
            R.mergeAll,
            R.map( ({ _id, count }) => ({ [_id]: count }) ),
            R.map( R.evolve({ _id: dateToDay }) )
        );

        return result(data);
    } catch(e) {
        throw (e);
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