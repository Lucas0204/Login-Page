const Joi = require('joi')

const validateRegister = (data) => {

    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(8).max(150),
        password: Joi.string().required().min(8).max(200)
    })

    return schema.validate(data)

}

const validateLogin = (data) => {

    const schema = Joi.object({
        email: Joi.string().required().min(8).max(150),
        password: Joi.string().required().min(8).max(200)
    })

    return schema.validate(data)

}

module.exports = { validateRegister, validateLogin }
