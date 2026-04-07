import Joi from "joi";

const productValidationSchema = Joi.object({
    name: Joi.string().min(3).max(300).required(),
    description: Joi.string().min(10).max(1000).optional(),
    price: Joi.number().positive().precision(2).required(),
    category: Joi.string().min(3).max(150).required(),
    image: Joi.string().optional()
});

export default productValidationSchema;