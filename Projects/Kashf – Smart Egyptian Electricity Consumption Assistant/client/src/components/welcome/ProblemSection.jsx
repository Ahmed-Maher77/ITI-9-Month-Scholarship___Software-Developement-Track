import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../utils/animations";
import SectionBadge from "./ui/SectionBadge";
import SectionHeading from "./ui/SectionHeading";


const ComparisonCard = ({ borderColor, bgColor, emoji, title, items, checkIcon, checkColor, billLabel, billNote, billNoteColor, amount, amountColor }) => (
    <div className={`rounded-2xl border ${borderColor} ${bgColor} p-6 sm:p-8 flex flex-col gap-6`}>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl">{emoji}</div>
            <h3 className="text-neutral-100 font-bold text-lg">{title}</h3>
        </div>

        <ul className="flex flex-col gap-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
                    <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${checkColor} font-bold`}>
                        {checkIcon}
                    </span>
                    {item}
                </li>
            ))}
        </ul>

        <div className="mt-auto px-5 py-4 flex items-center justify-between gap-4">
            <div>
                <p className="text-neutral-400 text-sm">{billLabel}</p>
                <p className={`text-xs ${billNoteColor} mt-1`}>{billNote}</p>
            </div>
            <span className={`text-2xl font-extrabold ${amountColor} shrink-0`}>{amount}</span>
        </div>
    </div>
);


const TheProblemSection = () => {
    const { t, i18n } = useTranslation();
    const isReady = i18n?.isInitialized && typeof t === 'function';

    if (!isReady) {
        return <div className="h-[400px] animate-pulse bg-neutral-900/50 rounded-xl" />;
    }

    const withoutItems = [
        t("problem.without.1", { defaultValue: "Electricity bill arrives — 847 EGP instead of expected 350 EGP" }),
        t("problem.without.2", { defaultValue: "You crossed into Tier 5 mid-month without any warning" }),
        t("problem.without.3", { defaultValue: "AC, water heater, and appliances all running simultaneously" }),
        t("problem.without.4", { defaultValue: "No visibility into daily kWh, no forecast, no escape route" }),
    ];

    const withItems = [
        t("problem.with.1", { defaultValue: "Real-time Sheriha tracker shows you're at 287 kWh, 63 away from Tier 5" }),
        t("problem.with.2", { defaultValue: "48-hour forecast: \"You'll cross at this rate in 2.5 days\"" }),
        t("problem.with.3", { defaultValue: "AI sends push notification: reduce AC by 1.5 hours for 3 days" }),
        t("problem.with.4", { defaultValue: "End-month bill: 412 EGP instead of 847 EGP — you saved 435 EGP" }),
    ];

    const billLabel = t("problem.billLabel", { defaultValue: "Electricity Bill — June 2026" });

    return (
        <section 
            id="problem" 
            className="relative py-20 md:py-28 overflow-hidden border-t border-kashf-border"
        >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-kashf-blue/5 blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                <SectionHeading
                    align="center"
                    badge={
                        <SectionBadge>
                            {t("problem.badge", { defaultValue: "The Problem" })}
                        </SectionBadge>
                    }
                    title={t("problem.title", { defaultValue: "Why Egyptians dread" })}
                    accent={t("problem.titleAccent", { defaultValue: "electricity bills" })}
                    subtitle={t("problem.subtitle", { defaultValue: "One missed tier crossing costs hundreds. Kashf makes sure it never happens." })}
                    className="mb-14"
                    baseDelay={0}
                />

                {/* Before / After grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <motion.div variants={fadeUpVariants} custom={0} className="h-full">
                        <ComparisonCard
                            borderColor="border-red-500/20"
                            bgColor="bg-red-500/5"
                            emoji="😱"
                            title={t("problem.without.title", { defaultValue: "Without Kashf" })}
                            items={withoutItems}
                            checkIcon="✕"
                            checkColor="text-red-400"
                            billLabel={billLabel}
                            billNote={`⚠ ${t("problem.without.billNote", { defaultValue: "Tier 5 applied — 0.72 EGP/kWh on last 300 kWh" })}`}
                            billNoteColor="text-red-400"
                            amount="847 EGP"
                            amountColor="text-red-400"
                        />
                    </motion.div>
                    <motion.div variants={fadeUpVariants} custom={1} className="h-full">
                        <ComparisonCard
                            borderColor="border-emerald-500/20"
                            bgColor="bg-emerald-500/5"
                            emoji="✨"
                            title={t("problem.with.title", { defaultValue: "With Kashf" })}
                            items={withItems}
                            checkIcon="✓"
                            checkColor="text-emerald-400"
                            billLabel={billLabel}
                            billNote={`✓ ${t("problem.with.billNote", { defaultValue: "Stayed in Tier 3 — saved 435 EGP this month" })}`}
                            billNoteColor="text-emerald-400"
                            amount="412 EGP"
                            amountColor="text-emerald-400"
                        />
                    </motion.div>
                </motion.div>

                {/* Savings banner */}
                <motion.div 
                    variants={fadeUpVariants} 
                    custom={2} 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="mt-12 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left"
                >
                    <span className="text-3xl">💡</span>
                    <p className="text-neutral-300 text-sm sm:text-base">
                        {t("problem.banner", { defaultValue: "The average Kashf user saves" })}{" "}
                        <span className="text-kashf-blue font-bold">
                            {t("problem.bannerAmount", { defaultValue: "380 EGP per month" })}
                        </span>{" "}
                        {t("problem.bannerSuffix", { defaultValue: "by staying ahead of tier thresholds." })}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TheProblemSection;
