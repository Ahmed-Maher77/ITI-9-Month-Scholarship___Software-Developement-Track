import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../utils/animations";

const AboutCTA = () => {
    const { t } = useTranslation();

    return (
        <section id="about-cta" className="relative py-24 md:py-36 overflow-hidden text-center">
            {/* Radial glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-[700px] h-[400px] rounded-full bg-kashf-blue/8 blur-[100px]" />
            </div>
            {/* Dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(0,212,212,0.8) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <motion.div 
                className="relative max-w-2xl mx-auto px-5 sm:px-8 flex flex-col items-center gap-7"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
            >
                <motion.h2 variants={fadeUpVariants} custom={0} className="text-4xl sm:text-5xl font-extrabold text-neutral-100 leading-tight tracking-tight">
                    {t("about.cta.title")}{" "}
                    <span className="text-kashf-blue">{t("about.cta.titleAccent")}</span>
                </motion.h2>
                <motion.p variants={fadeUpVariants} custom={1} className="text-neutral-400 text-base md:text-lg leading-relaxed">
                    {t("about.cta.desc")}
                </motion.p>

                <motion.div variants={fadeUpVariants} custom={2} className="flex flex-wrap items-center justify-center gap-4">
                    {/* Primary */}
                    <Link
                        to="/register"
                        className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-kashf-blue text-black font-extrabold text-base overflow-hidden shadow-sm shadow-kashf-blue/30 hover:shadow-kashf-blue/50 transition-all duration-300 hover:scale-105 no-underline"
                    >
                        <span className="relative z-10">{t("about.cta.primary")}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Link>

                    {/* Secondary */}
                    <a
                        href="https://wa.me/+201150383416?text=I'm%20interested%20in%20learning%20more%20about%20Kashf!"
                        className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-kashf-border text-neutral-300 font-semibold text-base hover:border-kashf-blue/50 hover:text-kashf-blue hover:bg-kashf-blue/5 transition-all duration-300 no-underline"
                    >
                        {t("about.cta.secondary")}
                    </a>
                </motion.div>

                <motion.p variants={fadeUpVariants} custom={3} className="text-neutral-600 text-sm">
                    No credit card · No app store · Works on any device
                </motion.p>
            </motion.div>
        </section>
    );
};

export default AboutCTA;
