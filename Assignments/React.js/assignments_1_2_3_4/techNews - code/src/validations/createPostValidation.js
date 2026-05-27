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
        .min(1, "Title is required.")
        .min(
            TITLE_MIN_LENGTH,
            `Title must be at least ${TITLE_MIN_LENGTH} characters.`,
        ),
    author: z.string().trim().min(1, "Author is required."),
    category: z
        .string()
        .trim()
        .min(1, "Category is required.")
        .min(
            CATEGORY_MIN_LENGTH,
            `Category must be at least ${CATEGORY_MIN_LENGTH} characters.`,
        ),
    date: z.string().min(1),
    image: z
        .string()
        .trim()
        .min(1, "Image URL is required.")
        .regex(
            HTTP_IMAGE_URL_REGEX,
            "Image URL must start with http:// or https://",
        ),
    description: z
        .string()
        .trim()
        .min(1, "Description is required.")
        .min(
            DESCRIPTION_MIN_LENGTH,
            `Description must be at least ${DESCRIPTION_MIN_LENGTH} characters.`,
        )
        .max(
            DESCRIPTION_MAX_LENGTH,
            `Description must be at most ${DESCRIPTION_MAX_LENGTH} characters.`,
        ),
    content: z
        .string()
        .trim()
        .min(1, "Content is required.")
        .min(
            CONTENT_MIN_LENGTH,
            `Content must be at least ${CONTENT_MIN_LENGTH} characters.`,
        ),
    views: z.number(),
    likes: z.number(),
    dislikes: z.number(),
    comments: z.number(),
});
