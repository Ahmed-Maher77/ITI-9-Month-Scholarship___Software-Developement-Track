import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ChevronDown, Check, ArrowRight, ArrowLeft, Home, Settings, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createSimulationAsync } from '../../store/simulations/simulationSlice';
import MeterInfoStep from './MeterInfoStep';
import SimulationModeStep from './SimulationModeStep';

// A multi-step modal wizard for creating or editing a meter.
// Step 1: Basic meter information (Name, Number, Type).
// Step 2: Simulation Mode (Auto-generate simulation, empty simulation, or none).
// Note: Step 2 is skipped when editing an existing meter.
const MeterFormModal = ({ isOpen, onClose, onSave, meter }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [step, setStep] = useState(1); // 1: Meter Info, 2: Simulation Mode
    const [error, setError] = useState(null);
    
    // Step 1: Basic Meter Details
    const [formData, setFormData] = useState({
        name: meter?.name || '',
        number: meter?.number || '',
        type: meter?.type || 'residential',
        status: meter?.status || 'active'
    });

    // Step 2: Simulation Auto-Generation Rules
    const [simMode, setSimMode] = useState('auto'); // 'auto' | 'custom' | 'none'
    const [isSaving, setIsSaving] = useState(false);

    // Reset form state when the modal opens or the selected meter changes
    useEffect(() => {
        setError(null);
        if (meter) {
            setFormData({
                name: meter.name,
                number: meter.number,
                type: meter.type,
                status: meter.status || 'active'
            });
            setStep(1);
        } else {
            setFormData({ name: '', number: '', type: 'residential', status: 'active' });
            setSimMode('auto');
            setStep(1);
        }
    }, [meter, isOpen]);

    const handleNext = () => {
        if (step === 1 && !meter) {
            setStep(2);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const getLocalizedErrorMessage = (errMsg) => {
        if (!errMsg) return '';
        const errMsgStr = typeof errMsg === 'string' ? errMsg : String(errMsg);
        if (errMsgStr.includes("maximum number of meters allowed")) {
            const match = errMsgStr.match(/\((\d+)\)/);
            const limit = match ? match[1] : '';
            return t("meters.maxMetersError", { 
                limit, 
                defaultValue: `You have reached the maximum number of meters allowed for your plan (${limit}). Please upgrade your plan to register more meters.` 
            });
        }
        if (errMsgStr.includes("already exists")) {
            return t("meters.alreadyExistsError", { 
                defaultValue: "Meter with this number already exists for this user." 
            });
        }
        return errMsgStr;
    };

    // Handles final form submission.
    const handleSubmit = async () => {
        setIsSaving(true);
        setError(null);
        try {
            // First save meter via parent callback (creates/updates meter in DB)
            await onSave(formData);
            
            // If it's a new meter and a simulation environment was requested
            if (!meter && simMode !== 'none') {
                const autoGenerate = simMode === 'auto';
                // Fire off asynchronous simulation provisioning
                await dispatch(createSimulationAsync({ 
                    name: formData.name, 
                    autoGenerate 
                })).unwrap();
                onClose();
            }
        } catch (err) {
            console.error("Failed to save:", err);
            setError(getLocalizedErrorMessage(err.message || err || t("meters.failedToSave", "Failed to save meter. Please check your plan limits.")));
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-xl bg-kashf-surface border border-kashf-border rounded-2xl shadow-2xl overflow-hidden my-auto"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Zap className="size-5 text-kashf-light-blue" />
                                {meter ? t('meters.editMeter', "Edit Meter") : t('meters.addMeter', "Add New Meter")}
                            </h2>
                            <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                                <X className="size-5" />
                            </button>
                        </div>

                        {!meter && (
                            <div className="flex items-center justify-center pt-6 px-6">
                                <div className="flex items-center space-x-4">
                                    <div className={`flex items-center justify-center size-8 rounded-full font-bold ${step >= 1 ? 'bg-kashf-blue text-kashf-bg' : 'bg-neutral-800 text-neutral-400'}`}>1</div>
                                    <div className={`h-1 w-12 rounded ${step >= 2 ? 'bg-kashf-blue' : 'bg-neutral-800'}`}></div>
                                    <div className={`flex items-center justify-center size-8 rounded-full font-bold ${step >= 2 ? 'bg-kashf-blue text-kashf-bg' : 'bg-neutral-800 text-neutral-400'}`}>2</div>
                                </div>
                            </div>
                        )}
                        
                        <div className="p-6 space-y-4">
                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400 flex items-center gap-2">
                                    <AlertCircle className="size-4 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {step === 1 && (
                                <MeterInfoStep formData={formData} setFormData={setFormData} />
                            )}

                            {step === 2 && !meter && (
                                <SimulationModeStep simMode={simMode} setSimMode={setSimMode} />
                            )}

                            <div className="pt-4 flex gap-3">
                                {step === 1 ? (
                                    <>
                                        <button type="button" onClick={onClose} className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors">
                                            {t('common.cancel', "Cancel")}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={handleNext}
                                            disabled={!formData.name || !formData.number}
                                            className="flex-1 py-3 bg-kashf-blue hover:opacity-90 text-kashf-bg rounded-xl font-bold transition-opacity flex justify-center items-center gap-2 disabled:opacity-50"
                                        >
                                            {meter ? t('common.save', "Save") : t('common.next', "Next")} {!meter && <ArrowRight className="size-4 rtl:rotate-180" />}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" onClick={handleBack} className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors flex justify-center items-center gap-2">
                                            <ArrowLeft className="size-4 rtl:rotate-180" /> {t('common.previous', "Back")}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={handleNext}
                                            disabled={isSaving}
                                            className="flex-1 py-3 bg-kashf-blue hover:opacity-90 text-kashf-bg rounded-xl font-bold transition-opacity flex justify-center items-center gap-2"
                                        >
                                            {isSaving ? t('common.saving', "Saving...") : t('common.save', "Finish & Save")} <Check className="size-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MeterFormModal;
