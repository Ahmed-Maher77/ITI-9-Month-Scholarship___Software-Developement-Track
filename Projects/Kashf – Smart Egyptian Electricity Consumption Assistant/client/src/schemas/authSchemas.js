import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3)
            .max(200)
            .regex(/^[a-zA-Z0-9-]+( [a-zA-Z0-9-]+)?$/),
        email: z.string().email(),
        password: z.string().min(6).max(100),
        repassword: z.string().min(6).max(100),
        picture: z.instanceof(File).optional().nullable(),
    })
    .refine((data) => data.password === data.repassword, {
        message: "password_mismatch",
        path: ["repassword"],
    });
