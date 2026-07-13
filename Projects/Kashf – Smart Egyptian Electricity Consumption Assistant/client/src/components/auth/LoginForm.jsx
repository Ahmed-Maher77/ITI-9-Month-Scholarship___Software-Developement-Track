import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import { useAuth } from "../../hooks/useAuth";
import { POST_REGISTER_REDIRECT_PATH } from "../../auth/authConstants";
import { verify2fa } from "../../services/securityService";
import { loginSchema } from "../../schemas/authSchemas";
import PasswordInput from "./PasswordInput";
import {
    authErrorClassName,
    authInputClassName,
    authLabelClassName,
} from "./authStyles";

const resolvePostAuthPath = (from) => {
    if (!from || from === "/register") {
        return POST_REGISTER_REDIRECT_PATH;
    }
    return from;
};

const LoginForm = () => {
    const { t: translate } = useTranslation();
    const t = (key, options) => {
        if (key && key.startsWith("security.")) {
            return translate("profile." + key, options);
        }
        return translate(key, options);
    };
    const loginMutation = useLogin();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // 2FA States
    const [show2fa, setShow2fa] = useState(false);
    const [tempToken, setTempToken] = useState("");
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");
    const [verifyPending, setVerifyPending] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = (values) => {
        loginMutation.mutate(values, {
            onSuccess: (response) => {
                if (response?.data?.twoFactorRequired) {
                    setTempToken(response.data.tempToken);
                    setShow2fa(true);
                }
            },
            onError: (error) => {
                if (error.details?.length) {
                    error.details.forEach((detail) => {
                        if (detail.field === "email" || detail.field === "password") {
                            setError(detail.field, { message: detail.message });
                        }
                    });
                    return;
                }

                setError("root", {
                    message: error.message || t("auth.loginGenericError"),
                });
            },
        });
    };

    const handleVerify2fa = async (e) => {
        e.preventDefault();
        setCodeError("");
        if (!code || code.length !== 6) {
            setCodeError(t("security.twoFactorModal.enterCode") || "Please enter a valid 6-digit code.");
            return;
        }

        setVerifyPending(true);
        try {
            const result = await verify2fa(code, tempToken);
            const accessToken = result?.data?.accessToken;
            const role = result?.data?.user?.role ?? "user";

            if (!accessToken) {
                throw new Error("missing_token");
            }

            login({ accessToken, role, user: result?.data?.user });
            navigate(resolvePostAuthPath(location.state?.from), {
                replace: true,
            });
        } catch (error) {
            setCodeError(error.message || t("security.twoFactorModal.enterCode") || "Invalid 2FA code.");
        } finally {
            setVerifyPending(false);
        }
    };

    if (show2fa) {
        return (
            <form onSubmit={handleVerify2fa} className="space-y-6">
                <div>
                    <label htmlFor="code" className={authLabelClassName}>
                        {t("security.twoFactorModal.enterCode") || "Enter 6-Digit Verification Code"}
                    </label>
                    <input
                        id="code"
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        className={authInputClassName}
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                        disabled={verifyPending}
                        autoFocus
                    />
                    {codeError && (
                        <p className={authErrorClassName}>{codeError}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={verifyPending}
                    className="w-full rounded-md bg-kashf-blue py-2.5 text-sm font-semibold text-kashf-bg transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    {verifyPending ? t("auth.loginSubmitting") || "Verifying..." : t("security.actions.enable") || "Verify"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setShow2fa(false);
                        setCode("");
                        setCodeError("");
                    }}
                    className="w-full text-center text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                    {t("security.actions.cancel") || "Cancel"}
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="email" className={authLabelClassName}>
                    {t("register.email")}
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    className={authInputClassName}
                    {...register("email")}
                />
                {errors.email && (
                    <p className={authErrorClassName}>{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className={authLabelClassName}>
                    {t("register.password")}
                </label>
                <PasswordInput
                    id="password"
                    placeholder={t("auth.passwordPlaceholder")}
                    disabled={loginMutation.isPending}
                    {...register("password")}
                />
                {errors.password && (
                    <p className={authErrorClassName}>{errors.password.message}</p>
                )}
            </div>

            {errors.root && (
                <p className="text-sm text-red-400" role="alert">
                    {errors.root.message}
                </p>
            )}

            <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full rounded-md bg-kashf-blue py-2.5 text-sm font-semibold text-kashf-bg transition-opacity hover:opacity-90 disabled:opacity-60"
            >
                {loginMutation.isPending
                    ? t("auth.loginSubmitting")
                    : t("auth.loginSubmit")}
            </button>
        </form>
    );
};

export default LoginForm;
