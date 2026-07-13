import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { addCircuitAsync } from '../../store/simulations/simulationSlice';

const AddCircuitModal = ({ isOpen, onClose, simulationId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [breakerCapacity, setBreakerCapacity] = useState(15);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        try {

            if (simulationId) {
                await dispatch(addCircuitAsync({
                    simulationId,
                    data: { name }
                })).unwrap();
            }

            // Reset and close
            setName('');
            setBreakerCapacity(15);
            onClose();
        } catch (error) {
            console.error("Failed to validate circuit:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-kashf-surface border border-kashf-border rounded-2xl shadow-2xl overflow-hidden my-auto"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Zap className="size-5 text-kashf-blue" />
                                {t('simulations.addCircuit', "Add Circuit")}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-1">
                                        {t('simulations.circuitName', "Circuit Name")}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t('simulations.circuitNamePlaceholder', "e.g., Kitchen, Living Room")}
                                        className="w-full bg-neutral-900 border border-neutral-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-kashf-blue focus:ring-1 focus:ring-kashf-blue transition-all"
                                    />
                                </div>



                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors"
                                >
                                    {t('common.cancel', "Cancel")}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !name.trim()}
                                    className="flex-1 py-3 bg-kashf-blue hover:bg-opacity-90 disabled:opacity-50 disabled:hover:bg-kashf-blue text-kashf-bg rounded-xl font-bold transition-colors"
                                >
                                    {isSubmitting ? t('common.saving', "Saving...") : t('common.save', "Save")}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddCircuitModal;
