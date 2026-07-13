import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar.json";
import en from "./locales/en.json";

export const DEFAULT_LANGUAGE = "ar";
export const SUPPORTED_LANGUAGES = ["ar", "en"];

const STORAGE_KEY = "kashf_language";

const getStoredLanguage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
    } catch {
        return DEFAULT_LANGUAGE;
    }
};

const applyDocumentLanguage = (language) => {
    const lng = language?.split("-")[0] ?? DEFAULT_LANGUAGE;
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
};

i18n.use(initReactI18next).init({
    resources: {
        ar: { translation: ar },
        en: { translation: en },
    },
    lng: getStoredLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {
        escapeValue: false,
    },
});

applyDocumentLanguage(i18n.language);
i18n.on("languageChanged", applyDocumentLanguage);

export const changeLanguage = async (language) => {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, language);
    } catch {
        // Ignore storage failures (private browsing, etc.)
    }

    await i18n.changeLanguage(language);
};

export default i18n;
