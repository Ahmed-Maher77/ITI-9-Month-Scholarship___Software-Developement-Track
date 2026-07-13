import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../utils/animations";
import SectionBadge from "./ui/SectionBadge";
import SectionHeading from "./ui/SectionHeading";
import KashfCard from "./ui/KashfCard";

const STEP_ICONS = [
    <svg key="scan" className="size-6 text-kashf-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    <svg key="analyze" className="size-6 text-kashf-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
    <svg key="track" className="size-6 text-kashf-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
    <svg key="save" className="size-6 text-kashf-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
];

const STEP_KEYS = ["scan", "analyze", "track", "save"];

const HowItWorksSection = () => {
    const { t } = useTranslation();

    return (
        <section 
            id="how-it-works" 
            className="scroll-mt-24 py-16 md:py-24 border-t border-kashf-border overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <SectionHeading
                    align="center"
                    badge={<SectionBadge>{t("howItWorks.badge")}</SectionBadge>}
                    title={t("howItWorks.title")}
                    accent={t("howItWorks.titleAccent")}
                    subtitle={t("howItWorks.subtitle")}
                    className="mb-16"
                    baseDelay={0}
                />

                {/* Steps grid */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {STEP_KEYS.map((key, index) => (
                        <motion.div key={key} variants={fadeUpVariants} custom={index} className="h-full">
                            <KashfCard className="gap-4 h-full relative">
                                {/* Icon + step number row */}
                                <div className="flex items-center gap-3">
                                    <span className="flex size-10 items-center justify-center rounded-xl bg-kashf-blue/10 border border-kashf-blue/20 transition-all duration-500 group-hover:scale-110 shrink-0">
                                        {STEP_ICONS[index]}
                                    </span>
                                    <span className="text-3xl font-extrabold text-neutral-700 select-none">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <h3 className="relative z-10 text-base font-semibold text-neutral-100 mt-1 transition-colors duration-300 group-hover:text-kashf-light-blue">
                                    {t(`howItWorks.steps.${key}.title`)}
                                </h3>
                                <p className="relative z-10 text-sm text-neutral-500 leading-relaxed mt-auto transition-colors duration-300 group-hover:text-neutral-300">
                                    {t(`howItWorks.steps.${key}.desc`)}
                                </p>

                                {/* Connector chevron (desktop only, hidden on last) */}
                                {index < STEP_KEYS.length - 1 && (
                                    <span
                                        aria-hidden
                                        className="hidden lg:flex absolute -end-3.5 top-1/2 -translate-y-1/2 z-10 size-7 items-center justify-center rounded-full bg-kashf-surface border border-neutral-800 text-neutral-600"
                                    >
                                        <svg className="size-3.5 rtl:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </KashfCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
