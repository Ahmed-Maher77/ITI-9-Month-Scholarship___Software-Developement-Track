import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    loginUser,
    registerUser,
    saveStoredAuth,
} from "../../utils/authStorage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./Login.css";

function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const [error, setError] = useState("");

    const handleLoginSubmit = (loginData) => {
        setError("");
        const result = loginUser(loginData);
        if (!result.ok) {
            setError(result.message);
            return false;
        }

        const authPayload = {
            isLoggedIn: true,
            email: result.user.email,
            name: result.user.name,
            role: result.user.role,
            userPic: result.user.userPic || "",
        };
        saveStoredAuth(authPayload);
        toast.success(t("auth.loggedInSuccess"));
        setTimeout(() => {
            navigate(
                authPayload.role === "admin" ? "/admin/dashboard" : "/home",
                {
                    replace: true,
                },
            );
        }, 700);
        return true;
    };

    const handleRegisterSubmit = (registerData) => {
        setError("");

        const result = registerUser({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            role: registerData.role,
            userPic: registerData.userPic,
        });

        if (!result.ok) {
            setError(result.message);
            return false;
        }

        const authPayload = {
            isLoggedIn: true,
            email: result.user.email,
            name: result.user.name,
            role: result.user.role,
            userPic: result.user.userPic || "",
        };
        saveStoredAuth(authPayload);
        toast.success(t("auth.accountCreatedSuccess"));
        setTimeout(() => {
            navigate(
                authPayload.role === "admin" ? "/admin/dashboard" : "/home",
                {
                    replace: true,
                },
            );
        }, 700);
        return true;
    };

    return (
        <section className="LoginPage gray-bg d-flex min-vh-100 align-items-center justify-content-center p-4">
            <div className="auth-stack w-100">
                <div className="auth-header mb-3">
                    <p className="auth-kicker mb-1">{t("auth.headerKicker")}</p>
                    <h2 className="auth-system-title mb-0 lobster-font">
                        {t("common.brandName")}
                    </h2>
                </div>
                <div className="auth-card w-100">
                    <div className="auth-toggle mb-3">
                        <button
                            type="button"
                            className={`auth-toggle-btn ${mode === "login" ? "active" : ""}`}
                            onClick={() => {
                                setError("");
                                setMode("login");
                            }}
                        >
                            {t("auth.loginTab")}
                        </button>
                        <button
                            type="button"
                            className={`auth-toggle-btn ${mode === "register" ? "active" : ""}`}
                            onClick={() => {
                                setError("");
                                setMode("register");
                            }}
                        >
                            {t("auth.registerTab")}
                        </button>
                    </div>

                    {error ? (
                        <div className="alert alert-danger py-2" role="alert">
                            {t(error, { defaultValue: error })}
                        </div>
                    ) : null}

                    <div className="auth-forms-slider">
                        {mode === "login" ? (
                            <LoginForm onSubmit={handleLoginSubmit} />
                        ) : (
                            <RegisterForm onSubmit={handleRegisterSubmit} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
