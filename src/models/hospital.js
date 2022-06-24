const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

        password: {
            type: String,
            trim: true,
            required: true
        },

        address: {
            type: String
        },

        profile: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

hospitalSchema.pre( 'save', async function (next) {
    const hospital = this;

    if( hospital.isModified("password") ) {
        hospital.password = await bcrypt.hash( hospital.password, 8 );
    }
    
    next();
});

const Hospital = mongoose.model( "Hospital", hospitalSchema );

module.exports = Hospital;