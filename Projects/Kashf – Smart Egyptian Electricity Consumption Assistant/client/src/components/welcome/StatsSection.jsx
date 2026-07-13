import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

const AnimatedCounter = ({ valueStr }) => {
    const { i18n } = useTranslation();
    const [displayValue, setDisplayValue] = useState("0");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        // Replace Eastern Arabic digits with standard digits for parsing
        const standardStr = valueStr.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
        const numMatch = standardStr.match(/[\d,.]+/);

        if (!numMatch) {
            setDisplayValue(valueStr);
            return;
        }

        const numStr = numMatch[0];
        const number = parseFloat(numStr.replace(/,/g, ''));
        const prefix = valueStr.slice(0, numMatch.index);
        const suffix = valueStr.slice(numMatch.index + numStr.length);

        if (isInView) {
            const controls = animate(0, number, {
                duration: 2,
                ease: "easeOut",
                onUpdate(value) {
                    let formatted = Math.floor(value).toString();
                    if (numStr.includes(',')) {
                        formatted = Math.floor(value).toLocaleString(i18n.language);
                    } else if (valueStr.match(/[٠-٩]/)) {
                        formatted = Math.floor(value).toLocaleString(i18n.language, { useGrouping: false });
                    }
                    setDisplayValue(`${prefix}${formatted}${suffix}`);
                }
            });
            return controls.stop;
        } else {
            // Initial state before scrolling into view
            let initialFormatted = "0";
            if (valueStr.match(/[٠-٩]/)) {
                 initialFormatted = "٠";
            }
            setDisplayValue(`${prefix}${initialFormatted}${suffix}`);
        }
    }, [valueStr, isInView, i18n.language]);

    return <span ref={ref}>{displayValue}</span>;
};

const StatsSection = () => {
    const { t } = useTranslation();

    const stats = [
        {
            value: t("stats.users.value", { defaultValue: "2,400+" }),
            label: t("stats.users.label", { defaultValue: "Egyptian Households" }),
        },
        {
            value: t("stats.scans.value", { defaultValue: "15,000+" }),
            label: t("stats.scans.label", { defaultValue: "Active Sensors" }),
        },
        {
            value: t("stats.savings.value", { defaultValue: "30%" }),
            label: t("stats.savings.label", { defaultValue: "Avg. Bill Savings" }),
        },
        {
            value: t("stats.accuracy.value", { defaultValue: "98%" }),
            label: t("stats.accuracy.label", { defaultValue: "Sync Precision" }),
        },
    ];

    return (
        <section id="stats" className="py-16 md:py-24 border-t border-kashf-border">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center group"
                        >
                            <div className="mb-2">
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-kashf-blue to-kashf-light-blue">
                                    <AnimatedCounter valueStr={stat.value} />
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
