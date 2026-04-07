import Joi from "joi";

const registerValidationSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9]+([ ]?[ -][ ]?[a-zA-Z0-9]+)*$/)
        .min(3)
        .max(50)
        .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    role: Joi.string().valid("user", "admin").default("user"),
}).strict();

const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
});

const forgotPasswordValidationSchema = Joi.object({
    email: Joi.string().email().required(),
}).strict();

const resetPasswordValidationSchema = Joi.object({
    newPassword: Joi.string().min(6).max(100).required(),
}).strict();



export { registerValidationSchema, loginValidationSchema, forgotPasswordValidationSchema, resetPasswordValidationSchema };
