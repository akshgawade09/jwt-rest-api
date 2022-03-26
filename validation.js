const Joi = require("@hapi/joi");

module.exports.registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi
            .string()
            .min(6)
            .required()
            .messages({
                'any.required': 'Name is required.',
                'string.min': 'Name should be minimum 6 characters long.'
            }),
        email: Joi
            .string()
            .min(6)
            .required()
            .email()
            .messages({
                'any.required': 'Email is required.',
                'string.min': 'Email should be minimum 6 characters long.',
                'string.email': 'Please enter valid email.'
            }),
        password: Joi
            .string()
            .min(8)
            .required()
            .messages({
                'any.required': 'Password is required.',
                'string.min': 'Password should be minimum 8 characters long.'
            }),
    });

    return schema.validate(data, {abortEarly: false})
}

module.exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi
            .string()
            .min(6)
            .required()
            .email()
            .messages({
                'any.required': 'Email is required.',
                'string.min': 'Email should be minimum 6 characters long.',
                'string.email': 'Please enter valid email.'
            }),
        password: Joi
            .string()
            .min(8)
            .required()
            .messages({
                'any.required': 'Password is required.',
                'string.min': 'Password should be minimum 8 characters long.'
            }),
    });

    return schema.validate(data, {abortEarly: false})
}