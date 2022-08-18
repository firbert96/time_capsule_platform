const Joi = require('joi');
const vR = require('./validate_request');

module.exports = {
    add(req,res,next) {
        const schema = Joi.object({
            subject: Joi.string().required(),
            message: Joi.string().required(),
            release_time: Joi.string().required(),
        });
        vR.validateRequest(req, next, schema);
    },
    update(req,res,next) {
        const schema = Joi.object({
            subject: Joi.string(),
            message: Joi.string(),
            release_time: Joi.string(),
            active:Joi.boolean()
        });
        vR.validateRequest(req, next, schema);
    },
}