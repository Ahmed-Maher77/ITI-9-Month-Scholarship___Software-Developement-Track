import React from 'react';
import { useTranslation } from 'react-i18next';
import { Receipt, AlertCircle } from 'lucide-react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';

const BillForecastSection = () => {
    const { t, i18n } = useTranslation();
    const isReady = i18n?.isInitialized && typeof t === 'function';

    if (!isReady) {
        return <div className="h-[300px] animate-pulse bg-neutral-900/50 rounded-xl" />;
    }

    const forecastData = [
      { month: t('bills.months.jan'), cost: 295, projected: null },
      { month: t('bills.months.feb'), cost: 245, projected: null },
      { month: t('bills.months.mar'), cost: 280, projected: null },
      { month: t('bills.months.apr'), cost: 485, projected: null },
      { month: t('bills.months.may'), cost: 650, projected: null },
      { month: t('bills.months.jun'), cost: 412, projected: 412 }, // Current month estimate
      { month: t('bills.months.jul'), cost: null, projected: 520 },
      { month: t('bills.months.aug'), cost: null, projected: 580 },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Current Estimate Card */}
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-8">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Receipt className="size-5 text-kashf-light-blue" />
                        <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">{t('bills.currentEstimate')}</h3>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1" dir="ltr">
                        <span className="text-3xl sm:text-4xl font-bold text-white">EGP 412</span>
                        <span className="text-xs sm:text-sm text-neutral-500">.50</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-400 flex items-center gap-1.5 font-medium mt-3">
                        <AlertCircle className="size-4" />
                        {t('bills.tierWarning')}
                    </p>
                </div>

                <div className="relative z-10 mt-8 sm:mt-0 sm:w-1/2 space-y-4">
                    <div className="flex justify-between items-center text-xs sm:text-sm pb-3 border-b border-neutral-800/50">
                        <span className="text-neutral-400">{t('bills.projectedConsumption')}</span>
                        <span className="font-medium text-white" dir="ltr">345 kWh</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm pb-3 border-b border-neutral-800/50">
                        <span className="text-neutral-400">{t('bills.expectedTier')}</span>
                        <span className="font-medium text-white">{t('common.tier', { tier: 3, defaultValue: 'Tier 3' })}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-neutral-400">{t('bills.dueDate')}</span>
                        <span className="font-medium text-white">Jul 01, 2026</span>
                    </div>
                </div>
            </div>

            {/* Cost Forecast Chart */}
            <div className="bg-kashf-surface border border-kashf-border rounded-2xl p-6">
                <h3 className="text-xs sm:text-sm font-medium text-white mb-6">{t('bills.chartTitle')}</h3>
                <div className="h-[300px] w-full" dir="ltr">
                    <ResponsiveContainer width="99%" height={300}>
                        <ComposedChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                            <XAxis dataKey="month" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                            <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '8px' }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', color: '#a3a3a3', paddingTop: '10px' }} />
                            <Bar dataKey="cost" name={t('bills.actualCost')} fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            <Line type="monotone" dataKey="projected" name={t('bills.aiPrediction')} stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 6, fill: '#f59e0b', strokeWidth: 0 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default BillForecastSection;
