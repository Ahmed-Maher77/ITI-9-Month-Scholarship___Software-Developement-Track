import { useTranslation } from "react-i18next";
import { Zap } from "lucide-react";

const SmartMeterDisplay = () => {
    const { t } = useTranslation();

    return (
        <div className="z-10 flex flex-col items-center mt-15 select-none">
            <div className="flex items-baseline pb-2">
                <span className="text-4xl font-extrabold text-white tracking-tight font-mono">
                    305
                </span>
                <span className="text-sm font-semibold text-neutral-400">
                    kWh
                </span>
            </div>
            <span className="text-[0.65rem] font-bold text-kashf-light-blue bg-gradient-to-b from-[#0b1520] to-[#050a10] px-3.5 py-1 rounded-lg border border-[#1e3a5f]/40 uppercase tracking-wider mt-13 font-sans shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.05)]">
                {t("welcome.meterTier", { defaultValue: "Sheriha 3" })}
            </span>
            <span className="text-[0.7rem] text-amber-400 font-medium tracking-wide mt-1.5 font-sans rtl:tracking-normal">
                {t("welcome.meterRemaining", { defaultValue: "40 kWh Left" })}
            </span>
        </div>
    );
};

export default SmartMeterDisplay;