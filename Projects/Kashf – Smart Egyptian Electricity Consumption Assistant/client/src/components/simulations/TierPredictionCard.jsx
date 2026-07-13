import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Gauge, RefreshCw, Clock } from 'lucide-react';

const TierPredictionCard = ({ predictionData, predictionLoading, onRefresh }) => {
    const { t } = useTranslation();

    if (!predictionData) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${
                        predictionData.warningLevel === 'red' ? 'bg-red-500/10 text-red-400' :
                        predictionData.warningLevel === 'orange' ? 'bg-orange-500/10 text-orange-400' :
                        predictionData.warningLevel === 'yellow' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-emerald-500/10 text-emerald-400'
                    }`}>
                        <Gauge className="size-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">
                        {t('simulations.tierPrediction', 'Tier Prediction')}
                    </h3>
                </div>
                <button
                    onClick={onRefresh}
                    disabled={predictionLoading}
                    className="p-1.5 text-neutral-500 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`size-4 ${predictionLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t('simulations.currentTier', 'Current Tier')}</p>
                    <p className="text-lg font-bold text-white">
                        {predictionData.currentTier}
                        {predictionData.nextTier && (
                            <span className="text-sm text-neutral-500 font-normal mx-1">
                                → {t('simulations.tier', 'Tier')} {predictionData.nextTier}
                            </span>
                        )}
                    </p>
                </div>
                <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t('simulations.remaining', 'Remaining')}</p>
                    <p className="text-lg font-bold text-white">
                        {predictionData.remainingKWh.toFixed(2)}
                        <span className="text-xs text-neutral-500 font-normal ml-1">kWh</span>
                    </p>
                </div>
                <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t('simulations.totalConsumed', 'Total Consumed')}</p>
                    <p className="text-lg font-bold text-white">
                        {predictionData.totalKWh.toFixed(1)}
                        <span className="text-xs text-neutral-500 font-normal ml-1">kWh</span>
                    </p>
                </div>
                <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t('simulations.estHours', 'Est. Hours Left')}</p>
                    <p className="text-lg font-bold text-white flex items-center gap-1">
                        {predictionData.estimatedHoursToNextTier !== null ? (
                            <>
                                <Clock className="size-4 text-neutral-500" />
                                {predictionData.estimatedHoursToNextTier.toFixed(1)}
                                <span className="text-xs text-neutral-500 font-normal">{t('simulations.hours', 'hrs')}</span>
                            </>
                        ) : (
                            <span className="text-sm text-neutral-500 font-normal">{t('simulations.paused', '—')}</span>
                        )}
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-neutral-500">
                        {t('simulations.tierProgress', 'Tier Progress')}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span className={`inline-block size-2 rounded-full ${
                            predictionData.warningLevel === 'red' ? 'bg-red-400' :
                            predictionData.warningLevel === 'orange' ? 'bg-orange-400' :
                            predictionData.warningLevel === 'yellow' ? 'bg-yellow-400' :
                            'bg-emerald-400'
                        }`} />
                        <span className={`text-[10px] font-medium uppercase tracking-wider ${
                            predictionData.warningLevel === 'red' ? 'text-red-400' :
                            predictionData.warningLevel === 'orange' ? 'text-orange-400' :
                            predictionData.warningLevel === 'yellow' ? 'text-yellow-400' :
                            'text-emerald-400'
                        }`}>{predictionData.warningLevel}</span>
                    </div>
                </div>
                {predictionData.nextTier && (
                    <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100 - (predictionData.remainingKWh / (predictionData.remainingKWh + predictionData.totalKWh) * 100), 100)}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full rounded-full ${
                                predictionData.warningLevel === 'red' ? 'bg-red-500' :
                                predictionData.warningLevel === 'orange' ? 'bg-orange-500' :
                                predictionData.warningLevel === 'yellow' ? 'bg-yellow-500' :
                                'bg-emerald-500'
                            }`}
                        />
                    </div>
                )}
            </div>

            {predictionData.currentLoadW > 0 && (
                <div className="flex items-center gap-4 mt-3 text-[11px] text-neutral-500">
                    <span>{predictionData.currentLoadW}W draw</span>
                    <span>·</span>
                    <span>{predictionData.kWhPerHour.toFixed(2)} kWh/hr</span>
                </div>
            )}
        </motion.div>
    );
};

export default TierPredictionCard;
