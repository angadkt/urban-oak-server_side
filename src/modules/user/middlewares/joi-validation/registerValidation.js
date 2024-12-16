import Joi from "joi";

const registerValidation = Joi.object({
    name: Joi.string().required().min(3).max(10) ,
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
})

export default registerValidation