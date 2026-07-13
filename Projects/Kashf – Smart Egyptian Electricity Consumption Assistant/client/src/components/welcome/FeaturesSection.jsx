import { useTranslation } from "react-i18next";
import { Cpu, Brain, Zap, MonitorSmartphone } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import KashfCard from "./ui/KashfCard";
import { fadeUpVariants } from "../../utils/animations";

const CAPABILITIES = [
    { Icon: Cpu, titleKey: "features.smartMeter", titleDef: "Real-Time Embedded Monitoring", descKey: "features.smartMeterDesc", descDef: "Smart embedded system instant meter syncing via Kashf Smart Node" },
    { Icon: Brain, titleKey: "features.aiAnalysis", titleDef: "AI Consumption Analysis", descKey: "features.aiAnalysisDesc", descDef: "Machine learning models trained on Egyptian usage patterns" },
    { Icon: Zap, titleKey: "features.prediction", titleDef: "Sheriha Prediction Engine", descKey: "features.predictionDesc", descDef: "Real-time tier tracking with 48-hour cost forecasting" },
    { Icon: MonitorSmartphone, titleKey: "features.pwa", titleDef: "Installable PWA", descKey: "features.pwaDesc", descDef: "Works on mobile & desktop, even offline — no app store needed" },
];

const FeatureCard = ({ Icon, title, desc }) => (
    <KashfCard onClick={() => {}} className="gap-3">
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl text-kashf-light-blue transition-all duration-500 group-hover:scale-110">
            <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h3 className="relative z-10 text-base font-semibold text-neutral-100 mt-1 transition-colors duration-300 group-hover:text-kashf-light-blue">
            {title}
        </h3>
        <p className="relative z-10 text-sm text-neutral-500 leading-relaxed mt-auto transition-colors duration-300 group-hover:text-neutral-300">
            {desc}
        </p>
    </KashfCard>
);

const FeaturesSection = () => {
    const { t } = useTranslation();

    return (
        <section 
            id="features" 
            className="mb-10 scroll-mt-24 py-16 md:py-24 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <SectionHeading
                    align="center"
                    title={t("welcome.coreCapabilities", { defaultValue: "Core Capabilities" })}
                    subtitle={t("welcome.featuresText")}
                    className="mb-16"
                    baseDelay={0}
                />

                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {CAPABILITIES.map((c, index) => (
                        <motion.div key={c.titleKey} variants={fadeUpVariants} custom={index} className="h-full">
                            <FeatureCard
                                Icon={c.Icon}
                                title={t(c.titleKey, { defaultValue: c.titleDef })}
                                desc={t(c.descKey, { defaultValue: c.descDef })}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
