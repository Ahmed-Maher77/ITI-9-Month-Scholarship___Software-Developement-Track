import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroCTAs = ({ onOpenDemo }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 w-full px-4 sm:px-0">
            {/* ========= start saving button ======== */}
            <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-kashf-light-blue px-6 py-4 text-sm md:text-base font-semibold text-neutral-900 no-underline transition-all hover:opacity-95 hover:shadow-[0_0_24px_rgba(102,236,255,0.4)] cursor-pointer"
            >
                {t("welcome.startSaving")}
            </Link>

            {/* ======== demo button ======== */}
            <button
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg border border-kashf-border bg-neutral-900/40 px-6 py-3.5 text-sm md:text-base font-semibold text-neutral-300 transition-colors hover:bg-kashf-muted hover:text-neutral-100 cursor-pointer"
            >
                <span className="flex size-7 items-center justify-center rounded-full bg-neutral-800 text-neutral-100">
                    <svg
                        className="size-4 fill-current ml-0.5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </span>
                <span>{t("welcome.watchDemo")}</span>
            </button>
        </div>
    );
};

export default HeroCTAs;
