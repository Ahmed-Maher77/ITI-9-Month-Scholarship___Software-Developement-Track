import { useTranslation } from "react-i18next";
import "../ThemeToggleButton/ThemeToggleButton.css";

function LanguageSwitcher({ compact = false }) {
    const { i18n, t } = useTranslation();
    const isArabic = i18n.language === "ar";

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        window.localStorage.setItem("tech_news_lang", lng);
    };

    if (compact) {
        return (
            <button
                type="button"
                className="theme-toggle-btn compact"
                onClick={() => handleChangeLanguage(isArabic ? "en" : "ar")}
                title={isArabic ? t("language.english") : t("language.arabic")}
                aria-label={
                    isArabic ? t("language.english") : t("language.arabic")
                }
            >
                <i className="fa-solid fa-language" aria-hidden="true"></i>
            </button>
        );
    }

    return (
        <div
            className="theme-tabs"
            role="tablist"
            aria-label={t("language.tablistAria")}
        >
            <button
                type="button"
                role="tab"
                aria-selected={i18n.language === "en"}
                className={`theme-tab ${i18n.language === "en" ? "active" : ""}`}
                onClick={() => handleChangeLanguage("en")}
                title={t("language.english")}
            >
                <i className="fa-solid fa-language" aria-hidden="true"></i>
                <span>EN</span>
            </button>
            <button
                type="button"
                role="tab"
                aria-selected={i18n.language === "ar"}
                className={`theme-tab ${i18n.language === "ar" ? "active" : ""}`}
                onClick={() => handleChangeLanguage("ar")}
                title={t("language.arabic")}
            >
                <i className="fa-solid fa-language" aria-hidden="true"></i>
                <span>AR</span>
            </button>
        </div>
    );
}

export default LanguageSwitcher;
