import MainButton from "../../../components/common/MainButton/MainButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    registerDefaultValues,
    registerSchema,
} from "../../../validations/registerValidation";

function RegisterForm({ onSubmit }) {
    const { t } = useTranslation();
    const [userPic, setUserPic] = useState("");
    const [imageError, setImageError] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: registerDefaultValues,
    });

    const handleRegisterImageChange = (event) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            setUserPic("");
            setImageError("");
            return;
        }

        if (!selectedFile.type.startsWith("image/")) {
            setImageError("auth.imageInvalid");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setUserPic(typeof reader.result === "string" ? reader.result : "");
            setImageError("");
        };
        reader.readAsDataURL(selectedFile);
    };

    const submitHandler = (values) => {
        const isSuccess = onSubmit({
            ...values,
            userPic,
        });
        if (!isSuccess) return;
        reset();
        setUserPic("");
        setImageError("");
    };

    return (
        <form
            key="register-form"
            className="auth-form auth-form-panel auth-form-panel--register"
            onSubmit={handleSubmit(submitHandler)}
            autoComplete="off"
            noValidate
        >
            <h1 className="h4 mb-3 text-center">{t("auth.createAccount")}</h1>
            <div className="auth-avatar-field mb-4">
                <input
                    type="file"
                    className="auth-avatar-file-input"
                    id="register-user-pic"
                    accept="image/*"
                    onChange={handleRegisterImageChange}
                />
                <label
                    htmlFor="register-user-pic"
                    className="auth-avatar-label"
                >
                    {userPic ? (
                        <img src={userPic} alt="" />
                    ) : (
                        <span className="auth-avatar-placeholder" aria-hidden>
                            <i className="fa-regular fa-user" />
                        </span>
                    )}
                </label>
                <p className="auth-avatar-caption mb-0">
                    <strong>{t("auth.profilePhoto")}</strong> —{" "}
                    {t("auth.profilePhotoHint")}
                </p>
                {imageError ? (
                    <div className="auth-field-error text-center">
                        {t(imageError)}
                    </div>
                ) : null}
            </div>
            <div className="mb-3">
                <label htmlFor="register-name" className="form-label">
                    {t("auth.fullName")}
                </label>
                <input
                    type="text"
                    className={`form-control app-form-control ${errors.name ? "is-invalid" : ""}`}
                    id="register-name"
                    name="register_name"
                    autoComplete="off"
                    placeholder={t("auth.enterFullName")}
                    {...register("name")}
                />
                {errors.name ? (
                    <div className="auth-field-error">
                        {t(errors.name.message)}
                    </div>
                ) : null}
            </div>
            <div className="mb-3">
                <label htmlFor="register-email" className="form-label">
                    {t("auth.email")}
                </label>
                <input
                    type="email"
                    className={`form-control app-form-control ${errors.email ? "is-invalid" : ""}`}
                    id="register-email"
                    name="register_email"
                    autoComplete="off"
                    placeholder={t("auth.enterEmail")}
                    {...register("email")}
                />
                {errors.email ? (
                    <div className="auth-field-error">
                        {t(errors.email.message)}
                    </div>
                ) : null}
            </div>
            <div className="mb-3">
                <label htmlFor="register-password" className="form-label">
                    {t("auth.password")}
                </label>
                <input
                    type="password"
                    className={`form-control app-form-control ${errors.password ? "is-invalid" : ""}`}
                    id="register-password"
                    name="register_password"
                    autoComplete="new-password"
                    placeholder={t("auth.createPassword")}
                    {...register("password")}
                />
                {errors.password ? (
                    <div className="auth-field-error">
                        {t(errors.password.message)}
                    </div>
                ) : null}
            </div>
            <div className="mb-3">
                <label
                    htmlFor="register-confirm-password"
                    className="form-label"
                >
                    {t("auth.confirmPassword")}
                </label>
                <input
                    type="password"
                    className={`form-control app-form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    id="register-confirm-password"
                    name="register_confirm_password"
                    autoComplete="new-password"
                    placeholder={t("auth.confirmPasswordPlaceholder")}
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword ? (
                    <div className="auth-field-error">
                        {t(errors.confirmPassword.message)}
                    </div>
                ) : null}
            </div>
            <div className="mb-3">
                <label htmlFor="register-role" className="form-label">
                    {t("auth.role")}
                </label>
                <select
                    id="register-role"
                    className="form-select app-form-control"
                    {...register("role")}
                >
                    <option value="user">{t("auth.userRole")}</option>
                    <option value="admin">{t("auth.adminRole")}</option>
                </select>
            </div>
            <MainButton
                type="submit"
                className="auth-submit-btn mt-2"
                fullWidth
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? t("auth.registerSubmitting")
                    : t("auth.registerSubmit")}
            </MainButton>
        </form>
    );
}

export default RegisterForm;
