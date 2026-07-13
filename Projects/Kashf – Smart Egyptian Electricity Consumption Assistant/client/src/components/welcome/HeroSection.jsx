import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import VideoDemoModal from "./VideoDemoModal";
import SocialProof from "./SocialProof";
import HeroCTAs from "./HeroCTAs";
import AIPoweredBadge from "./AIPoweredBadge";
import AnimatedScrollIndicator from "./AnimatedScrollIndicator";

const HeroSection = () => {
    const { t } = useTranslation();
    const [isDemoOpen, setIsDemoOpen] = useState(false);

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    };

    const titleContainer = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.3 }
        }
    };

    const typeWriterChar = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.01 } }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: (customDelay) => ({ 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, delay: customDelay, ease: "easeOut" } 
        })
    };

    // Close modal on Escape key press
    useEffect(() => {
        if (!isDemoOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsDemoOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isDemoOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isDemoOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isDemoOpen]);

    const scrollToNext = () => {
        // Try meter section first, then features
        const next =
            document.getElementById("meter-section") ||
            document.getElementById("features");
        if (next) {
            next.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.section id="hero" variants={container} initial="hidden" animate="show" className="relative flex flex-col items-center justify-center text-center py-16 pt-12 md:py-2 md:pt-12 max-w-4xl mx-auto px-5 sm:px-8">
            <motion.div custom={0.1} variants={item}><AIPoweredBadge /></motion.div>

            {/* Hero Title */}
            <motion.h1 variants={titleContainer} className="mb-6 text-[2rem] font-extrabold tracking-tight rtl:tracking-normal text-neutral-100 md:text-4xl lg:text-6xl max-w-3xl leading-[1.3] md:leading-[1.2] rtl:leading-relaxed ltr:font-semibold mx-auto">
                {t("welcome.heroTitlePart1").split("").map((char, index) => (
                    <motion.span key={index} variants={typeWriterChar} className="inline">
                        {char}
                    </motion.span>
                ))}
                {" "}
                <span className="block sm:inline text-transparent bg-clip-text bg-linear-to-r from-kashf-light-blue via-kashf-blue to-emerald-400 pb-[4px]">
                    {t("welcome.heroTitlePart2").split("").map((char, index) => (
                        <motion.span key={index} variants={typeWriterChar} className="inline">
                            {char}
                        </motion.span>
                    ))}
                </span>
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p custom={1.2} variants={item} className="mb-10 max-w-2xl text-base md:text-lg text-neutral-400 leading-relaxed font-normal mx-auto">
                {t("welcome.heroSubtitle")}
            </motion.p>

            <motion.div custom={1.4} variants={item}>
                <HeroCTAs onOpenDemo={() => setIsDemoOpen(true)} />
            </motion.div>

            <motion.div custom={1.6} variants={item}>
                <SocialProof />
            </motion.div>

            <VideoDemoModal
                isOpen={isDemoOpen}
                onClose={() => setIsDemoOpen(false)}
            />

            <motion.div custom={1.8} variants={item}>
                <AnimatedScrollIndicator scrollToNext={scrollToNext} t={t} />
            </motion.div>
            

            {/* Keyframe for the scroll dot */}
            <style>{`
                @keyframes scrollDotBounce {
                    0%   { transform: translateY(0);   opacity: 1; }
                    60%  { transform: translateY(8px); opacity: 0.3; }
                    100% { transform: translateY(0);   opacity: 1; }
                }
            `}</style>
        </motion.section>
    );
};

export default HeroSection;

