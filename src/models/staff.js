const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
    {
        role: {
            type: String
        },

        profile: {
            type: String
        },

        name: {
            type: String,
        },

        email: {
            type: String,
        },

        dateOfBirth: {
            type: String
        },

        address: {
            type: String
        },

        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital'
        }
    },
    {
        timestamps: true
    }
);

const Staff = mongoose.model( "Staff", staffSchema );

module.exports = Staff;