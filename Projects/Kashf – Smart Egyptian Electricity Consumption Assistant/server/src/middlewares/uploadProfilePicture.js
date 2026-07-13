import multer from "multer";
import AppError from "../utils/AppError.js";

const storage = multer.memoryStorage();

const fileFilter = (_req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
        callback(null, true);
        return;
    }

    callback(new AppError("Only image files are allowed.", 400), false);
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

const uploadProfilePicture = (req, res, next) => {
    upload.single("picture")(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            if (error.code === "LIMIT_FILE_SIZE") {
                return next(new AppError("Image must be 5MB or smaller.", 400));
            }
            return next(new AppError(error.message, 400));
        }

        if (error) {
            return next(error);
        }

        next();
    });
};

export default uploadProfilePicture;
