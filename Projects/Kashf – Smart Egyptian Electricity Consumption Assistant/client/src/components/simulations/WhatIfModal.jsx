import { motion } from 'framer-motion';
import {
    AlertCircle,
    BarChart3,
    Clock,
    Minus,
    Plus,
    TrendingDown,
    TrendingUp,
    X,
    Zap
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { clearWhatIf, fetchWhatIfAsync } from '../../store/simulations/simulationSlice';

const DurationControl = ({ value, onChange }) => (
    <div className="flex items-center gap-2">
        <button
            onClick={() => onChange(Math.max(15, value - 15))}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
        >
            <Minus className="size-3.5" />
        </button>
        <div className="relative">
            <input
                type="number"
                min={15}
                max={1440}
                value={value}
                onChange={(e) => onChange(Math.max(15, Math.min(1440, parseInt(e.target.value) || 15)))}
                className="w-20 text-center bg-neutral-800 border border-neutral-700 text-white rounded-lg py-2 text-sm font-mono focus:outline-none focus:border-kashf-blue/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
        </div>
        <button
            onClick={() => onChange(Math.min(1440, value + 15))}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
        >
            <Plus className="size-3.5" />
        </button>
    </div>
);

const ComparisonRow = ({ label, currentVal, whatIfVal, unit, formatter, diff }) => {
    const valDiff = whatIfVal - currentVal;
    const isBetter = diff !== undefined ? diff < 0 : valDiff < 0;
    const isWorse = diff !== undefined ? diff > 0 : valDiff > 0;

    return (
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-center py-2.5 border-b border-neutral-800/50 last:border-0">
            <span className="text-sm text-neutral-400">{label}</span>
            <span className="text-sm font-mono text-neutral-300 text-right">{formatter ? formatter(currentVal) : currentVal}<span className="text-[10px] text-neutral-500 ml-1">{unit}</span></span>
            <span className="text-neutral-600">→</span>
            <span className="text-sm font-mono text-white text-right">{formatter ? formatter(whatIfVal) : whatIfVal}<span className="text-[10px] text-neutral-500 ml-1">{unit}</span></span>
            {(diff !== undefined || valDiff !== 0) && (
                <div className="col-span-4 flex justify-end">
                    <span className={`text-xs font-medium flex items-center gap-1 ${isBetter ? 'text-emerald-400' : isWorse ? 'text-red-400' : 'text-neutral-500'
                        }`}>
                        {isBetter ? <TrendingDown className="size-3" /> : isWorse ? <TrendingUp className="size-3" /> : <Minus className="size-3" />}
                        {(diff !== undefined ? diff : valDiff) > 0 ? '+' : ''}{(diff !== undefined ? diff : valDiff).toFixed(2)} {unit}
                    </span>
                </div>
            )}
        </div>
    );
};

const WhatIfModal = ({ isOpen, onClose, simulationId, circuits }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { whatIfData, whatIfLoading, whatIfError } = useSelector(state => state.simulations);

    const [duration, setDuration] = useState(60);
    const [toggles, setToggles] = useState({});

    const flatDevices = useMemo(() => {
        if (!circuits) return [];
        return circuits.flatMap(circuit =>
            (circuit.devices || []).map(device => ({
                ...device,
                circuitName: circuit.name,
                circuitId: circuit._id || circuit.id,
            }))
        );
    }, [circuits]);

    const pendingChanges = useMemo(() => {
        return Object.entries(toggles)
            .filter(([_, targetState]) => {
                const device = flatDevices.find(d => (d._id || d.id) === _);
                return device && device.isOn !== targetState;
            })
            .map(([deviceId, isOn]) => ({ deviceId, isOn }));
    }, [toggles, flatDevices]);

    const toggleDevice = (deviceId, currentIsOn) => {
        setToggles(prev => {
            const next = { ...prev };
            const targetState = deviceId in prev ? !prev[deviceId] : !currentIsOn;
            if (targetState === currentIsOn) {
                delete next[deviceId];
            } else {
                next[deviceId] = targetState;
            }
            return next;
        });
    };

    const handleRunAnalysis = () => {
        const toggleDevices = Object.entries(toggles).map(([deviceId, isOn]) => ({ deviceId, isOn }));
        if (toggleDevices.length === 0) return;
        dispatch(fetchWhatIfAsync({ simulationId, toggleDevices, durationMinutes: duration }));
    };

    const handleClose = () => {
        dispatch(clearWhatIf());
        setToggles({});
        setDuration(60);
        onClose();
    };

    if (!isOpen) return null;

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
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                            <BarChart3 className="size-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                            {t('simulations.whatIfTitle', 'What-If Analysis')}
                        </h3>
                    </div>
                    <button onClick={handleClose} className="p-1.5 text-neutral-500 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors">
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4">
                    {/* Duration selector */}
                    <div className="flex items-center justify-between bg-neutral-800/40 border border-neutral-700/50 rounded-xl p-3">
                        <div className="flex items-center gap-2">
                            <Clock className="size-4 text-neutral-400" />
                            <span className="text-sm text-neutral-300">{t('simulations.whatIfDuration', 'Project over')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DurationControl value={duration} onChange={setDuration} />
                            <span className="text-xs text-neutral-500">{t('simulations.minutes', 'min')}</span>
                        </div>
                    </div>

                    {/* Device list */}
                    <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">{t('simulations.whatIfDevices', 'Toggle Devices')}</p>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {flatDevices.map((device) => {
                                const deviceKey = device._id || device.id;
                                const targetOn = deviceKey in toggles ? toggles[deviceKey] : device.isOn;
                                const isChanged = deviceKey in toggles;

                                return (
                                    <button
                                        key={deviceKey}
                                        onClick={() => toggleDevice(deviceKey, device.isOn)}
                                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-sm transition-all ${isChanged
                                                ? 'bg-amber-500/10 border border-amber-500/30'
                                                : 'bg-neutral-800/30 border border-transparent hover:bg-neutral-800/60'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div className={`p-1 rounded-lg ${targetOn ? 'bg-amber-500/10 text-amber-400' : 'bg-neutral-800 text-neutral-500'}`}>
                                                <Zap className="size-3.5" />
                                            </div>
                                            <div className="text-left min-w-0">
                                                <p className="font-medium text-white truncate">{device.name}</p>
                                                <p className="text-[10px] text-neutral-500">{device.circuitName} · {device.wattage ?? device.power ?? 0}W</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${targetOn ? 'text-emerald-400' : 'text-neutral-500'
                                                }`}>
                                                {targetOn ? t('simulations.on', 'ON') : t('simulations.off', 'OFF')}
                                            </span>
                                            {isChanged && (
                                                <span className="text-[10px] text-amber-400 font-medium">
                                                    ({device.isOn ? 'OFF' : 'ON'})
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Run Analysis button */}
                    <button
                        onClick={handleRunAnalysis}
                        disabled={pendingChanges.length === 0 || whatIfLoading}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-neutral-800 disabled:to-neutral-800 disabled:text-neutral-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-amber-500/20 disabled:shadow-none"
                    >
                        {whatIfLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        ) : (
                            <BarChart3 className="size-4" />
                        )}
                        {whatIfLoading
                            ? t('simulations.whatIfCalculating', 'Calculating...')
                            : t('simulations.whatIfRun', 'Run Analysis')}
                        {pendingChanges.length > 0 && !whatIfLoading && (
                            <span className="text-xs opacity-70">({pendingChanges.length} {t('simulations.changes', 'changes')})</span>
                        )}
                    </button>

                    {/* Error state */}
                    {whatIfError && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                            <AlertCircle className="size-4 text-red-400 shrink-0" />
                            <p className="text-xs text-red-400">{whatIfError}</p>
                        </div>
                    )}

                    {/* Results comparison */}
                    {whatIfData && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-neutral-800/40 border border-neutral-700/50 rounded-xl p-4 space-y-1"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <BarChart3 className="size-4 text-amber-400" />
                                    {t('simulations.whatIfResults', 'Comparison Results')}
                                </h4>
                                <span className="text-[10px] text-neutral-500">
                                    {whatIfData.changes.durationMinutes} {t('simulations.minutes', 'min')}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-[10px] text-neutral-500 uppercase tracking-wider pb-1 border-b border-neutral-700/50">
                                <span>{t('simulations.metric', 'Metric')}</span>
                                <span className="text-center">{t('simulations.current', 'Current')}</span>
                                <span className="text-center">{t('simulations.whatIf', 'What-If')}</span>
                            </div>

                            <ComparisonRow
                                label={t('simulations.load', 'Load')}
                                currentVal={whatIfData.current.totalLoadW}
                                whatIfVal={whatIfData.whatIf.totalLoadW}
                                unit="W"
                                diff={whatIfData.difference.loadWDiff}
                            />
                            <ComparisonRow
                                label={t('simulations.projectKWh', 'Projected kWh')}
                                currentVal={whatIfData.current.projectedKWhAfter}
                                whatIfVal={whatIfData.whatIf.projectedKWhAfter}
                                unit="kWh"
                                diff={whatIfData.difference.kWhDiff}
                            />
                            <ComparisonRow
                                label={t('simulations.projectBill', 'Projected Bill')}
                                currentVal={whatIfData.current.projectedBillAfter}
                                whatIfVal={whatIfData.whatIf.projectedBillAfter}
                                unit={t('currency', 'EGP')}
                                formatter={(v) => v.toFixed(2)}
                                diff={whatIfData.difference.billDiff}
                            />
                            <ComparisonRow
                                label={t('simulations.tier', 'Tier')}
                                currentVal={whatIfData.current.projectedTierAfter}
                                whatIfVal={whatIfData.whatIf.projectedTierAfter}
                                unit=""
                                diff={whatIfData.difference.tierDiff}
                            />

                            {whatIfData.difference.tierDiff < 0 && (
                                <div className="flex items-center gap-2 mt-2 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                                    <TrendingDown className="size-4 text-emerald-400 shrink-0" />
                                    <p className="text-xs text-emerald-400 font-medium">
                                        {t('simulations.whatIfTierSave', 'This change would keep you in a lower billing tier!')}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default WhatIfModal;