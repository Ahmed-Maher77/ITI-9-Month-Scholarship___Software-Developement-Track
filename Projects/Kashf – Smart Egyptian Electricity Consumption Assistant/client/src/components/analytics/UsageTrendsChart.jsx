import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const UsageTrendsChart = ({ data }) => {
    const { t, i18n } = useTranslation();
    const isReady = i18n?.isInitialized && typeof t === 'function';

    if (!isReady) {
        return <div className="h-[300px] animate-pulse bg-neutral-900/50 rounded-xl" />;
    }

    return (
        <div className="bg-kashf-surface border border-kashf-border rounded-2xl p-6">
            <h3 className="text-sm font-medium text-white mb-6">{t('analytics.weeklyComparison', 'Usage Over Time')}</h3>
            <div className="w-full" dir="ltr">
                <ResponsiveContainer width="99%" height={300}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                        <XAxis dataKey="day" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '8px' }}
                            cursor={{fill: '#262626', opacity: 0.4}}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', color: '#a3a3a3', paddingTop: '10px' }} />
                        <Bar dataKey="usage" name={t('analytics.usage', 'Usage')} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UsageTrendsChart;
