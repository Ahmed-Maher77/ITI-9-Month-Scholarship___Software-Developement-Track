import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import PageHeader from '../../components/layout/PageHeader';

import DashboardStats from '../../components/dashboard/DashboardStats';
import DashboardTrendChart from '../../components/dashboard/DashboardTrendChart';
import DashboardMetersPreview from '../../components/dashboard/DashboardMetersPreview';
import ConsumptionGauge from '../../components/dashboard/ConsumptionGauge';

const DashboardPage = () => {
    const { t } = useTranslation();

    const registeredMeters = useSelector(state => state.meters.meters);
    const hasMeters = registeredMeters.length > 0;

    return (
        <>
            <Helmet>
                <title>لوحة التحكم — كشف</title>
                <meta name="description" content="لوحة تحكم كشف — استعرض استهلاكك الحالي، حالة الشريحة، التوقعات، والتوصيات الذكية لتوفير الكهرباء." />
            </Helmet>
            <div className="space-y-10 max-w-7xl mx-auto pb-12">
            {/* Header */}
            <PageHeader 
                title={t('dashboardOverview.title')} 
                subtitle={t('dashboardOverview.subtitle')} 
            />

            {/* Stats Row */}
            <DashboardStats hasMeters={hasMeters} />

            {/* Main Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                
                {/* Gauge Section (Takes up 1 column) */}
                <div className="flex flex-col items-center justify-center relative h-full">
                    <h3 className="text-sm font-medium text-neutral-400 w-full mb-8">{t('dashboardOverview.consumptionGauge')}</h3>
                    
                    <ConsumptionGauge hasMeters={hasMeters} value={hasMeters ? "285" : "0"} unit={t('common.kwh')} />
                    
                    <div className="w-full mt-auto space-y-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-neutral-400">{t('dashboardOverview.currentStatus')}</span>
                            <span className={hasMeters ? "text-amber-400 font-medium" : "text-neutral-500 font-medium"}>
                                {hasMeters ? t('dashboardOverview.warningZone') : "-"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-neutral-400">{t('dashboardOverview.nextThreshold')}</span>
                            <span className={hasMeters ? "text-white" : "text-neutral-500"}>
                                {hasMeters ? t('dashboardOverview.tierLimit', { limit: 350, tier: 4 }) : "-"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* AI Recommendations / Registration CTA (Takes up 2 columns) */}
                <DashboardMetersPreview hasMeters={hasMeters} registeredMeters={registeredMeters} />
            </div>

            {/* Charts Row */}
            <DashboardTrendChart hasMeters={hasMeters} />
        </div>
        </>
    );
};

export default DashboardPage;
