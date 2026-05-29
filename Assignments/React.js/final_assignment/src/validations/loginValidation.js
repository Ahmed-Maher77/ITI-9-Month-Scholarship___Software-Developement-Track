import { z } from "zod";

export const loginDefaultValues = {
    email: "",
    password: "",
};

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "validation.emailRequired")
        .email("validation.emailInvalid"),
    password: z
        .string()
        .min(1, "validation.passwordRequired")
        .refine(
            (value) => value.trim().length > 0,
            "validation.passwordRequired",
        ),
});
