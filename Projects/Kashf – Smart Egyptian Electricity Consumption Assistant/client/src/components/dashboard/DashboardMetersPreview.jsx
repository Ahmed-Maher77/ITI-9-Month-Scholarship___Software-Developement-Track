import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Zap } from 'lucide-react';

const DashboardMetersPreview = ({ hasMeters, registeredMeters }) => {
    const { t } = useTranslation();

    return (
        <div className="lg:col-span-2 bg-gradient-to-br from-kashf-surface to-kashf-bg border border-kashf-border rounded-2xl p-6 relative overflow-hidden group flex flex-col">
            <div className="absolute top-0 right-0 p-32 bg-kashf-blue/5 rounded-full blur-3xl group-hover:bg-kashf-blue/10 transition-colors duration-700"></div>
            
            {hasMeters ? (
                <>
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-1  text-kashf-light-blue">
                                <Bot className="size-7" />
                            </div>
                            <h3 className="text-lg font-bold text-white">{t('dashboardOverview.yourMeters')}</h3>
                        </div>
                        <Link to="/meters" className="text-sm text-kashf-light-blue hover:underline">{t('dashboardOverview.viewAll')}</Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 flex-1">
                        {registeredMeters.slice(0, 2).map((m, i) => (
                            <div key={i} className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl flex flex-col justify-center transition-colors hover:border-neutral-700">
                                <h4 className="text-sm font-semibold text-white">{t(m.name)}</h4>
                                <p className="text-xs text-neutral-400 mt-1">{m.number}</p>
                                <div className="mt-3 pt-3 border-t border-neutral-800 flex justify-between items-center text-xs">
                                    <span className="text-neutral-500">{t('common.tier', { tier: m.tier || '--' })}</span>
                                    <span className="font-medium text-emerald-400" dir="ltr">{m.consumption} {t('common.kwh')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 relative z-10">
                        <Link to="/ai-advisor" className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-colors">
                            <Sparkles className="size-4 text-kashf-light-blue" />
                            {t('dashboardOverview.askKashf')}
                        </Link>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center relative z-10 py-6">
                    <div className="p-4 bg-kashf-blue/10 rounded-full mb-4">
                        <Zap className="size-8 text-kashf-light-blue" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{t('dashboardOverview.noMetersTitle')}</h3>
                    <p className="text-sm text-neutral-400 max-w-sm mb-6">{t('dashboardOverview.noMetersDesc')}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Link to="/meters" className="px-6 py-2.5 bg-kashf-blue hover:opacity-90 text-kashf-bg rounded-xl text-sm font-semibold transition-opacity">
                            {t('dashboardOverview.addMeterCta')}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardMetersPreview;
