import { v2 as cloudinary } from "cloudinary";
import AppError from "../utils/AppError.js";

const ensureCloudinaryConfigured = () => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        throw new AppError(
            "Image upload is not configured on the server.",
            503
        );
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });
};

export const uploadToCloudinary = (buffer, folder = "kashf/avatars") =>
    new Promise((resolve, reject) => {
        try {
            ensureCloudinaryConfigured();
        } catch (error) {
            reject(error);
            return;
        }

        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error) {
                    reject(
                        new AppError(
                            error.message || "Image upload failed.",
                            400
                        )
                    );
                    return;
                }

                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });

export const deleteFromCloudinary = async (imageUrl) => {
    if (!imageUrl) {
        return;
    }

    try {
        ensureCloudinaryConfigured();
        const publicId = imageUrl
            .split("/")
            .slice(-2)
            .join("/")
            .replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
    } catch {
        // Best-effort cleanup
    }
};

export default cloudinary;
