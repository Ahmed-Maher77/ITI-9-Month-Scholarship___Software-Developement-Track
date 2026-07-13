import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../utils/animations";
import SectionBadge from "../welcome/ui/SectionBadge";
import SectionHeading from "../welcome/ui/SectionHeading";

const TIMELINE_COLORS = [
    { dot: "bg-orange-400", line: "from-orange-400/40 to-transparent", year: "text-orange-400" },
    { dot: "bg-kashf-blue",  line: "from-kashf-blue/40 to-transparent",  year: "text-kashf-blue" },
    { dot: "bg-emerald-400", line: "from-emerald-400/40 to-transparent", year: "text-emerald-400" },
];

const TimelineItem = ({ year, label, desc, color }) => (
    <div className="relative flex gap-5 sm:gap-7">
        {/* Connector line + dot */}
        <div className="flex flex-col items-center">
            <div className={`w-3.5 h-3.5 rounded-full shrink-0 mt-1 z-10 ${color.dot}`} />
            <div className={`w-0.5 flex-1 mt-2 bg-gradient-to-b ${color.line} min-h-[48px]`} />
        </div>

        {/* Content */}
        <div className="pb-10">
            <span className={`text-xs font-bold uppercase tracking-widest ${color.year}`}>{year}</span>
            <h3 className="text-neutral-100 font-bold text-lg mt-0.5 mb-1">{label}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

const AboutStory = () => {
    const { t } = useTranslation();

    const timelineKeys = ["t1", "t2", "t3"];

    return (
        <section id="about-story" className="py-20 md:py-28 border-b border-kashf-border overflow-hidden">
            <motion.div 
                className="max-w-6xl mx-auto px-5 sm:px-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-20 items-start justify-between">

                    {/* ── Left: story text ── */}
                    <div className="flex flex-col gap-8 lg:col-span-2">
                        <SectionHeading
                            align="left"
                            badge={<SectionBadge>{t("about.story.badge")}</SectionBadge>}
                            title={t("about.story.title")}
                            accent={t("about.story.titleAccent")}
                            baseDelay={0}
                        />

                        <div className="flex flex-col gap-5 text-neutral-400 text-base leading-relaxed">
                            <motion.p variants={fadeUpVariants} custom={0}>{t("about.story.body1")}</motion.p>
                            <motion.p variants={fadeUpVariants} custom={1}>{t("about.story.body2")}</motion.p>
                            <motion.p variants={fadeUpVariants} custom={2}>{t("about.story.body3")}</motion.p>
                        </div>
                    </div>

                    {/* ── Right: timeline ── */}
                    <div className="flex flex-col gap-0 pt-2 w-fit">
                        {timelineKeys.map((key, i) => (
                            <motion.div key={key} variants={fadeUpVariants} custom={i + 3}>
                                <TimelineItem
                                    year={t(`about.story.timeline.${key}.year`)}
                                    label={t(`about.story.timeline.${key}.label`)}
                                    desc={t(`about.story.timeline.${key}.desc`)}
                                    color={TIMELINE_COLORS[i]}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutStory;
