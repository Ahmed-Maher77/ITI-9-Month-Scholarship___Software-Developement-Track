import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import EyeIcon from "../icons/EyeIcon";
import EyeOffIcon from "../icons/EyeOffIcon";
import { authInputClassName } from "./authStyles";

const PasswordInput = forwardRef(
    ({ id, placeholder, className = "", disabled, ...rest }, ref) => {
        const { t } = useTranslation();
        const [visible, setVisible] = useState(false);

        return (
            <div className="relative">
                <input
                    id={id}
                    ref={ref}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${authInputClassName} pe-10 ${className}`.trim()}
                    {...rest}
                />
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setVisible((current) => !current)}
                    className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded border-none bg-transparent p-1 text-neutral-500 transition-colors hover:text-kashf-light-blue disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label={
                        visible ? t("auth.hidePassword") : t("auth.showPassword")
                    }
                >
                    {visible ? (
                        <EyeOffIcon className="size-5" />
                    ) : (
                        <EyeIcon className="size-5" />
                    )}
                </button>
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
