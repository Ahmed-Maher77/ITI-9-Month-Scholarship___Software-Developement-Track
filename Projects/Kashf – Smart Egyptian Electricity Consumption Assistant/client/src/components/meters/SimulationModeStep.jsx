import React from 'react';
import { motion } from 'framer-motion';
import { Home, Settings, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SimulationModeStep = ({ simMode, setSimMode }) => {
    const { t } = useTranslation();
    
    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="space-y-4"
        >
            <div className="text-center mb-8">
                <h3 className="text-lg font-medium text-white mb-2">{t('meters.createSimulationProfile', "Create Simulation Profile")}</h3>
                <p className="text-sm text-neutral-400 rtl:leading-relaxed">{t('meters.createSimulationProfileDesc', "Would you like to auto-generate a smart home simulation for this meter to start seeing live consumption analytics?")}</p>
            </div>

            <div className="space-y-3">
                <button 
                    type="button"
                    onClick={() => setSimMode('auto')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border ${simMode === 'auto' ? 'border-kashf-blue bg-kashf-blue/10' : 'border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800'} transition-all text-start`}
                >
                    <div className={`p-2 rounded-lg ${simMode === 'auto' ? 'bg-kashf-blue text-kashf-bg' : 'bg-neutral-800 text-neutral-400'}`}>
                        <Home className="size-5" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium text-white">{t('meters.simModeAuto', "Auto-Generate Smart Home")}</h4>
                        <p className="text-xs text-neutral-400 mt-1 rtl:leading-relaxed">{t('meters.simModeAutoDesc', "Pre-configures standard circuits (Kitchen, Living Room, etc.) and appliances.")}</p>
                    </div>
                    <Check className={`size-5 transition-opacity ${simMode === 'auto' ? 'opacity-100 text-kashf-blue' : 'opacity-0'}`} />
                </button>

                <button 
                    type="button"
                    onClick={() => setSimMode('custom')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border ${simMode === 'custom' ? 'border-kashf-blue bg-kashf-blue/10' : 'border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800'} transition-all text-start`}
                >
                    <div className={`p-2 rounded-lg ${simMode === 'custom' ? 'bg-kashf-blue text-kashf-bg' : 'bg-neutral-800 text-neutral-400'}`}>
                        <Settings className="size-5" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium text-white">{t('meters.simModeCustom', "Custom Setup")}</h4>
                        <p className="text-xs text-neutral-400 mt-1 rtl:leading-relaxed">{t('meters.simModeCustomDesc', "Start with an empty simulation profile. You can add circuits and devices later.")}</p>
                    </div>
                    <Check className={`size-5 transition-opacity ${simMode === 'custom' ? 'opacity-100 text-kashf-blue' : 'opacity-0'}`} />
                </button>

                <button 
                    type="button"
                    onClick={() => setSimMode('none')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border ${simMode === 'none' ? 'border-kashf-blue bg-kashf-blue/10' : 'border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800'} transition-all text-start`}
                >
                    <div className={`p-2 rounded-lg ${simMode === 'none' ? 'bg-kashf-blue text-kashf-bg' : 'bg-neutral-800 text-neutral-400'}`}>
                        <ArrowRight className="size-5 rtl:rotate-180" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium text-white">{t('meters.simModeSkip', "Skip for now")}</h4>
                        <p className="text-xs text-neutral-400 mt-1 rtl:leading-relaxed">{t('meters.simModeSkipDesc', "Just create the meter. I'll setup the simulation later.")}</p>
                    </div>
                    <Check className={`size-5 transition-opacity ${simMode === 'none' ? 'opacity-100 text-kashf-blue' : 'opacity-0'}`} />
                </button>
            </div>
        </motion.div>
    );
};

export default SimulationModeStep;
