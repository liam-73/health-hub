const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// schemas
const Appointment = require('./appointment');
const Transaction = require("./transaction");
const User = require("./user");
const Admin = require("./admin")

const hospitalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            trim: true.valueOf,
            required: true,
        },

        phone_number: {
            type: String,
            trim: true,
        },

        address: {
            type: String
        },

        profile: {
            type: String
        },

        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

hospitalSchema.virtual( "users", {
    ref: "User",
    localField: "_id",
    foreignField: "hospital"
});

hospitalSchema.virtual( "admins", {
    ref: "Admin",
    localField: '_id',
    foreignField: 'hospital'
});

hospitalSchema.virtual( "appointments", {
    ref: "Appointment",
    localField: "_id",
    foreignField: "hospital"
});

hospitalSchema.virtual( "transactions", {
    ref: "Transaction",
    localField: "_id",
    foreignField: "hospital"
});

hospitalSchema.virtual( "admins", {
    ref: "Admin",
    localField: "_id",
    foreignField: "hospital"
});

hospitalSchema.pre( 'save', async function (next) {
    const hospital = this;

    if( hospital.isModified("password") ) {
        hospital.password = await bcrypt.hash( hospital.password, 8 );
    }
    
    next();
});

hospitalSchema.pre( 'remove', async function (next) {
    const hospital = this.hospital;

    await Admin.deleteMany({ hospital});
    await User.deleteMany({ hospital});
    await Appointment.deleteMany({ hospital });
    await Transaction.deleteMany({ hospital });

    next();
});

const Hospital = mongoose.model( "Hospital", hospitalSchema );

module.exports = Hospital;