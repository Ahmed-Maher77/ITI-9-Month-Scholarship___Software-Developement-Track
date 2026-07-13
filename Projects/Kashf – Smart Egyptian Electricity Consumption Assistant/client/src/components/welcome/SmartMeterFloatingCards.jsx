import { useTranslation } from "react-i18next";

const SmartMeterFloatingCards = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className="absolute top-[--spacing(-13)] -left-12 z-30 w-53 p-3.5 rounded-xl border border-kashf-border bg-[#0d0d12]/80 backdrop-blur-md shadow-xl flex items-center gap-3 animate-float-1 select-none text-start max-sm:hidden">
                <div className="size-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <svg
                        className="size-4 text-amber-400 animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <div className="min-w-0">
                    <p className="m-0 text-xs text-neutral-400 leading-normal">
                        {t("welcome.card1Title", { defaultValue: "Consumption Warning" })}
                    </p>
                    <p className="m-0 text-sm font-bold text-neutral-100 leading-normal">
                        {t("welcome.card1Value", { defaultValue: "40 kWh Remaining" })}
                    </p>
                </div>
            </div>

            <div className="absolute -bottom-16 right-24 z-30 w-48 p-3.5 rounded-xl border border-kashf-border bg-[#0d0d12]/80 backdrop-blur-md shadow-xl flex items-center gap-3 animate-float-2 select-none text-start max-sm:hidden">
                <div className="size-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-emerald-400">EGP</span>
                </div>
                <div className="min-w-0">
                    <p className="m-0 text-xs text-neutral-400 leading-normal">
                        {t("welcome.card2Title", { defaultValue: "Estimated Bill" })}
                    </p>
                    <p className="m-0 text-sm font-bold text-neutral-100 leading-normal">
                        {t("welcome.card2Value", { defaultValue: "EGP 412" })}
                    </p>
                </div>
            </div>

            <div className="absolute top-[--spacing(-15)] -right-16 z-30 w-56 p-3.5 rounded-xl border border-kashf-border bg-[#0d0d12]/80 backdrop-blur-md shadow-xl flex gap-3 animate-float-3 select-none text-start max-sm:hidden">
                <div className="size-8 rounded-full bg-kashf-blue/10 border border-kashf-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                        className="size-4 text-kashf-light-blue"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                </div>
                <div className="min-w-0">
                    <p className="m-0 text-xs text-kashf-light-blue font-bold tracking-wider uppercase mb-1">
                        {t("welcome.card3Title", { defaultValue: "AI INSIGHT" })}
                    </p>
                    <p className="m-0 text-xs text-neutral-300 leading-snug">
                        {t("welcome.card3Value", { defaultValue: "Reduce water heater usage today." })}
                    </p>
                </div>
            </div>
        </>
    );
};

export default SmartMeterFloatingCards;