import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../utils/animations";
import { ChevronDown } from "lucide-react";
import SectionBadge from "../welcome/ui/SectionBadge";
import SectionHeading from "../welcome/ui/SectionHeading";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

const FAQItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-kashf-border rounded-2xl overflow-hidden transition-colors duration-300 hover:border-kashf-blue/30">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start cursor-pointer group"
                aria-expanded={open}
            >
                <span className="text-neutral-100 font-semibold text-base leading-snug group-hover:text-kashf-light-blue transition-colors duration-200">
                    {q}
                </span>
                <ChevronDown
                    className={`shrink-0 w-5 h-5 text-neutral-500 transition-transform duration-300 ${
                        open ? "rotate-180 text-kashf-blue" : ""
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <p className="px-6 pb-5 pt-4 text-neutral-400 text-sm leading-relaxed border-t border-kashf-border/60">
                    {a}
                </p>
            </div>
        </div>
    );
};

const AboutFAQ = () => {
    const { t } = useTranslation();

    return (
        <section id="about-faq" className="py-20 md:py-28 border-b border-kashf-border overflow-hidden">
            <motion.div 
                className="max-w-3xl mx-auto px-5 sm:px-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
            >
                <SectionHeading
                    align="center"
                    title={t("about.faq.title")}
                    accent={t("about.faq.titleAccent")}
                    subtitle={t("about.faq.subtitle")}
                    className="mb-12"
                    baseDelay={0}
                />

                <div className="flex flex-col gap-3 mt-14">
                    {FAQ_KEYS.map((key, i) => (
                        <motion.div key={key} variants={fadeUpVariants} custom={i}>
                            <FAQItem
                                q={t(`about.faq.items.${key}.q`)}
                                a={t(`about.faq.items.${key}.a`)}
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.p variants={fadeUpVariants} custom={FAQ_KEYS.length} className="text-center text-neutral-500 text-sm mt-10">
                    {t("about.faq.contact")}{" "}
                    <a href="mailto:ahmedmaher.dev1@gmail.com" className="text-kashf-blue hover:underline">
                        {t("about.faq.email")}
                    </a>
                </motion.p>
            </motion.div>
        </section>
    );
};

export default AboutFAQ;
