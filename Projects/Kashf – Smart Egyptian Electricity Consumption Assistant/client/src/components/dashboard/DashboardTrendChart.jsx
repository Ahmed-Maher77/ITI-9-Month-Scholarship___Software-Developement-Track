import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import ChartTooltip from '../common/ChartTooltip';

const DashboardTrendChart = ({ hasMeters }) => {
    const { t, i18n } = useTranslation();
    const isReady = i18n?.isInitialized && typeof t === 'function';

    if (!isReady) {
        return <div className="h-[250px] animate-pulse bg-neutral-900/50 rounded-xl" />;
    }

    const trendData = hasMeters ? [
        { month: t('dashboardOverview.months.jan'), consumption: 320 },
        { month: t('dashboardOverview.months.feb'), consumption: 280 },
        { month: t('dashboardOverview.months.mar'), consumption: 310 },
        { month: t('dashboardOverview.months.apr'), consumption: 380 },
        { month: t('dashboardOverview.months.may'), consumption: 420 },
        { month: t('dashboardOverview.months.jun'), consumption: 285 },
    ] : [
        { month: t('dashboardOverview.months.jan'), consumption: 0 },
        { month: t('dashboardOverview.months.feb'), consumption: 0 },
        { month: t('dashboardOverview.months.mar'), consumption: 0 },
        { month: t('dashboardOverview.months.apr'), consumption: 0 },
        { month: t('dashboardOverview.months.may'), consumption: 0 },
        { month: t('dashboardOverview.months.jun'), consumption: 0 },
    ];

    return (
        <div className="grid grid-cols-1 gap-6">
            <div className="pt-2">
                <h3 className="text-sm font-medium text-neutral-400 mb-6">{t('dashboardOverview.monthlyTrend')}</h3>
                <div className="h-[250px] w-full" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                            <XAxis dataKey="month" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} padding={{ left: 10, right: 10 }} />
                            <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                            <RechartsTooltip 
                                content={<ChartTooltip unit={t('common.kwh')} />}
                                cursor={{ stroke: '#333', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Line type="monotone" dataKey="consumption" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6, stroke: '#171717', strokeWidth: 2 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardTrendChart;
