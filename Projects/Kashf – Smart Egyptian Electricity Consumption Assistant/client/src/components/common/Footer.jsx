import { useTranslation } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-kashf-border px-6 py-4 text-sm">
            <div className="flex flex-col-reverse sm:flex-row-reverse sm:flex-wrap items-center justify-between gap-3 gap-y-6 max-sm:justify-center">
                {/* Left: Copyright */}
                <p className="text-neutral-500 text-xs">
                    &copy; {year}{" "}
                    <Link
                        to="https://www.linkedin.com/in/ahmed-maher-algohary/"
                        className="text-neutral-400 no-underline transition-colors hover:text-kashf-light-blue font-medium"
                    >
                        Kashf
                    </Link>
                    {" "}— {t("footer.rights", { defaultValue: "All rights reserved." })}
                </p>

                {/* Right: About + Language + Back to Top */}
                <div className="flex items-center gap-4">
                    <NavLink
                        to="/about"
                        className="text-neutral-500 no-underline transition-colors hover:text-kashf-light-blue"
                    >
                        {t("nav.about")}
                    </NavLink>
                    <button
                        onClick={() => {
                            const mainContent = document.getElementById('main-content');
                            if (mainContent) {
                                mainContent.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-kashf-surface text-kashf-light-blue text-xs font-medium transition-all duration-200 hover:bg-kashf-blue hover:text-kashf-bg cursor-pointer border border-kashf-border hover:border-kashf-blue hover:shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                        aria-label={t("footer.backToTop")}
                    >
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                        <span className="hidden sm:inline">{t("footer.backToTop")}</span>
                    </button>
                    <LanguageSwitcher menuPlacement="top" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
