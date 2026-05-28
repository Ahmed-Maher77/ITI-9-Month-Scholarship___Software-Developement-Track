import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./translation";

const savedLanguage =
    typeof window !== "undefined"
        ? window.localStorage.getItem("tech_news_lang")
        : "en";

i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
