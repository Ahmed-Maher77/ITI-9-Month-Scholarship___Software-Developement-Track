export class ApiError extends Error {
    constructor(message, status, details) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

export const parseApiResponse = async (response, fallbackMessage) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message =
            data.error ??
            data.message ??
            (Array.isArray(data.details)
                ? data.details.map((item) => item.message).join(" ")
                : fallbackMessage);

        throw new ApiError(message, response.status, data.details);
    }

    return data;
};
