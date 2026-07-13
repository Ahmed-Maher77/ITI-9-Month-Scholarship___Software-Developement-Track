import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUpVariants, containerVariants } from "../../utils/animations";
import { Zap } from "lucide-react";

const AboutHero = () => {
    const { t } = useTranslation();

    const scrollToNext = () => {
        const next = document.getElementById("about-story");
        if (next) {
            next.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-kashf-border text-center px-5 sm:px-8">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-[800px] h-[500px] rounded-full bg-kashf-blue/8 blur-[120px]" />
            </div>
            {/* Dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(0,212,212,0.8) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative max-w-4xl mx-auto flex flex-col items-center gap-7 py-24 md:py-32">
                {/* Heading */}
                <motion.h1 custom={0.1} variants={fadeUpVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight rtl:leading-[1.5] text-neutral-100">
                    {t("about.hero.title")}{" "}
                    <span className="text-kashf-blue">{t("about.hero.titleAccent")}</span>
                </motion.h1>

                {/* Description */}
                <motion.p custom={0.3} variants={fadeUpVariants} className="text-neutral-400 text-base  md:text-lg leading-[1.3] rtl:leading-relaxed max-w-2xl">
                    {t("about.hero.desc")}
                </motion.p>

                {/* CTA */}
                <motion.div custom={0.5} variants={fadeUpVariants}>
                    <Link
                        to="/register"
                        className="mt-2 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-kashf-blue text-black font-bold text-sm hover:brightness-110 transition-all duration-200 no-underline"
                    >
                        {t("about.cta.primary")}
                    </Link>
                </motion.div>

                {/* Animated scroll hint */}
                <motion.div custom={0.7} variants={fadeUpVariants} className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <button
                        onClick={scrollToNext}
                        aria-label="Scroll to next section"
                        className="flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent p-2 outline-none focus-visible:ring-2 focus-visible:ring-kashf-blue rounded-full"
                    >
                        <span className="text-neutral-600 text-xs select-none transition-colors group-hover:text-kashf-blue">
                            {t("about.hero.scrollHint")}
                        </span>
                        <span
                            className="relative flex items-start justify-center w-5 h-8 rounded-full border-2 border-neutral-600 transition-all duration-300 group-hover:border-kashf-blue/70 group-hover:shadow-[0_0_14px_rgba(6,182,212,0.35)]"
                            aria-hidden="true"
                        >
                            <span
                                className="absolute left-1/2 w-1 h-2 rounded-full bg-kashf-blue transition-colors duration-300 -translate-x-1/2"
                                style={{ animation: "scrollDotTravel 2s ease-in-out infinite" }}
                            />
                        </span>
                    </button>
                </motion.div>

                {/* Keyframe for the scroll dot */}
                <style>{`
                    @keyframes scrollDotTravel {
                        0%   { top: 6px;   opacity: 1; }
                        50%  { top: 15px; opacity: 0.4; }
                        100% { top: 6px;   opacity: 1; }
                    }
                `}</style>
            </motion.div>
        </section>
    );
};

export default AboutHero;
