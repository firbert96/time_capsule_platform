const Joi = require('joi');
const vR = require('./validate_request');

module.exports = { 
    add(req,res,next) {
        const schema = Joi.object({
            fullname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        });
        vR.validateRequest(req, next, schema);
    },
    login(req,res,next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
        vR.validateRequest(req, next, schema);
    },
};


