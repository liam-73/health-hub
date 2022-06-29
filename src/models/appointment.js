const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },

        patient_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        },

        fee: {
            type: Number
        },

        date: {
            type: String,
            required: true
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

const Appointment = mongoose.model("Appointment", appointmentSchema );

module.exports = Appointment;