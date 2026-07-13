import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage, SUPPORTED_LANGUAGES } from "../../i18n";
import GlobeIcon from "../icons/GlobeIcon";
import ChevronIcon from "../icons/ChevronIcon";

const LANGUAGE_ABBREV = {
    ar: "AR",
    en: "EN",
};

const LanguageSwitcher = ({ className = "", menuPlacement = "bottom" }) => {
    const { i18n, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const listboxId = useId();

    const currentLanguage =
        i18n.resolvedLanguage?.split("-")[0] ?? SUPPORTED_LANGUAGES[0];

    const handleChange = (language) => {
        if (language !== currentLanguage) {
            changeLanguage(language);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event) => {
            if (!containerRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const menuPositionClass =
        menuPlacement === "top"
            ? "bottom-[calc(100%+0.375rem)]"
            : "top-[calc(100%+0.375rem)]";

    return (
        <div ref={containerRef} className={`relative ${className}`.trim()}>
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={listboxId}
                aria-label={t("language.ariaLabel")}
                className="flex items-center gap-1.5 rounded-md border-none bg-transparent px-2.5 py-1.5 text-sm text-neutral-200 transition-colors hover:border-kashf-blue hover:text-kashf-light-blue cursor-pointer"
            >
                <GlobeIcon className="size-4 shrink-0 text-kashf-light-blue" />
                <span className="font-semibold tracking-wide">
                    {LANGUAGE_ABBREV[currentLanguage]}
                </span>
                <ChevronIcon
                    className={`size-3.5 shrink-0 text-neutral-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <ul
                    id={listboxId}
                    role="listbox"
                    aria-label={t("language.ariaLabel")}
                    className={`absolute end-0 z-50 min-w-36 overflow-hidden rounded-lg border border-kashf-border bg-kashf-surface py-1 shadow-[0_8px_24px_rgba(0,0,0,0.45)] ${menuPositionClass}`}
                >
                    {SUPPORTED_LANGUAGES.map((language) => {
                        const isActive = currentLanguage === language;

                        return (
                            <li key={language} role="presentation">
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={isActive}
                                    onClick={() => handleChange(language)}
                                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-start text-sm transition-colors ${
                                        isActive
                                            ? "bg-kashf-muted text-kashf-light-blue"
                                            : "text-neutral-300 hover:bg-kashf-muted hover:text-neutral-100"
                                    }`}
                                >
                                    <span className="w-7 font-semibold tracking-wide text-neutral-500">
                                        {LANGUAGE_ABBREV[language]}
                                    </span>
                                    <span>{t(`language.${language}`)}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;
