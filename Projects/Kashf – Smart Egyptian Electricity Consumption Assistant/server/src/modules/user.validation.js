import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
});

const signupSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9-]+( [a-zA-Z0-9-]+)?$/)
        .min(3)
        .max(200)
        .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    repassword: Joi.valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords must match.",
    }),
});

export { loginSchema, signupSchema };
