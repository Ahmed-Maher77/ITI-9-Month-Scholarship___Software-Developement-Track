import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants as itemVariants, containerVariants } from "../../utils/animations";
import { NavLink } from "react-router-dom";

const stats = [
    { numKey: "cta.stat1.num", numDefault: "2,400+", labelKey: "cta.stat1.label", labelDefault: "Egyptian Households" },
    { numKey: "cta.stat2.num", numDefault: "380 EGP", labelKey: "cta.stat2.label", labelDefault: "Avg. Monthly Savings" },
    { numKey: "cta.stat3.num", numDefault: "100%", labelKey: "cta.stat3.label", labelDefault: "Free During Beta" },
];

const CTASection = () => {
    const { t } = useTranslation();

    return (
        <motion.section 
            id="cta" 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="relative py-24 md:py-36 overflow-hidden border-t border-kashf-border"
        >
            {/* Deep radial glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-[700px] h-[400px] rounded-full bg-kashf-blue/8 blur-[100px]" />
            </div>

            {/* Subtle dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(0,212,212,0.8) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center gap-8">
                {/* Beta badge */}
                {/* <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {t("cta.badge", { defaultValue: "Free Beta Access — Limited Time" })}
                </span> */}

                {/* Headline */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-100 tracking-tight leading-tight line-height-15">
                        {t("cta.title", { defaultValue: "Take Control of Your" })}{" "}
                        <span className="block text-kashf-blue mt-1">
                            {t("cta.titleAccent", { defaultValue: "Electricity Bill" })}
                        </span>
                    </h2>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl">
                        {t("cta.desc", { defaultValue: "Join 2,400+ Egyptian households already using Kashf to monitor consumption, avoid tier jumps, and save hundreds of pounds every month." })}
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                    <NavLink to="/signup" className="group relative px-6 py-4 rounded-2xl bg-kashf-blue text-black font-extrabold text-base sm:text-lg overflow-hidden shadow-sm shadow-kashf-blue/30 hover:shadow-kashf-blue/50 transition-all duration-300 hover:scale-101 active:scale-100 cursor-pointer">
                        <span className="relative z-10">
                            {t("cta.button", { defaultValue: "Start Monitoring For Free" })}
                        </span>
                        {/* Shine sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    </NavLink>
                </motion.div>

                {/* Fine print */}
                <motion.div variants={itemVariants}>
                    <p className="text-neutral-600 text-sm">
                        {t("cta.finePrint", { defaultValue: "Safe Payment. No app store. Works on any device." })}
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default CTASection;
