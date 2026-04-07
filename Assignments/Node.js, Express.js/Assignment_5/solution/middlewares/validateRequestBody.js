import AppError from "../utils/AppError.js";

function validateRequestBody(validationSchema) {
    return (req, res, next) => {
        const data = req.body;
        
        // ensure request isn't empty
        if (!data || Object.keys(data).length === 0) {
            throw new AppError("Request body is required", 400);
        }
    
        // check data format
        if (typeof data !== "object") {
            throw new AppError("Request body must be a valid JSON object", 400);
        }

        // validate data using Joi
        const { error } = validationSchema.validate(data, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Validation failed.",
                details: error.details.map((d) => ({
                    field: d.path[0],
                    message: d.message,
                })),
            });
        }
    
        // continue to next middleware or route handler (controller)
        next();
    }
}


export default validateRequestBody;