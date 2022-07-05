const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            trim: true,
            required: true
        },

        password: {
            type: String,
            trim: true,
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

adminSchema.pre( 'save', async function (next) {
    const admin = this;

    if( admin.isModified("password") ) {
        admin.password = await bcrypt.hash( admin.password, 8 );
    }
    
    next();
});

const Admin = mongoose.model( "Admin", adminSchema );

module.exports = Admin;