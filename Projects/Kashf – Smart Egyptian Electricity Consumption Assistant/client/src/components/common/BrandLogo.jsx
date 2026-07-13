import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logoAr from "../../assets/images/logo-ar.png";
import logoEn from "../../assets/images/logo-en.png";

const BRAND_LOGOS = {
    ar: logoAr,
    en: logoEn,
};

const BrandLogo = ({ to = "/", className = "", ...props }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.resolvedLanguage?.split("-")[0] ?? "ar";
    const logo = BRAND_LOGOS[currentLanguage] ?? BRAND_LOGOS.ar;
    const isEnglish = currentLanguage === "en";

    return (
        <Link
            to={to}
            className={`inline-flex shrink-0 items-center no-underline ${className}`.trim()}
            {...props}
        >
            <img
                src={logo}
                alt={t("common.brand")}
                className={`h-8 w-auto origin-left transition-transform ${
                    isEnglish ? "scale-[1.3]" : ""
                }`}
            />
        </Link>
    );
};

export default BrandLogo;
