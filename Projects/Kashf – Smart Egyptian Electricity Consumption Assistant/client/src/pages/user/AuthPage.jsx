import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import AuthModeSwitch from "../../components/auth/AuthModeSwitch";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

const AUTH_MODES = {
    LOGIN: "login",
    REGISTER: "register",
};

const AuthPage = () => {
    const { t } = useTranslation();
    const [mode, setMode] = useState(AUTH_MODES.REGISTER);

    const isLogin = mode === AUTH_MODES.LOGIN;

    return (
        <>
            <Helmet>
                <title>{isLogin ? "تسجيل الدخول" : "إنشاء حساب"} — كشف</title>
                <meta name="description" content={isLogin ? "تسجيل الدخول إلى حسابك في كشف لمراقبة استهلاك الكهرباء." : "إنشاء حساب جديد في كشف وابدأ في مراقبة استهلاك الكهرباء الذكي."} />
            </Helmet>
            <main className="mx-auto max-w-lg px-6 py-12">
            <AnimatePresence mode="wait">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <h1 className="mb-2 text-2xl font-semibold text-neutral-100">
                        {isLogin ? t("auth.loginTitle") : t("register.title")}
                    </h1>
                    <p className="mb-12 text-neutral-400">
                        {isLogin ? t("auth.loginSubtitle") : t("register.subtitle")}
                    </p>

                    {isLogin ? <LoginForm /> : <RegisterForm />}
                </motion.div>
            </AnimatePresence>

            <AuthModeSwitch
                isLogin={isLogin}
                onSwitchToLogin={() => setMode(AUTH_MODES.LOGIN)}
                onSwitchToRegister={() => setMode(AUTH_MODES.REGISTER)}
            />

            <p className="mt-3 text-center text-sm text-neutral-500">
                <Link
                    to="/"
                    className="text-neutral-500 hover:text-kashf-light-blue hover:underline"
                >
                    {t("register.backHome")}
                </Link>
            </p>
        </main>
        </>
    );
};

export default AuthPage;
