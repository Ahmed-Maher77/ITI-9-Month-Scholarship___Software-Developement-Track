import {
    Coffee,
    LoaderCircle,
    Monitor,
    Plus,
    Power,
    Sun,
    Trash2,
    Tv,
    Wind
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteDeviceAsync, updateDeviceAsync } from '../../store/simulations/simulationSlice';
import DeleteConfirmModal from './DeleteConfirmModal';

// A simple icon mapper
const iconMap = {
    'ac': Wind,
    'fridge': Monitor, // placeholder
    'tv': Tv,
    'lighting': Sun,
    'coffee': Coffee,
    'default': Power
};

const CircuitCard = ({ circuit, onAddDevice, simulationId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);
    const [isDeleteCircuitModalOpen, setIsDeleteCircuitModalOpen] = useState(false);
    const [deviceToDelete, setDeviceToDelete] = useState(null);
    const [updatingDeviceId, setUpdatingDeviceId] = useState(null);

    const handleDeleteCircuit = async () => {
        try {
            // Simulated validation delay
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log('Delete Circuit UI Triggered:', { circuitId: circuit.id });
            // Backend integration handled by colleague
            setIsDeleteCircuitModalOpen(false);
        } catch (error) {
            console.error('Failed to validate delete circuit:', error);
        }
    };

    const handleDeleteDevice = async () => {
        if (!deviceToDelete) return;
        try {
            await dispatch(deleteDeviceAsync({
                simulationId,
                deviceId: deviceToDelete._id || deviceToDelete.id,
            })).unwrap();
            setDeviceToDelete(null);
        } catch (error) {
            console.error('Failed to delete device:', error);
        }
    };

    const handleToggleDevice = async (device) => {
        const deviceId = device._id || device.id;
        if (!deviceId) return;

        setUpdatingDeviceId(deviceId);
        try {
            await dispatch(updateDeviceAsync({
                simulationId,
                deviceId,
                data: {
                    isOn: !device.isOn,
                },
            })).unwrap();
        } catch (error) {
            console.error('Failed to toggle device:', error);
        } finally {
            setUpdatingDeviceId(null);
        }
    };

    // Calculate total power
    const circuitPower = circuit.devices?.reduce((sum, d) => sum + (d.isOn ? (d.wattage ?? d.power ?? 0) : 0), 0) || 0;

    return (
        <div
            className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-colors flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Circuit Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white">{t(`simulations.defaults.${circuit.name}`, circuit.name)}</h3>
                    <p className="text-xs text-neutral-400 mt-1">{circuit.breakerCapacity || 15} {t('simulations.breakerAmp', 'A Breaker')}</p>
                </div>
                <div className="text-end">
                    <p className="text-xs text-neutral-500">{t('simulations.circuitLoad', 'Current Load')}</p>
                    <p className="text-lg font-bold text-amber-400"><bdi>{circuitPower} W</bdi></p>
                </div>
            </div>

            {/* Devices List */}
            <div className="space-y-2 flex-1">
                {circuit.devices?.map((device, index) => {
                    const DeviceIcon = iconMap[device.icon] || iconMap['default'];
                    return (
                        <div key={device._id || device.id || index} className="flex items-center justify-between py-3 border-b border-neutral-800/50 last:border-0 hover:bg-neutral-800/20 px-2 rounded-lg transition-colors group">
                            <div className="flex items-start gap-3">
                                <div className={`${device.isOn ? 'text-amber-500' : 'text-neutral-500'}`}>
                                    <DeviceIcon className="size-5 mt-0.5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{t(`simulations.defaults.${device.name}`, device.name)}</p>
                                    <p className="text-xs text-neutral-500"><bdi>{device.wattage ?? device.power ?? 0} W</bdi></p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleToggleDevice(device)}
                                    disabled={updatingDeviceId === (device._id || device.id)}
                                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full transition-colors disabled:opacity-60 ${device.isOn ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700 hover:text-neutral-300'}`}
                                    title={device.isOn ? t('simulations.turnOffDevice', 'Turn off device') : t('simulations.turnOnDevice', 'Turn on device')}
                                >
                                    {updatingDeviceId === (device._id || device.id) ? (
                                        <LoaderCircle className="size-3.5 animate-spin" />
                                    ) : (
                                        <Power className="size-3.5" />
                                    )}
                                    {device.isOn ? t('simulations.on', 'ON') : t('simulations.off', 'OFF')}
                                </button>
                                <button
                                    onClick={() => setDeviceToDelete(device)}
                                    className="p-1.5 text-neutral-500 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
                                    title={t('simulations.deleteDevice', 'Delete Device')}
                                >
                                    <Trash2 className="size-3.5" />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {(!circuit.devices || circuit.devices.length === 0) && (
                    <div className="py-4 text-center text-sm text-neutral-500">
                        {t('simulations.noDevices', 'No devices connected')}
                    </div>
                )}
            </div>

            {/* Circuit Footer Actions */}
            <div className="mt-4 pt-4 border-t border-neutral-800 flex gap-2">
                <button
                    onClick={onAddDevice}
                    className="flex-1 bg-kashf-blue/10 hover:bg-kashf-blue/20 text-kashf-light-blue py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="size-4" />
                    {t('simulations.addDeviceBtn', 'Add Device')}
                </button>
                <button
                    onClick={() => setIsDeleteCircuitModalOpen(true)}
                    className="p-2 border border-neutral-700 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-neutral-400 rounded-xl transition-colors"
                    title={t('simulations.deleteCircuit', 'Delete Circuit')}
                >
                    <Trash2 className="size-4" />
                </button>
            </div>

            {/* Modals */}
            <DeleteConfirmModal
                isOpen={isDeleteCircuitModalOpen}
                onClose={() => setIsDeleteCircuitModalOpen(false)}
                simulationId={simulationId}
                circuitId={circuit._id || circuit.id}
                title={t('simulations.deleteCircuit', 'Delete Circuit')}
                message={t('simulations.deleteCircuitConfirm', 'Are you sure you want to delete this circuit?')}
            />

            <DeleteConfirmModal
                isOpen={!!deviceToDelete}
                onClose={() => setDeviceToDelete(null)}
                onConfirm={handleDeleteDevice}
                title={t('simulations.deleteDevice', 'Delete Device')}
                message={t('simulations.deleteDeviceConfirm', 'Are you sure you want to delete this device?')}
            />
        </div>
    );
};

export default CircuitCard;
