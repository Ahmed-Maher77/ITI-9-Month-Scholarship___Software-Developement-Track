import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion';
import { fetchSimulations, fetchSimulation, fetchAdviceAsync, clearAdvice, fetchPredictionAsync, fetchRecommendationsAsync } from '../store/simulations/simulationSlice';
import { fetchMeters } from '../store/meters/metersSlice';
import {
    ArrowLeft,
    ArrowRight,
    Sparkles,
    Lightbulb,
    BarChart3,
    AlertCircle,
    Zap,
    Activity,
    Layers,
    Gauge,
} from 'lucide-react';
import TierPredictionCard from '../components/simulations/TierPredictionCard';
import RecommendationsModal from '../components/simulations/RecommendationsModal';
import WhatIfModal from '../components/simulations/WhatIfModal';
import AIAdviceModal from '../components/simulations/AIAdviceModal';

const SimulationOverviewPage = () => {
    const { id: meterId } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const { simulations, currentSimulation, isLoading: isSimLoading } = useSelector(state => state.simulations);
    const { meters, isLoading: isMetersLoading } = useSelector(state => state.meters);

    const [isAdviceOpen, setIsAdviceOpen] = useState(false);
    const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
    const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);

    const { adviceData, adviceLoading, adviceError, predictionData, predictionLoading } = useSelector(state => state.simulations);

    useEffect(() => {
        if (meters.length === 0) {
            dispatch(fetchMeters());
        }
        dispatch(fetchSimulations());
    }, [dispatch, meters.length]);

    const meter = useMemo(() => {
        return meters.find(m => m.id === meterId);
    }, [meters, meterId]);

    const localSimulation = useMemo(() => {
        if (!meter) return null;
        return simulations.find(s => s.name === meter.name);
    }, [simulations, meter]);

    useEffect(() => {
        if (localSimulation && (!currentSimulation || currentSimulation.id !== localSimulation.id)) {
            dispatch(fetchSimulation(localSimulation.id));
        }
    }, [localSimulation, currentSimulation, dispatch]);

    useEffect(() => {
        if (currentSimulation?.id) {
            dispatch(fetchPredictionAsync(currentSimulation.id));
        }
    }, [currentSimulation?.id, dispatch]);

    const circuits = currentSimulation?.circuits || [];
    const circuitCount = circuits.length;
    const deviceCount = circuits.reduce((sum, c) => sum + (c.devices?.length || 0), 0);
    const totalLoad = circuits.reduce((sum, c) => {
        return sum + (c.devices?.reduce((s, d) => s + (d.isOn ? d.power : 0), 0) || 0);
    }, 0);

    const featureCards = [
        {
            key: 'recommendations',
            icon: Lightbulb,
            title: t('simulations.recommendations', 'Recommendations'),
            desc: t('simulations.recommendationsDesc', 'Get AI-powered optimization tips tailored to your consumption patterns.'),
            gradient: 'from-kashf-blue to-sky-500',
            shadow: 'shadow-kashf-blue/20',
            onClick: () => {
                dispatch(fetchRecommendationsAsync(currentSimulation.id));
                setIsRecommendationsOpen(true);
            },
        },
        {
            key: 'whatif',
            icon: BarChart3,
            title: t('simulations.whatIf', 'What-If'),
            desc: t('simulations.whatIfDesc', 'Simulate changes to devices, usage hours, or add new appliances and see the impact.'),
            gradient: 'from-amber-600 to-amber-500',
            shadow: 'shadow-amber-500/20',
            onClick: () => setIsWhatIfOpen(true),
        },
        {
            key: 'aiAdvice',
            icon: Sparkles,
            title: t('simulations.aiAdvice', 'AI Energy Advice'),
            desc: t('simulations.aiAdviceDesc', 'Get personalized, actionable advice to reduce your electricity bill and save energy.'),
            gradient: 'from-emerald-600 to-emerald-500',
            shadow: 'shadow-emerald-500/20',
            onClick: () => {
                dispatch(fetchAdviceAsync(currentSimulation.id));
                setIsAdviceOpen(true);
            },
        },
    ];

    const isLoading = isSimLoading || isMetersLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kashf-blue"></div>
            </div>
        );
    }

    if (!currentSimulation) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <AlertCircle className="size-12 text-neutral-500 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">{t('simulations.notFoundTitle', 'No Simulation Found')}</h2>
                <p className="text-neutral-400 mb-6">{t('simulations.notFoundDesc', 'There is no simulation profile attached to this meter yet.')}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                >
                    {t('common.goBack', 'Go Back')}
                </button>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>نظرة عامة على المحاكاة — كشف</title>
                <meta name="description" content="نظرة عامة على محاكاة استهلاك الكهرباء — توقع الشريحة، التوصيات الذكية، وتحليل what-if." />
            </Helmet>
            <div className="space-y-6 max-w-7xl mx-auto pb-10 rtl:leading-relaxed">
            {/* Header with navigation to dashboard */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-1 text-neutral-400 hover:text-white rounded-xl transition-colors"
                    >
                        {i18n.dir() === 'rtl' ? <ArrowRight className="size-6" /> : <ArrowLeft className="size-6" />}
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            {t('simulations.overviewTitle', 'Simulation Overview')}
                        </h1>
                        <p className="text-neutral-400 text-sm mt-1 rtl:mt-3">
                            {meter ? `${t('meters.meter')} ${meter.name} - #${meter.number}` : t('simulations.loadingMeter', 'Loading Meter...')}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => navigate(`/meters/${meterId}/simulation`)}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Zap className="size-4" />
                    {t('simulations.goToDashboard', 'Go to Dashboard')}
                </button>
            </div>

            {/* Simulation stats summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-kashf-blue/10 text-kashf-blue">
                            <Layers className="size-3.5" />
                        </div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t('simulations.circuits', 'Circuits')}</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{circuitCount}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                    className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-kashf-blue/10 text-kashf-blue">
                            <Activity className="size-3.5" />
                        </div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t('simulations.devices', 'Devices')}</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{deviceCount}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Zap className="size-3.5" />
                        </div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t('simulations.totalLoad', 'Total Load')}</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{totalLoad} <span className="text-sm text-neutral-500 font-normal">W</span></p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                            <Gauge className="size-3.5" />
                        </div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t('simulations.status', 'Status')}</p>
                    </div>
                    <p className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="inline-block size-2 rounded-full bg-emerald-400" />
                        {t('simulations.active', 'Active')}
                    </p>
                </motion.div>
            </div>

            {/* Tier Prediction Card */}
            <TierPredictionCard 
                predictionData={predictionData}
                predictionLoading={predictionLoading}
                onRefresh={() => dispatch(fetchPredictionAsync(currentSimulation.id))}
            />

            {/* AI Feature Cards */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">{t('simulations.aiFeatures', 'AI Features')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {featureCards.map((card) => (
                        <motion.button
                            key={card.key}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={card.onClick}
                            className="text-start bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-xl p-5 transition-all group"
                        >
                            <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${card.gradient} bg-opacity-10 text-white mb-3 shadow-lg ${card.shadow}`}>
                                <card.icon className="size-5" />
                            </div>
                            <h3 className="text-base font-bold text-white mb-1.5">{card.title}</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">{card.desc}</p>
                            <div className={`mt-3 text-xs font-medium bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity`}>
                                {i18n.dir() === 'rtl' ? '← ' + t('common.open', 'Open') : t('common.open', 'Open') + ' →'}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            <RecommendationsModal
                isOpen={isRecommendationsOpen}
                onClose={() => setIsRecommendationsOpen(false)}
            />

            <WhatIfModal
                isOpen={isWhatIfOpen}
                onClose={() => setIsWhatIfOpen(false)}
                simulationId={currentSimulation.id}
                circuits={currentSimulation.circuits}
            />

            <AIAdviceModal 
                isOpen={isAdviceOpen}
                onClose={() => { setIsAdviceOpen(false); dispatch(clearAdvice()); }}
                adviceData={adviceData}
                adviceLoading={adviceLoading}
                adviceError={adviceError}
                onRetry={() => dispatch(fetchAdviceAsync(currentSimulation.id))}
            />
        </div>
        </>
    );
};

export default SimulationOverviewPage;
