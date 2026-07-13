import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const DeleteMeterModal = ({ isOpen, onClose, onConfirm }) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-sm bg-kashf-surface border border-kashf-border rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center my-auto"
                    >
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
                            <Trash2 className="size-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{t('meters.deleteConfirmTitle', "Delete Meter?")}</h3>
                        <p className="text-sm text-neutral-400 mb-6">
                            {t('meters.deleteConfirmDesc', "Are you sure you want to delete this meter? This action cannot be undone.")}
                        </p>
                        <div className="flex gap-3 w-full">
                            <button 
                                onClick={onClose}
                                className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors"
                            >
                                {t('common.cancel', "Cancel")}
                            </button>
                            <button 
                                onClick={onConfirm}
                                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors"
                            >
                                {t('meters.deleteMeter', "Delete")}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DeleteMeterModal;
