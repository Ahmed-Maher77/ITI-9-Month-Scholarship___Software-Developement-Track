import { useTranslation } from "react-i18next";
import { Waypoints, Zap, Clock, Thermometer, MessageSquareText } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../utils/animations";
import SectionBadge from "./ui/SectionBadge";
import SectionHeading from "./ui/SectionHeading";
import FeatureList from "./ui/FeatureList";
import ChatHeader from "./ui/ChatHeader";
import ChatMessages from "./ui/ChatMessages";
import ChatInputBar from "./ui/ChatInputBar";


const CHAT_MESSAGES = [
    {
        role: "kashf",
        textKey: "ai.chat.msg1",
        textDefault: "اتحرك للشريحة التالية هتكلفك 187 جنيه زيادة. لو خفضت التكييف ساعتين كل يوم هتوفر 64 جنيه.",
        isRtl: true,
    },
    {
        role: "user",
        textKey: "ai.chat.msg2",
        textDefault: "إيه الأحسن؟ أغير درجة التكييف ولا أقلل وقت الشغل؟",
        isRtl: true,
    },
    {
        role: "kashf",
        textKey: "ai.chat.msg3",
        textDefault: "رفع الدرجة لـ 26° أحسن — بيوفر أكتر وما بتحسش بفرق كبير. جرب الليلة!",
        isRtl: true,
    },
];

const QUICK_REPLIES = [
    { key: "ai.quick1", def: "وفر أكتر" },
    { key: "ai.quick2", def: "اقتراحات إضافية" },
    { key: "ai.quick3", def: "سؤال تاني" },
];

const FEATURE_ICONS = [Zap, Clock, Thermometer, MessageSquareText];
const FEATURE_KEYS = [
    { key: "ai.feat1", def: "Appliance-level recommendations" },
    { key: "ai.feat2", def: "Time-of-use optimization" },
    { key: "ai.feat3", def: "Seasonal adjustment insights" },
    { key: "ai.feat4", def: "Arabic-first conversational interface" },
];


const AIAssistantSection = () => {
    const { t } = useTranslation();

    const featureItems = FEATURE_KEYS.map((f, i) => ({
        icon: FEATURE_ICONS[i],
        label: t(f.key, { defaultValue: f.def }),
    }));

    return (
        <section 
            id="ai-assistant" 
            className="relative py-20 md:py-28 overflow-hidden border-t border-kashf-border"
        >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-kashf-blue/10 blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* ── Left: text ── */}
                    <div className="flex flex-col gap-6">
                        <SectionHeading
                            align="left"
                            badge={
                                <SectionBadge icon={<Waypoints size={16} />}>
                                    {t("ai.badge", { defaultValue: "AI Energy Assistant" })}
                                </SectionBadge>
                            }
                            title={t("ai.title", { defaultValue: "Personalized advice in" })}
                            accent={t("ai.titleAccent", { defaultValue: "Egyptian Arabic" })}
                            subtitle={t("ai.desc", {
                                defaultValue:
                                    "Kashf's AI analyzes your usage profile and gives you actionable steps in plain Egyptian Arabic — not generic tips, but recommendations based on your actual home behavior.",
                            })}
                            baseDelay={0}
                        />

                        <motion.div 
                            variants={fadeUpVariants} 
                            custom={0}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <FeatureList items={featureItems} iconWrapClass="text-kashf-blue/50" />
                        </motion.div>
                    </div>

                    {/* ── Right: chat UI ── */}
                    <motion.div 
                        variants={fadeUpVariants} 
                        custom={1} 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="rounded-2xl border border-kashf-border bg-kashf-surface overflow-hidden shadow-2xl shadow-black/40"
                    >
                        <ChatHeader />
                        <ChatMessages messages={CHAT_MESSAGES} quickReplies={QUICK_REPLIES} />
                        <ChatInputBar />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AIAssistantSection;
