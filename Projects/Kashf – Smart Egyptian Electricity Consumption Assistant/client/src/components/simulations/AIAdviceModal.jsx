import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bot, X, Lightbulb, TrendingDown, AlertCircle } from 'lucide-react';

const AIAdviceModal = ({ isOpen, onClose, adviceData, adviceLoading, adviceError, onRetry }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-start justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto"
            >
                <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Bot className="size-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                            {t('simulations.aiAdviceTitle', 'AI Energy Advisor')}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-neutral-500 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3" dir="rtl">
                    {adviceLoading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div>
                            <p className="text-sm text-neutral-400">{t('simulations.aiAdviceLoading', 'Getting AI advice...')}</p>
                        </div>
                    )}

                    {adviceError && (
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                            <AlertCircle className="size-10 text-red-400" />
                            <p className="text-sm text-red-400">{adviceError}</p>
                            <button
                                onClick={onRetry}
                                className="px-4 py-2 text-xs bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                            >
                                {t('common.retry', 'Retry')}
                            </button>
                        </div>
                    )}

                    {adviceData?.tips?.map((tip, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="bg-neutral-800/60 border border-neutral-700/50 rounded-xl p-4 space-y-2"
                        >
                            <div className="flex items-center gap-2">
                                <Lightbulb className="size-4 text-amber-400 shrink-0" />
                                <h4 className="text-sm font-bold text-white">{tip.device}</h4>
                            </div>
                            <p className="text-sm text-neutral-300 leading-relaxed">{tip.advice}</p>
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                                <TrendingDown className="size-3.5" />
                                {t('simulations.aiSavings', 'Potential savings')}: {tip.savings}
                            </div>
                        </motion.div>
                    ))}

                    {adviceData && !adviceData.tips?.length && !adviceLoading && (
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                            <Bot className="size-10 text-neutral-500" />
                            <p className="text-sm text-neutral-400">{t('simulations.aiNoAdvice', 'No specific tips available for your current setup.')}</p>
                        </div>
                    )}

                    {adviceData?.generatedAt && (
                        <p className="text-[10px] text-neutral-600 text-center pt-2">
                            {t('simulations.aiGeneratedAt', 'Generated at')}: {new Date(adviceData.generatedAt).toLocaleString('ar-EG')}
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AIAdviceModal;
