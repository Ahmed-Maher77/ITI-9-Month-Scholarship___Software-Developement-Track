import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AIAdvicesModal = ({ isOpen, onClose, meter }) => {
    const { t } = useTranslation();
    
    if (!meter) return null;

    // Generate mock advices based on tier, if available
    let advices = [];
    if (meter.tier && meter.tier !== '--') {
        advices = meter.tier >= 3 
            ? [
                { id: 1, type: 'warning', text: t('meters.aiAdviceHigh1', "You are consuming heavily during peak hours (6 PM - 10 PM). Consider shifting laundry to the morning.") },
                { id: 2, type: 'info', text: t('meters.aiAdviceHigh2', "Your AC might be running inefficiently. A 1-degree increase saves up to 5% on cooling.") },
                { id: 3, type: 'alert', text: t('meters.aiAdviceHigh3', "Approaching Tier 4! Reducing usage now prevents a significant jump in cost per kWh.") }
            ]
            : [
                { id: 1, type: 'success', text: t('meters.aiAdviceLow1', "Great job! Your consumption is highly optimized compared to similar households.") },
                { id: 2, type: 'info', text: t('meters.aiAdviceLow2', "To keep costs low, ensure standby appliances (like TVs and consoles) are unplugged.") }
            ];
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-kashf-surface border border-kashf-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] my-auto"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-neutral-800 bg-kashf-blue/5">
                            <div className="flex items-start gap-3">
                                <div className="p-1 text-kashf-light-blue">
                                    <Sparkles className="size-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{t('meters.aiAdvices')}</h2>
                                    <p className="text-sm text-neutral-400 mt-1">{t('meters.forMeter', { name: t(meter.name) })}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                                <X className="size-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            {advices.length > 0 ? (
                                <div className="flex flex-col gap-0 pt-2">
                                    {advices.map((advice, index) => {
                                        const isLast = index === advices.length - 1;
                                        return (
                                            <div key={advice.id} className="relative flex gap-5 sm:gap-7">
                                                {/* Connector line + dot */}
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-3.5 h-3.5 rounded-full shrink-0 mt-1 z-10 ${
                                                        advice.type === 'warning' ? 'bg-amber-400' :
                                                        advice.type === 'alert' ? 'bg-red-400' :
                                                        advice.type === 'success' ? 'bg-emerald-400' :
                                                        'bg-kashf-blue'
                                                    }`} />
                                                    {!isLast && (
                                                        <div className={`w-0.5 flex-1 mt-2 bg-gradient-to-b min-h-[48px] ${
                                                            advice.type === 'warning' ? 'from-amber-400/40 to-transparent' :
                                                            advice.type === 'alert' ? 'from-red-400/40 to-transparent' :
                                                            advice.type === 'success' ? 'from-emerald-400/40 to-transparent' :
                                                            'from-kashf-blue/40 to-transparent'
                                                        }`} />
                                                    )}
                                                </div>
                                                
                                                {/* Content */}
                                                <div className="pb-10">
                                                    <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
                                                        advice.type === 'warning' ? 'text-amber-400' :
                                                        advice.type === 'alert' ? 'text-red-400' :
                                                        advice.type === 'success' ? 'text-emerald-400' :
                                                        'text-kashf-blue'
                                                    }`}>
                                                        {advice.type === 'warning' || advice.type === 'alert' ? <AlertCircle className="size-3.5" /> : <Zap className="size-3.5" />}
                                                        {advice.type === 'warning' ? t('meters.adviceWarning') :
                                                         advice.type === 'alert' ? t('meters.adviceAlert') :
                                                         advice.type === 'success' ? t('meters.adviceSuccess') : 
                                                         t('meters.adviceTip')}
                                                    </span>
                                                    <p className="text-neutral-300 text-sm leading-relaxed mt-2">{advice.text}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
                                    <div className="p-4 bg-neutral-900 rounded-full mb-4">
                                        <Sparkles className="size-8 text-neutral-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{t('meters.noAdvicesTitle')}</h3>
                                    <p className="text-sm text-neutral-400 max-w-[280px]">{t('meters.noAdvicesDesc')}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4 border-t border-neutral-800 bg-neutral-900/50 flex justify-end">
                            <button onClick={onClose} className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors">
                                {t('common.close', "Close")}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AIAdvicesModal;
