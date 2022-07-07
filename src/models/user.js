const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        profile: {
            type: String
        },
        
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            trim: true
        },
        
        address: {
            type: String,
        },
        
        dateOfBirth: {
            type: String
        },
        
        doctor_data: {
            specialization: {
                type: String,
            },
    
            appointment_fee: {
                type: Number,
            },
    
            daily_token_numbers: {
                type: Number
            },
        },

        role: {
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

userSchema.virtual("appointments", {
    ref: "Appointment",
    localField: "_id",
    foreignField: "doctor_id"
});

userSchema.virtual("transacitions", {
    ref: "Transacition",
    localField: "_id",
    foreignField: "doctor_id"
});

userSchema.virtual("transacitions", {
    ref: "Transacition",
    localField: "_id",
    foreignField: "patient_id"
});

userSchema.index({ name: "text" });

const User = mongoose.model( "User", userSchema );

module.exports = User;