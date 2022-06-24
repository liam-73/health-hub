const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        
        email: {
            type: String,
            required: true
        },

        dateOfBirth: {
            type: String
        },

        address: {
            type: String
        },

        specilization: {
            type: String,
            required: true
        },

        appointment_fee: {
            type: Number,
            required: true
        },

        daily_token_numbers: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const Doctor = mongoose.model( "Doctor", doctorSchema );

module.exports = Doctor;