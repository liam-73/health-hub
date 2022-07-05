const validator = require("validator");
const Joi = require("joi");

const request_validation = async ( body ) => {
    const schema = Joi.object({
        user_id: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        address: Joi.string(),
        dateOfBirth: Joi.string(),
        specialization: Joi.string(),
        appointment_fee: Joi.number(),
        daily_token_numbers: Joi.number(),
        role: Joi.string()
    });

    const { value, error } = schema.validate(body);

    if(error) throw new Error("Invalid Input!");

    const requested_fields = Object.keys(body);

    const valid_fields = [ 'profile', 'name', 'user_id', 'password', 'email', 'address', 'dateOfBirth', 'specialization', 'appointment_fee', 'daily_token_numbers', 'hospital', 'role' ];

    const validOperation = requested_fields.every( field => valid_fields.includes(field) );

    if(!validOperation) throw new Error("Invalid Input!");

    if(body.email) {
        const validEmail = validator.isEmail(body.email.toLowerCase());

        if (!validEmail) throw new Error("Invalid Email!");
    }

    return body;
};

module.exports = { request_validation };