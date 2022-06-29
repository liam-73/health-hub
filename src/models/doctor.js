const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        profile: {
            type: String
        },

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

        specialization: {
            type: String,
            required: true
        },

        appointment_fee: {
            type: Number,
            required: true
        },

        daily_token_numbers: {
            type: Number
        },
        
        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital"
        }
    },
    {
        timestamps: true
    }
);

doctorSchema.virtual("appointments", {
    ref: "Appointment",
    localField: "_id",
    foreignField: "doctor_id"
});

const Doctor = mongoose.model( "Doctor", doctorSchema );

module.exports = Doctor;