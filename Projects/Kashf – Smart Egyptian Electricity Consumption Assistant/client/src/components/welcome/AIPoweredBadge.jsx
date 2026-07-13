import { useTranslation } from "react-i18next";

const AIPoweredBadge = () => {
    const { t } = useTranslation();
    return (
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-kashf-border bg-kashf-surface/60 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider rtl:tracking-normal text-kashf-light-blue shadow-sm">
            <svg
                className="size-3.5 text-kashf-light-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
            <span>{t("welcome.aiPoweredBadge")}</span>
        </div>
    );
};

export default AIPoweredBadge;
