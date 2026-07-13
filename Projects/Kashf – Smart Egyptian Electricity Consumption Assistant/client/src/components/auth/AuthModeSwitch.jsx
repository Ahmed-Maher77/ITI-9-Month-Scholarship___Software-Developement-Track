import { useTranslation } from "react-i18next";

const AuthModeSwitch = ({ isLogin, onSwitchToLogin, onSwitchToRegister }) => {
    const { t } = useTranslation();

    return (
        <p className="mt-8 text-center text-sm text-neutral-500">
            {isLogin ? t("auth.noAccount") : t("auth.alreadyHaveAccount")}{" "}
            <button
                type="button"
                onClick={isLogin ? onSwitchToRegister : onSwitchToLogin}
                className="cursor-pointer border-none bg-transparent p-0 font-medium text-kashf-light-blue hover:underline"
            >
                {isLogin ? t("auth.switchToRegister") : t("auth.switchToLogin")}
            </button>
        </p>
    );
};

export default AuthModeSwitch;
