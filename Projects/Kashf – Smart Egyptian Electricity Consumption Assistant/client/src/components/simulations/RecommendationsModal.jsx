import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
    X,
    Lightbulb,
    AlertTriangle,
    TrendingDown,
    Target,
    Zap,
    Gauge,
    AlertCircle,
    Sparkles,
    Layers,
    BarChart3,
    ZapOff,
} from 'lucide-react';
import { clearRecommendations } from '../../store/simulations/simulationSlice';

const categoryConfig = {
    peak: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', label: 'Peak Load' },
    tier_saving: { icon: Layers, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Tier Saving' },
    efficiency: { icon: TrendingDown, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Efficiency' },
    anomaly: { icon: ZapOff, color: 'text-orange-400', bg: 'bg-orange-500/10', label: 'Anomaly' },
};

const priorityConfig = {
    high: { color: 'text-red-400', bg: 'bg-red-500/10', dot: 'bg-red-400' },
    medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', dot: 'bg-amber-400' },
    low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400' },
};

const RecommendationsModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { recommendationsData, recommendationsLoading, recommendationsError } = useSelector(state => state.simulations);

    const handleClose = () => {
        dispatch(clearRecommendations());
        onClose();
    };

    if (!isOpen) return null;

    const priority = recommendationsData?.recommendations?.priority || 'medium';
    const pConf = priorityConfig[priority] || priorityConfig.medium;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-start justify-center p-4"
            onClick={handleClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-kashf-blue/10 text-kashf-light-blue">
                            <Lightbulb className="size-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                            {t('simulations.recommendationsTitle', 'Smart Recommendations')}
                        </h3>
                    </div>
                    <button onClick={handleClose} className="p-1.5 text-neutral-500 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors">
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4" dir="rtl">
                    {/* Loading */}
                    {recommendationsLoading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-kashf-blue"></div>
                            <p className="text-sm text-neutral-400">{t('simulations.recommendationsLoading', 'Analyzing your setup...')}</p>
                        </div>
                    )}

                    {/* Error */}
                    {recommendationsError && (
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                            <AlertCircle className="size-10 text-red-400" />
                            <p className="text-sm text-red-400">{recommendationsError}</p>
                        </div>
                    )}

                    {/* Analysis Summary */}
                    {recommendationsData?.analysis && (
                        <div className="bg-neutral-800/40 border border-neutral-700/50 rounded-xl p-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider mb-2">
                                <BarChart3 className="size-3.5" />
                                {t('simulations.recommendationsAnalysis', 'Current State Analysis')}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div>
                                    <p className="text-[10px] text-neutral-500">{t('simulations.load', 'Total Load')}</p>
                                    <p className="text-sm font-bold text-white">{recommendationsData.analysis.totalLoadW}<span className="text-[10px] text-neutral-500 font-normal mr-1">W</span></p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-neutral-500">{t('simulations.tier', 'Tier')}</p>
                                    <p className="text-sm font-bold text-white">{recommendationsData.analysis.tier}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-neutral-500">{t('simulations.totalKWh', 'Energy Used')}</p>
                                    <p className="text-sm font-bold text-white">{recommendationsData.analysis.totalKWh.toFixed(1)}<span className="text-[10px] text-neutral-500 font-normal mr-1">kWh</span></p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-neutral-500">{t('simulations.tierProgress', 'Tier Progress')}</p>
                                    <p className="text-sm font-bold text-white">{recommendationsData.analysis.tierProgress}%</p>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-1">
                                <div className="h-full rounded-full bg-kashf-blue" style={{ width: `${Math.min(recommendationsData.analysis.tierProgress, 100)}%` }} />
                            </div>
                            {recommendationsData.analysis.heaviestCircuit && (
                                <p className="text-[11px] text-neutral-500 mt-1">
                                    {t('simulations.heaviestCircuit', 'Heaviest circuit')}: {recommendationsData.analysis.heaviestCircuit.name} ({recommendationsData.analysis.heaviestCircuit.loadW}W)
                                </p>
                            )}
                        </div>
                    )}

                    {/* Priority Badge */}
                    {recommendationsData?.recommendations?.priority && (
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${pConf.bg} ${pConf.color}`}>
                            <Gauge className="size-4" />
                            <span className="text-sm font-bold uppercase tracking-wider">
                                {t('simulations.recommendationsPriority', 'Priority')}: {recommendationsData.recommendations.priority}
                            </span>
                            <span className={`inline-block size-2 rounded-full ${pConf.dot}`} />
                        </div>
                    )}

                    {/* Findings */}
                    {recommendationsData?.recommendations?.findings?.map((finding, index) => {
                        const cat = categoryConfig[finding.category] || categoryConfig.efficiency;
                        const CatIcon = cat.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className="bg-neutral-800/60 border border-neutral-700/50 rounded-xl p-4 space-y-3"
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${cat.bg} ${cat.color} shrink-0`}>
                                        <CatIcon className="size-4" />
                                    </div>
                                    <div className="min-w-0 space-y-1.5">
                                        <h4 className="text-sm font-bold text-white">{finding.title}</h4>
                                        <p className="text-sm text-neutral-300 leading-relaxed">{finding.description}</p>
                                        {finding.suggestion && (
                                            <div className="flex items-start gap-1.5 text-xs text-kashf-light-blue">
                                                <Target className="size-3.5 mt-0.5 shrink-0" />
                                                <span>{finding.suggestion}</span>
                                            </div>
                                        )}
                                        {finding.impact && (
                                            <div className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                                                <TrendingDown className="size-3" />
                                                {finding.impact}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Quick Wins */}
                    {recommendationsData?.recommendations?.quickWins?.length > 0 && (
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <Sparkles className="size-4" />
                                <h4 className="text-sm font-bold">{t('simulations.recommendationsQuickWins', 'Quick Wins')}</h4>
                            </div>
                            <ul className="space-y-1.5">
                                {recommendationsData.recommendations.quickWins.map((win, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                                        <span className="text-emerald-400 mt-0.5">•</span>
                                        {win}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Timestamp */}
                    {recommendationsData?.generatedAt && (
                        <p className="text-[10px] text-neutral-600 text-center pt-1">
                            {t('simulations.recommendationsGeneratedAt', 'Generated at')}: {new Date(recommendationsData.generatedAt).toLocaleString('ar-EG')}
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default RecommendationsModal;