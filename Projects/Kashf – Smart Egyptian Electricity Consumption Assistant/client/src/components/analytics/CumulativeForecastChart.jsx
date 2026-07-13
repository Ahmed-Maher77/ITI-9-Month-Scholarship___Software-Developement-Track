import React from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const CumulativeForecastChart = ({ data }) => {
    const { t, i18n } = useTranslation();
    const isReady = i18n?.isInitialized && typeof t === 'function';

    if (!isReady) {
        return <div className="h-[300px] animate-pulse bg-neutral-900/50 rounded-xl" />;
    }

    return (
        <div className="bg-kashf-surface border border-kashf-border rounded-2xl p-6">
            <h3 className="text-sm font-medium text-white mb-6">{t('analytics.consumptionForecast', 'Cumulative Forecast')}</h3>
            <div className="w-full" dir="ltr">
                <ResponsiveContainer width="99%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                        <XAxis dataKey="date" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '8px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', color: '#a3a3a3', paddingTop: '10px' }} />
                        <Area type="monotone" dataKey="actual" name={t('analytics.actual', 'Actual')} stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                        <Area type="monotone" dataKey="forecast" name={t('analytics.forecast', 'Forecast')} stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CumulativeForecastChart;
