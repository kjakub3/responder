const Joi = require('joi')

const paramsValidation = Joi.string().uuid().message('Invalid object ID number in request').required()

const validation = {
    getQuestion: {
        params: Joi.object({
            questionId: paramsValidation,
        })
    },
    getAnswer: {
        params: Joi.object({
            questionId: paramsValidation,
            answerId: paramsValidation,
        })
    },
    createQuestion: {
        body: Joi.object({
            author: Joi.string().max(255).required(),
            summary: Joi.string().required(),
        })
    },
    createAnswer: {
        params: Joi.object({
            questionId: paramsValidation,
        }),
        body: Joi.object({
            author: Joi.string().max(255).required(),
            summary: Joi.string().required(),
        })
    },
}

module.exports = { validation }