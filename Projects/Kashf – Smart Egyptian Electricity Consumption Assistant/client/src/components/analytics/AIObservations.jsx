import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

const AIObservations = ({ observations }) => {
    const { t } = useTranslation();

    return (
        <div className="relative group pt-10">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl transition-colors duration-700 pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-1 text-indigo-400">
                    <Sparkles className="size-7" />
                </div>
                <h3 className="text-lg font-bold text-white">{t('analytics.aiObservationsTitle', 'AI Observations')}</h3>
            </div>

            <div className="space-y-0 relative z-10 pt-2">
                {observations.map((obs, idx) => {
                    const styleMap = {
                        success: { dot: "bg-emerald-500", line: "from-emerald-500/40 to-transparent", text: "text-emerald-500" },
                        warning: { dot: "bg-amber-500", line: "from-amber-500/40 to-transparent", text: "text-amber-500" },
                        alert:   { dot: "bg-red-500", line: "from-red-500/40 to-transparent", text: "text-red-500" },
                        info:    { dot: "bg-kashf-light-blue", line: "from-kashf-light-blue/40 to-transparent", text: "text-kashf-light-blue" }
                    };
                    const color = styleMap[obs.type] || { dot: "bg-neutral-500", line: "from-neutral-500/40 to-transparent", text: "text-neutral-500" };

                    return (
                        <div key={idx} className="relative flex gap-4 sm:gap-6">
                            {/* Connector line + dot */}
                            <div className="flex flex-col items-center">
                                <div className={`w-3.5 h-3.5 rounded-full shrink-0 mt-1 z-10 ${color.dot} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                                {idx !== observations.length - 1 ? (
                                    <div className={`w-0.5 flex-1 mt-2 mb-2 bg-gradient-to-b ${color.line} min-h-[40px]`} />
                                ) : (
                                    <div className={`w-0.5 flex-1 mt-2 bg-gradient-to-b ${color.line} min-h-[40px] opacity-50`} />
                                )}
                            </div>

                            {/* Content */}
                            <div className="pb-8">
                                {obs.date && <span className={`text-xs font-bold uppercase tracking-widest ${color.text}`}>{obs.date}</span>}
                                <h3 className="text-neutral-100 font-bold text-base mt-0.5 mb-1.5">{obs.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{obs.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AIObservations;
