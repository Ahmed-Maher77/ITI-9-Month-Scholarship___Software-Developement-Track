import AppError from "../utils/AppError.js";

const validateRequestBody = (validationSchema) => {
    return (req, res, next) => {
        // Check if validation schema is provided
        if (!validationSchema) {
            return next(
                new AppError("Validation schema is required for this route.", 500)
            );
        }

        const requestData = req.body;

        // 1. Check the request body isn't empty
        if (!requestData || Object.keys(requestData).length === 0) {
            return next(
                new AppError("Please provide data in the request body.", 400)
            );
        }

        // 2. Check the request body is an object
        if (typeof requestData !== "object") {
            return next(
                new AppError("Invalid data format. Please send a JSON object.", 400)
            );
        }

        // 3. Validate the request body using the validation schema
        const { error, value } = validationSchema.validate(requestData, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                message: "Validation failed.",
                details: error.details.map((detail) => ({
                    field: detail.path[0],
                    message: detail.message,
                })),
            });
        }

        // 4. Continue to next middleware/controller
        req.body = value;
        next();
    };
};

export { validateRequestBody };
export default validateRequestBody;
