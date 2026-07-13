import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants as itemVariants, containerVariants, glowVariants } from "../../utils/animations";
import SmartMeter from "./SmartMeter";

const MeterSection = () => {
    const { t } = useTranslation();

    return (
        <motion.section 
            id="meter-section" 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="hidden sm:flex sm:flex-col sm:items-center sm:justify-center relative py-16 md:py-24 overflow-hidden w-full px-4 sm:px-6"
        >
            {/* Ambient Background Glows */}
            <motion.div variants={glowVariants} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-kashf-blue/10 to-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <motion.div variants={glowVariants} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-kashf-light-blue/5 rounded-full blur-[60px] pointer-events-none" />

            {/* Title / Header for the Showcase */}
            <div className="text-center max-w-2xl mx-auto px-4 mb-28 relative z-10">
                <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-neutral-100 mb-4 tracking-tight">
                    {t("welcome.meterSectionTitle", {
                        defaultValue: "Interactive Smart Monitoring",
                    })}
                </motion.h2>
                <motion.p variants={itemVariants} className="text-sm md:text-base text-neutral-400 leading-relaxed">
                    {t("welcome.meterSectionSubtitle", {
                        defaultValue:
                            "Experience the real-time feedback of Kashf's virtual utility meter. Watch your consumption zones and plan ahead to stay in control.",
                    })}
                </motion.p>
            </div>

            {/* Centered Smart Meter Container */}
            <motion.div variants={itemVariants} className="relative z-10 flex items-center justify-center w-full max-w-lg px-4">
                <SmartMeter />
            </motion.div>
        </motion.section>
    );
};

export default MeterSection;
