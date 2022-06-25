const validator = require("validator");

const request_validation = async ( body ) => {
    const requested_fields = Object.keys(body);

    const valid_fields = [ 'profile', 'name', 'password', 'email', 'address', 'dateOfBirth', 'specialization', 'appointment_fee', 'daily_token_numbers' ];

    const validOperation = requested_fields.every( field => valid_fields.includes(field) );

    if(!validOperation) throw new Error("Invalid Input!");

    if(body.email) {
        const validEmail = validator.isEmail(body.email.toLowerCase());

        if (!validEmail) throw new Error("Invalid Email!");
    }

    return body;
};

module.exports = { request_validation };