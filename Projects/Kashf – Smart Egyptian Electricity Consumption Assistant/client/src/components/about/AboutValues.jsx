import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../utils/animations";
import { Target, Globe, Users, Zap } from "lucide-react";
import SectionBadge from "../welcome/ui/SectionBadge";
import SectionHeading from "../welcome/ui/SectionHeading";

const ICONS = [Target, Globe, Users, Zap];
const VALUE_KEYS = ["v1", "v2", "v3", "v4"];

const ValueCard = ({ icon: Icon, title, desc }) => (
    <div className="flex flex-col gap-3 p-6 rounded-2xl border border-neutral-800 bg-[#0d0d12] group hover:border-kashf-blue/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(6,182,212,0.10)] h-full">
        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-kashf-light-blue" />
        </div>
        <h3 className="text-neutral-100 font-semibold text-base">{title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const AboutValues = () => {
    const { t } = useTranslation();

    return (
        <section id="about-values" className="py-20 md:py-28 border-b border-kashf-border overflow-hidden">
            <motion.div 
                className="max-w-6xl mx-auto px-5 sm:px-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
            >
                <SectionHeading
                    align="center"
                    title={t("about.values.title")}
                    accent={t("about.values.titleAccent")}
                    subtitle={t("about.values.subtitle")}
                    className="mb-14"
                    baseDelay={0}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-18">
                    {VALUE_KEYS.map((key, i) => (
                        <motion.div key={key} variants={fadeUpVariants} custom={i} className="h-full">
                            <ValueCard
                                icon={ICONS[i]}
                                title={t(`about.values.${key}.title`)}
                                desc={t(`about.values.${key}.desc`)}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AboutValues;
