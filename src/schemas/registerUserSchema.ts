import Joi from "joi";


const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.ref('password')
})

export default registerUserSchema;