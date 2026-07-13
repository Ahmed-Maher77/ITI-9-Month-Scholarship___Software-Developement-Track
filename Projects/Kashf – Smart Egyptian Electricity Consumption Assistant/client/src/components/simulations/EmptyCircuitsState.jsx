import React from 'react';
import { Zap, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EmptyCircuitsState = ({ onAddClick }) => {
    const { t } = useTranslation();

    return (
        <div className="col-span-full py-16 border-2 border-dashed border-neutral-800 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
            <Zap className="size-10 text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">{t('simulations.noCircuits', 'No Circuits Yet')}</h3>
            <p className="text-sm text-neutral-400 max-w-sm mb-6  rtl:leading-loose">{t('simulations.noCircuitsDesc', 'Add your first circuit (like Kitchen or Bedroom) to start building your simulation.')}</p>
            <button 
                onClick={onAddClick}
                className="flex items-center gap-2 bg-kashf-blue hover:bg-opacity-90 text-kashf-bg px-6 py-2.5 rounded-xl font-bold transition-colors"
            >
                <Plus className="size-5" />
                {t('simulations.addCircuit', 'Add Circuit')}
            </button>
        </div>
    );
};

export default EmptyCircuitsState;
