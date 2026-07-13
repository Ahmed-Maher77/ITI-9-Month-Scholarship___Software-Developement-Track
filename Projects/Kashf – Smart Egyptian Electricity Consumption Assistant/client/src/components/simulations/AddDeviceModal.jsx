import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    PlusCircle,
    Monitor,
    Coffee,
    Wind,
    Sun,
    Tv,
    Power
} from 'lucide-react';
import { addDeviceAsync } from '../../store/simulations/simulationSlice';

const DEVICE_ICONS = [
    { id: 'lighting', icon: Sun, label: 'Lighting' },
    { id: 'ac', icon: Wind, label: 'AC / HVAC' },
    { id: 'fridge', icon: Monitor, label: 'Appliance' },
    { id: 'tv', icon: Tv, label: 'Electronics' },
    { id: 'coffee', icon: Coffee, label: 'Kitchen' },
    { id: 'default', icon: Power, label: 'Other' },
];

const AddDeviceModal = ({ isOpen, onClose, circuit, simulationId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [power, setPower] = useState(100);
    const [selectedIcon, setSelectedIcon] = useState('default');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !circuit) return;

        setIsSubmitting(true);
        try {
            await dispatch(addDeviceAsync({
                simulationId,
                data: {
                    circuitId: circuit._id || circuit.id,
                    name: name.trim(),
                    wattage: Number(power),
                }
            })).unwrap();

            setName('');
            setPower(100);
            setSelectedIcon('default');
            onClose();
        } catch (error) {
            console.error("Failed to add device:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && circuit && (
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
                        className="relative w-full max-w-md bg-kashf-surface border border-kashf-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-neutral-800 shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <PlusCircle className="size-5 text-kashf-blue" />
                                    {t('simulations.addDeviceTo', "Add Device")}
                                </h2>
                                <p className="text-sm text-neutral-400 mt-1 rtl:mt-2">{t('simulations.toCircuit', "To Circuit:")} <span className="text-white font-medium">{circuit.name}</span></p>
                            </div>
                            <button 
                                onClick={onClose}
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6">
                            <form id="add-device-form" onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2.5">
                                        {t('simulations.deviceName', "Device Name")}
                                    </label>
                                    <input 
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t('simulations.deviceNamePlaceholder', "e.g., Living Room TV")}
                                        className="w-full bg-neutral-900 border border-neutral-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-kashf-blue focus:ring-1 focus:ring-kashf-blue transition-all"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2.5">
                                        {t('simulations.devicePower', "Power Consumption (Watts)")}
                                    </label>
                                    <input 
                                        type="number"
                                        required
                                        min="1"
                                        max="10000"
                                        value={power}
                                        onChange={(e) => setPower(e.target.value)}
                                        className="w-full bg-neutral-900 border border-neutral-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-kashf-blue focus:ring-1 focus:ring-kashf-blue transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2.5">
                                        {t('simulations.deviceType', "Device Type")}
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {DEVICE_ICONS.map((item) => {
                                            const Icon = item.icon;
                                            const isSelected = selectedIcon === item.id;
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => setSelectedIcon(item.id)}
                                                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                                                        isSelected 
                                                            ? 'bg-kashf-blue/10 border-kashf-blue text-kashf-light-blue' 
                                                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                                                    }`}
                                                >
                                                    <Icon className="size-6" />
                                                    <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t border-neutral-800 shrink-0 bg-kashf-surface">
                            <div className="flex gap-3">
                                <button 
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors"
                                >
                                    {t('common.cancel', "Cancel")}
                                </button>
                                <button 
                                    type="submit"
                                    form="add-device-form"
                                    disabled={isSubmitting || !name.trim()}
                                    className="flex-1 py-3 bg-kashf-blue hover:bg-opacity-90 disabled:opacity-50 disabled:hover:bg-kashf-blue text-kashf-bg rounded-xl font-bold transition-colors"
                                >
                                    {isSubmitting ? t('common.saving', "Saving...") : t('common.save', "Save")}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddDeviceModal;
