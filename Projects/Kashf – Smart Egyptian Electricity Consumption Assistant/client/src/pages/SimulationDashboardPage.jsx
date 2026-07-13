import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Plus,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import AddCircuitModal from '../components/simulations/AddCircuitModal';
import AddDeviceModal from '../components/simulations/AddDeviceModal';
import AIAdviceModal from '../components/simulations/AIAdviceModal';
import CircuitCard from '../components/simulations/CircuitCard';
import EmptyCircuitsState from '../components/simulations/EmptyCircuitsState';
import EngineControlPanel from '../components/simulations/EngineControlPanel';
import RecommendationsModal from '../components/simulations/RecommendationsModal';
import WhatIfModal from '../components/simulations/WhatIfModal';
import simulationService from '../services/simulationService';
import { fetchMeters } from '../store/meters/metersSlice';
import { clearAdvice, clearStreamData, fetchAdviceAsync, fetchSimulation, fetchSimulations, setStreamConnected, setStreamData } from '../store/simulations/simulationSlice';


// Fetches real-time data and calculates aggregate power usage across circuits and devices.
const SimulationDashboardPage = () => {
    const { id: meterId } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const { simulations, currentSimulation, streamData, isStreamConnected, isLoading: isSimLoading } = useSelector(state => state.simulations);
    const { meters, isLoading: isMetersLoading } = useSelector(state => state.meters);

    const [isAddCircuitOpen, setIsAddCircuitOpen] = useState(false);
    const [selectedCircuitForDevice, setSelectedCircuitForDevice] = useState(null);
    const [isAdviceOpen, setIsAdviceOpen] = useState(false);
    const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
    const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);

    const { adviceData, adviceLoading, adviceError } = useSelector(state => state.simulations);

    // Fetch dependencies: Both meters (to resolve the current meter by ID) and simulations (to match against the meter's name/profile).
    useEffect(() => {
        if (meters.length === 0) {
            dispatch(fetchMeters());
        }
        dispatch(fetchSimulations());
    }, [dispatch, meters.length]);

    const meter = useMemo(() => {
        return meters.find(m => m.id === meterId);
    }, [meters, meterId]);

    // Resolves the simulation matching the active meter's name.
    const localSimulation = useMemo(() => {
        if (!meter) return null;
        return simulations.find(s => s.name === meter.name);
    }, [simulations, meter]);

    // Fetch deep simulation data once the shallow profile is resolved
    useEffect(() => {
        if (localSimulation && (!currentSimulation || currentSimulation.id !== localSimulation.id)) {
            dispatch(fetchSimulation(localSimulation.id));
        }
    }, [localSimulation, currentSimulation, dispatch]);

    // SSE connection — connects when currentSimulation is loaded, disconnects on unmount
    useEffect(() => {
        if (!currentSimulation?.id) return;

        dispatch(setStreamConnected(false));

        const controller = simulationService.streamSimulation(
            currentSimulation.id,
            (data) => dispatch(setStreamData(data)),
            (error) => {
                console.error('SSE error:', error);
                dispatch(setStreamConnected(false));
            }
        );

        dispatch(setStreamConnected(true));

        return () => {
            controller.abort();
            dispatch(clearStreamData());
        };
    }, [currentSimulation?.id, dispatch]);

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

    // Aggregates live power draw across all active devices in all circuits.
    // Used as fallback when streamData is not yet available.
    const totalPower = currentSimulation.circuits?.reduce((sum, circuit) => {
        return sum + (circuit.devices?.reduce((deviceSum, d) => deviceSum + (d.isOn ? (d.wattage ?? d.power ?? 0) : 0), 0) || 0);
    }, 0) || 0;

    return (
        <>
            <Helmet>
                <title>محاكاة العداد — كشف</title>
                <meta name="description" content="لوحة تحكم محاكاة استهلاك الكهرباء — أدر الدوائر والأجهزة وشاهد تأثيرها الفوري على الاستهلاك." />
            </Helmet>
            <div className="space-y-6 max-w-7xl mx-auto pb-10 rtl:leading-relaxed">
            {/* Header */}
            <div className="flex items-start gap-4 mb-2">
                <button
                    onClick={() => navigate(-1)}
                    className="p-1 text-neutral-400 hover:text-white rounded-xl transition-colors"
                >
                    {i18n.dir() === 'rtl' ? <ArrowRight className="size-6" /> : <ArrowLeft className="size-6" />}
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {t('simulations.dashboardTitle', 'Simulation Dashboard')}
                    </h1>
                    <p className="text-neutral-400 text-sm mt-1 rtl:mt-3">
                        {meter ? `${t('meters.meter')} ${meter.name} - #${meter.number}` : t('simulations.loadingMeter', 'Loading Meter...')}
                    </p>
                </div>
            </div>

            <EngineControlPanel
                simulationId={currentSimulation.id}
                streamData={streamData}
                totalPower={totalPower}
            />

            {/* Circuits Grid Header */}
            <div className="flex items-center justify-between mt-8 mb-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {t('simulations.circuits', 'Electrical Circuits')}
                    <span className="bg-neutral-800 text-neutral-400 w-8 h-8 flex items-center justify-center py-0.5 px-2 mx-2 rounded-full font-mono">{currentSimulation.circuits?.length || 0}</span>
                </h2>
                <button
                    onClick={() => setIsAddCircuitOpen(true)}
                    className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="size-4" />
                    {t('simulations.addCircuit', 'Add Circuit')}
                </button>
            </div>

            {/* Circuits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSimulation.circuits?.map((circuit, index) => (
                    <CircuitCard
                        key={circuit._id || circuit.id || index}
                        circuit={circuit}
                        onAddDevice={() => setSelectedCircuitForDevice(circuit)}
                        simulationId={currentSimulation.id}
                    />
                ))}

                {(!currentSimulation.circuits || currentSimulation.circuits.length === 0) && (
                    <EmptyCircuitsState onAddClick={() => setIsAddCircuitOpen(true)} />
                )}
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

            <AddCircuitModal
                isOpen={isAddCircuitOpen}
                onClose={() => setIsAddCircuitOpen(false)}
                simulationId={currentSimulation.id}
            />

            <AddDeviceModal
                isOpen={!!selectedCircuitForDevice}
                onClose={() => setSelectedCircuitForDevice(null)}
                circuit={selectedCircuitForDevice}
                simulationId={currentSimulation.id}
            />
        </div>
        </>
    );
};

export default SimulationDashboardPage;
