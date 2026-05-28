import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectTheme, setTheme, toggleTheme } from "../../../store/uiSlice";
import "./ThemeToggleButton.css";

function ThemeToggleButton({ compact = false, variant = "chip", label = "" }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const isDark = theme === "dark";
    const isSwitch = variant === "switch";

    const nextModeKey = isDark ? "light" : "dark";
    const switchAria = isDark
        ? t("theme.switchToLight")
        : t("theme.switchToDark");
    const switchTitle = isDark
        ? t("theme.switchToLightMode")
        : t("theme.switchToDarkMode");

    return (
        <div className={`theme-toggle-wrap${isSwitch ? " is-switch" : ""}`}>
            {label ? <span className="theme-toggle-label">{label}</span> : null}
            {isSwitch ? (
                compact ? (
                    <button
                        type="button"
                        className="theme-toggle-btn compact"
                        onClick={() => dispatch(toggleTheme())}
                        aria-label={switchAria}
                        title={switchTitle}
                        aria-pressed={isDark}
                    >
                        <i
                            className={`fa-solid ${isDark ? "fa-moon" : "fa-sun"}`}
                        ></i>
                    </button>
                ) : (
                    <div
                        className="theme-tabs"
                        role="tablist"
                        aria-label={t("theme.tablistAria")}
                    >
                        <button
                            type="button"
                            role="tab"
                            aria-selected={!isDark}
                            className={`theme-tab ${!isDark ? "active" : ""}`}
                            onClick={() => dispatch(setTheme("light"))}
                            title={t("theme.lightTitle")}
                        >
                            <i className="fa-solid fa-sun"></i>
                            <span>{t("theme.light")}</span>
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={isDark}
                            className={`theme-tab ${isDark ? "active" : ""}`}
                            onClick={() => dispatch(setTheme("dark"))}
                            title={t("theme.darkTitle")}
                        >
                            <i className="fa-solid fa-moon"></i>
                            <span>{t("theme.dark")}</span>
                        </button>
                    </div>
                )
            ) : (
                <button
                    type="button"
                    className={`theme-toggle-btn${compact ? " compact" : ""}`}
                    onClick={() => dispatch(toggleTheme())}
                    aria-label={switchAria}
                    title={switchTitle}
                    aria-pressed={isDark}
                >
                    <>
                        <i
                            className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`}
                        ></i>
                        {!compact ? (
                            <span>{t(`theme.${nextModeKey}`)}</span>
                        ) : null}
                    </>
                </button>
            )}
        </div>
    );
}

export default ThemeToggleButton;
