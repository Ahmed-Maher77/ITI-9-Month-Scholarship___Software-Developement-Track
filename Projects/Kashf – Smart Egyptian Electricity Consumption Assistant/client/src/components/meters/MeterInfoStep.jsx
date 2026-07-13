import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MeterInfoStep = ({ formData, setFormData }) => {
    const { t } = useTranslation();
    
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="space-y-4"
        >
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">{t('meters.formName', "Meter Name / Location")}</label>
                <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kashf-blue focus:ring-1 focus:ring-kashf-blue transition-all"
                    placeholder={t('meters.formNamePlaceholder', "e.g., Home, Beach House")}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">{t('meters.formNumber', "Meter Number")}</label>
                <input 
                    type="text" 
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kashf-blue focus:ring-1 focus:ring-kashf-blue transition-all"
                    placeholder={t('meters.formNumberPlaceholder', "10-digit meter number")}
                />
            </div>
            <div className="relative">
                <label className="block text-sm font-medium text-neutral-400 mb-1">{t('meters.formType', "Meter Type")}</label>
                <div className="relative">
                    <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kashf-blue focus:ring-1 focus:ring-kashf-blue transition-all appearance-none"
                    >
                        <option value="residential">{t('meters.typeResidential', "Residential")}</option>
                        <option value="commercial">{t('meters.typeCommercial', "Commercial")}</option>
                        <option value="vacation">{t('meters.typeVacation', "Vacation Home")}</option>
                    </select>
                    <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-4 pointer-events-none text-neutral-400">
                        <ChevronDown className="size-4" />
                    </div>
                </div>
            </div>
            
            <div className="relative">
                <label className="block text-sm font-medium text-neutral-400 mb-1">{t('meters.formStatus', "Status")}</label>
                <div className="relative">
                    <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kashf-blue focus:ring-1 focus:ring-kashf-blue transition-all appearance-none"
                    >
                        <option value="active">{t('meters.status.active', "Active")}</option>
                        <option value="inactive">{t('meters.status.inactive', "Inactive")}</option>
                        <option value="maintenance">{t('meters.status.maintenance', "Maintenance")}</option>
                    </select>
                    <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-4 pointer-events-none text-neutral-400">
                        <ChevronDown className="size-4" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MeterInfoStep;
