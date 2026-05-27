import { z } from "zod";

export const registerDefaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
};

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Full name is required.")
            .min(3, "Full name must be at least 3 characters."),
        email: z
            .string()
            .trim()
            .min(1, "Email is required.")
            .email("Please enter a valid email."),
        password: z
            .string()
            .trim()
            .min(1, "Password is required.")
            .min(6, "Password must be at least 6 characters."),
        confirmPassword: z
            .string()
            .trim()
            .min(1, "Please confirm your password."),
        role: z.enum(["user", "admin"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });
