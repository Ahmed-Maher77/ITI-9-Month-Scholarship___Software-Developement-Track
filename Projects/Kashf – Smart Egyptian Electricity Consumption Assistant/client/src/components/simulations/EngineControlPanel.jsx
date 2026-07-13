import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Zap,
    RotateCcw,
    Pause,
    Play,
    Wifi,
    WifiOff,
    Activity,
    Gauge,
    Coins,
    Layers,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    startSimulationAsync,
    pauseSimulationAsync,
    resetSimulationAsync,
} from '../../store/simulations/simulationSlice';

const LiveMetric = ({ icon: Icon, label, value, unit, prefix }) => (
    <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 bg-neutral-800/60 border border-neutral-700/50 rounded-xl px-4 py-3 min-w-0"
    >
        <div className="p-2 rounded-lg bg-kashf-blue/10 text-kashf-blue shrink-0">
            <Icon className="size-4" />
        </div>
        <div className="min-w-0">
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{label}</p>
            <p className="text-base font-bold text-white truncate">
                {prefix}{value}<span className="text-xs text-neutral-500 font-normal ml-1">{unit}</span>
            </p>
        </div>
    </motion.div>
);

const EngineControlPanel = ({ simulationId, streamData, totalPower }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const isRunning = streamData ? streamData.running : false;
    const isConnected = !!streamData;

    const handleStart = () => dispatch(startSimulationAsync(simulationId));
    const handlePause = () => dispatch(pauseSimulationAsync(simulationId));
    const handleReset = () => dispatch(resetSimulationAsync(simulationId));

    return (
        <div className="space-y-4 my-6">
            {/* Connection badge + engine status */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: isRunning ? Infinity : 0, duration: 2 }}
                        className={`p-2 rounded-full ${isRunning ? 'bg-emerald-500/15 text-emerald-400' : 'bg-neutral-800 text-neutral-500'}`}
                    >
                        <Zap className="size-5" />
                    </motion.div>
                    <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider">
                            {t('simulations.status', 'Engine Status')}
                        </p>
                        <p className="text-base font-bold text-white flex items-center gap-2">
                            {isRunning
                                ? t('simulations.running', 'Running')
                                : t('simulations.paused', 'Paused')}
                            {isConnected && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-normal">
                                    <Wifi className="size-3" />
                                    Live
                                </span>
                            )}
                            {!isConnected && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 font-normal">
                                    <WifiOff className="size-3" />
                                    Disconnected
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-2 px-3 py-2 text-xs bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors border border-neutral-700"
                    >
                        <RotateCcw className="size-3.5" />
                        {t('simulations.reset', 'Reset')}
                    </button>
                    {isRunning ? (
                        <button
                            onClick={handlePause}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition-colors"
                        >
                            <Pause className="size-3.5" />
                            {t('simulations.pause', 'Pause')}
                        </button>
                    ) : (
                        <button
                            onClick={handleStart}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-xs bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold transition-colors"
                        >
                            <Play className="size-3.5" />
                            {t('simulations.start', 'Start')}
                        </button>
                    )}
                </div>
            </div>

            {/* Live metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <LiveMetric
                    icon={Activity}
                    label={t('simulations.powerDraw', 'Power Draw')}
                    value={streamData ? streamData.currentLoadW : totalPower}
                    unit="W"
                />
                <LiveMetric
                    icon={Zap}
                    label={t('simulations.energyConsumed', 'Energy Used')}
                    value={streamData ? streamData.totalKWh.toFixed(4) : '0'}
                    unit="kWh"
                />
                <LiveMetric
                    icon={Coins}
                    label={t('simulations.estimatedBill', 'Est. Bill')}
                    value={streamData ? streamData.estimatedBill.toFixed(2) : '0'}
                    unit="EGP"
                    prefix=""
                />
                <LiveMetric
                    icon={Layers}
                    label={t('simulations.tier', 'Billing Tier')}
                    value={streamData ? streamData.currentTier : '-'}
                    unit=""
                    prefix={t('simulations.tierPrefix', 'Tier ')}
                />
            </div>

            {/* Tick counter */}
            {streamData && (
                <div className="flex items-center justify-end gap-2 text-[11px] text-neutral-500">
                    <Gauge className="size-3" />
                    {t('simulations.ticks', 'Ticks')}: {streamData.tickCount}
                    {streamData.startedAt && (
                        <>
                            <span className="mx-1">·</span>
                            {t('simulations.started', 'Started')}: {new Date(streamData.startedAt).toLocaleTimeString()}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default EngineControlPanel;
