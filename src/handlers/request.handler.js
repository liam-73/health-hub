const validator = require("validator");
const Joi = require("joi");

const admin_validation = async ( request_body ) => {
    const schema = Joi.object({
        user_id: Joi.string(),
        password: Joi.string(),
        hospital: Joi.string()
    });

    const { value, error } = schema.validate(body);

    if(error) throw new Error("Invalid Input!");

    const requested_fields = Object.keys(body);

    const valid_fields = [ 'user_id', 'password', 'hospital' ];

    const validOperation = requested_fields.every( field => valid_fields.includes(field) );

    if(!validOperation) throw new Error("Invalid Input!");

    return request_body;
};

const doctor_validation = async ( request_body ) => {
    const schema = Joi.object({
        profile: Joi.string(),
        role: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        address: Joi.string(),
        dateOfBirth: Joi.string(),
        gender: Joi.string(),
        specialization: Joi.string(),
        appointment_fee: Joi.number(),
        daily_token_numbers: Joi.number(),
    });

    const { value, error } = schema.validate(request_body);

    if(error) throw new Error("Invalid Input!");

    const requested_fields = Object.keys( request_body );

    const valid_fields = [ 'profile', 'name', 'email', 'address', 'dateOfBirth', 'gender', 'specialization', 'appointment_fee', 'daily_token_numbers', 'hospital', 'role' ];

    const validOperation = requested_fields.every( field => valid_fields.includes(field) );

    if(!validOperation) throw new Error("Invalid Input!");

    if( request_body.email ) {
        const validEmail = validator.isEmail( request_body.email.toLowerCase() );

        if (!validEmail) throw new Error("Invalid Email!");
    }

    return request_body;
};

const patient_validation = async (request_body) => {
    const schema = Joi.object({
        profile: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        address: Joi.string(),
        dateOfBirth: Joi.string(),
        gender: Joi.string(),
        diagnosis: Joi.string(),
        role: Joi.string()
    });

    const { value, error } = schema.validate(request_body);

    if(error) throw new Error("Invalid Input!");

    const requested_fields = Object.keys( request_body );

    const valid_fields = [ 'profile', 'name', 'email', 'address', 'dateOfBirth', 'gender', 'diagnosis', 'role', 'hospital' ];

    const validOperation = requested_fields.every( field => valid_fields.includes(field) );

    if(!validOperation) throw new Error("Invalid Input!");

    if( request_body.email ) {
        const validEmail = validator.isEmail( request_body.email.toLowerCase() );

        if (!validEmail) throw new Error("Invalid Email!");
    }

    return request_body;
};

const staff_validation = async (request_body) => {
    const schema = Joi.object({
        profile: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        address: Joi.string(),
        dateOfBirth: Joi.string(),
        gender: Joi.string(),
        role: Joi.string()
    });

    const { value, error } = schema.validate(request_body);

    if(error) throw new Error("Invalid Input!");

    const requested_fields = Object.keys( request_body );

    const valid_fields = [ 'profile', 'name', 'email', 'address', 'dateOfBirth', 'gender', 'role', 'hospital' ];

    const validOperation = requested_fields.every( field => valid_fields.includes(field) );

    if(!validOperation) throw new Error("Invalid Input!");

    if( request_body.email ) {
        const validEmail = validator.isEmail( request_body.email.toLowerCase() );

        if (!validEmail) throw new Error("Invalid Email!");
    }

    return request_body;
};

const hospital_validation = async (request_body) => {
    const schema = Joi.object({
        profile: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        phone_number: Joi.string(),
        address: Joi.string(),
        description: Joi.string()
    });

    const { value, error } = schema.validate(request_body);

    if(error) throw new Error("Invalid Input!");

    const requested_fields = Object.keys( request_body );

    const valid_fields = [ 'profile', 'name', 'email', 'phone_number', 'address', 'description' ];

    const validOperation = requested_fields.every( field => valid_fields.includes(field) );

    if(!validOperation) throw new Error("Invalid Input!");

    if( request_body.email ) {
        const validEmail = validator.isEmail( request_body.email.toLowerCase() );

        if (!validEmail) throw new Error("Invalid Email!");
    }

    return request_body;
}

module.exports = { 
    admin_validation,
    doctor_validation,
    patient_validation,
    staff_validation,
    hospital_validation,
};