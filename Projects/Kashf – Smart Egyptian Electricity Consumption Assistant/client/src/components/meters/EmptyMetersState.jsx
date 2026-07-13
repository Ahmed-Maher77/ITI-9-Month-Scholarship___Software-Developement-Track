import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

const EmptyMetersState = ({ onAddClick }) => {
    const { t } = useTranslation();
    
    return (
        <button 
            onClick={onAddClick}
            className="border-2 border-dashed border-neutral-800 hover:border-kashf-blue/50 bg-neutral-900/20 hover:bg-kashf-blue/5 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] transition-all group"
        >
            <div className="size-12 rounded-full bg-neutral-800 group-hover:bg-kashf-blue/20 flex items-center justify-center mb-4 transition-colors">
                <Plus className="size-6 text-neutral-400 group-hover:text-kashf-light-blue" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">{t('meters.registerMeter')}</h3>
            <p className="text-sm text-neutral-400 text-center max-w-xs">{t('meters.registerMeterDesc')}</p>
        </button>
    );
};

export default EmptyMetersState;
