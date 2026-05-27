import { z } from "zod";

export const loginDefaultValues = {
    email: "",
    password: "",
};

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Please enter a valid email."),
    password: z
        .string()
        .trim()
        .min(1, "Password is required.")
});
