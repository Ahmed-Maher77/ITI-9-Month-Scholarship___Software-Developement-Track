import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRegister } from "../../hooks/auth/useRegister";
import { registerSchema } from "../../schemas/authSchemas";
import PasswordInput from "./PasswordInput";
import ProfilePictureUpload from "./ProfilePictureUpload";
import {
    authErrorClassName,
    authInputClassName,
    authLabelClassName,
} from "./authStyles";

const RegisterForm = () => {
    const { t } = useTranslation();
    const registerMutation = useRegister();

    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            repassword: "",
            picture: null,
        },
    });

    const onSubmit = (values) => {
        registerMutation.mutate(values, {
            onError: (error) => {
                if (error.details?.length) {
                    error.details.forEach((detail) => {
                        const field = detail.field;
                        if (
                            field === "username" ||
                            field === "email" ||
                            field === "password" ||
                            field === "repassword"
                        ) {
                            setError(field, { message: detail.message });
                        }
                    });
                    return;
                }

                setError("root", {
                    message: error.message || t("register.genericError"),
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ========== profile picture input ========== */}
            <Controller
                name="picture"
                control={control}
                render={({ field }) => (
                    <ProfilePictureUpload
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.picture?.message}
                    />
                )}
            />

            {/* ========== username input ========== */}
            <div>
                <label htmlFor="username" className={authLabelClassName}>
                    {t("register.username")}
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder={t("register.usernamePlaceholder")}
                    className={authInputClassName}
                    {...register("username")}
                />
                {errors.username && (
                    <p className={authErrorClassName}>{errors.username.message}</p>
                )}
            </div>

            {/* ========== email input ========== */}
            <div>
                <label htmlFor="register-email" className={authLabelClassName}>
                    {t("register.email")}
                </label>
                <input
                    id="register-email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    className={authInputClassName}
                    {...register("email")}
                />
                {errors.email && (
                    <p className={authErrorClassName}>{errors.email.message}</p>
                )}
            </div>

            {/* ========== password input ========== */}
            <div>
                <label htmlFor="register-password" className={authLabelClassName}>
                    {t("register.password")}
                </label>
                <PasswordInput
                    id="register-password"
                    placeholder={t("auth.passwordPlaceholder")}
                    disabled={registerMutation.isPending}
                    {...register("password")}
                />
                {errors.password && (
                    <p className={authErrorClassName}>{errors.password.message}</p>
                )}
            </div>

            {/* ========== confirm password input ========== */}
            <div>
                <label htmlFor="repassword" className={authLabelClassName}>
                    {t("register.repassword")}
                </label>
                <PasswordInput
                    id="repassword"
                    placeholder={t("register.repasswordPlaceholder")}
                    disabled={registerMutation.isPending}
                    {...register("repassword")}
                />
                {errors.repassword && (
                    <p className={authErrorClassName}>
                        {errors.repassword.message === "password_mismatch"
                            ? t("register.passwordMismatch")
                            : errors.repassword.message}
                    </p>
                )}
            </div>

            {errors.root && (
                <p className="text-sm text-red-400" role="alert">
                    {errors.root.message}
                </p>
            )}

            {/* ========== submit button ========== */}
            <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full rounded-md bg-kashf-blue py-2.5 text-sm font-semibold text-kashf-bg transition-opacity hover:opacity-90 disabled:opacity-60 mt-4"
            >
                {registerMutation.isPending
                    ? t("register.submitting")
                    : t("register.submit")}
            </button>
        </form>
    );
};

export default RegisterForm;
