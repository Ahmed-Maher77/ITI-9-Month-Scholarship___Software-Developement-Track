import { useTranslation } from "react-i18next";
import SmartMeterDial from "./SmartMeterDial";
import SmartMeterNumbers from "./SmartMeterNumbers";
import SmartMeterNeedle from "./SmartMeterNeedle";
import SmartMeterDisplay from "./SmartMeterDisplay";
import SmartMeterFloatingCards from "./SmartMeterFloatingCards";

const SmartMeter = () => {
    const { t } = useTranslation();

    return (
        <div className="relative flex items-center justify-center size-[380px] max-w-full">
            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-7px); }
                }
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-float-1 { animation: float-slow 6s ease-in-out infinite; }
                .animate-float-2 { animation: float-medium 5s ease-in-out infinite 1s; }
                .animate-float-3 { animation: float-fast 7s ease-in-out infinite 0.5s; }
            `}</style>

            <div className="relative size-80 rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 p-[6px] shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.15)] flex items-center justify-center">
                <div className="size-full rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 p-[3px] shadow-[inset_0_3px_8px_rgba(0,0,0,0.8)] flex items-center justify-center">
                    <div className="relative size-full rounded-full bg-[#0a0a0f] overflow-hidden flex flex-col items-center justify-center shadow-[inset_0_12px_40px_rgba(0,0,0,0.95)]">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none z-20" />
                        <div className="absolute top-1 left-4 right-4 h-16 rounded-t-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-20 opacity-60" />

                        <SmartMeterDial />
                        <SmartMeterNumbers />
                        <SmartMeterNeedle />
                        <SmartMeterDisplay />
                    </div>
                </div>
            </div>

            <SmartMeterFloatingCards />
        </div>
    );
};

export default SmartMeter;