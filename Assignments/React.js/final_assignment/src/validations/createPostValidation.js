import { z } from "zod";

export const DESCRIPTION_MAX_LENGTH = 180;
export const TITLE_MIN_LENGTH = 5;
export const CATEGORY_MIN_LENGTH = 3;
export const DESCRIPTION_MIN_LENGTH = 15;
export const CONTENT_MIN_LENGTH = 30;

const HTTP_IMAGE_URL_REGEX = /^https?:\/\/.+$/i;

export const createPostDefaultValues = () => ({
    title: "",
    author: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    image: "",
    description: "",
    content: "",
    views: 0,
    likes: 0,
    dislikes: 0,
    comments: 0,
});

export const createPostSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "validation.titleRequired")
        .min(TITLE_MIN_LENGTH, "validation.titleMin"),
    author: z.string().trim().min(1, "validation.authorRequired"),
    category: z
        .string()
        .trim()
        .min(1, "validation.categoryRequired")
        .min(CATEGORY_MIN_LENGTH, "validation.categoryMin"),
    date: z.string().min(1),
    image: z
        .string()
        .trim()
        .min(1, "validation.imageRequired")
        .regex(HTTP_IMAGE_URL_REGEX, "validation.imageHttp"),
    description: z
        .string()
        .trim()
        .min(1, "validation.descriptionRequired")
        .min(DESCRIPTION_MIN_LENGTH, "validation.descriptionMin")
        .max(DESCRIPTION_MAX_LENGTH, "validation.descriptionMax"),
    content: z
        .string()
        .trim()
        .min(1, "validation.contentRequired")
        .min(CONTENT_MIN_LENGTH, "validation.contentMin"),
    views: z.number(),
    likes: z.number(),
    dislikes: z.number(),
    comments: z.number(),
});
