import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Zap, 
    AlertTriangle, 
    PiggyBank, 
    Activity, 
    Receipt
} from 'lucide-react';
import StatCard from '../common/StatCard';

const DashboardStats = ({ hasMeters }) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
            <StatCard 
                title={t('dashboardOverview.currentUsage')} 
                value={hasMeters ? "285" : "0"} 
                unit={t('common.kwh')} 
                icon={Activity} 
                trend={hasMeters ? `-12% ${t('dashboardOverview.vsLastMonth')}` : null}
                trendColor="text-emerald-400"
            />
            <StatCard 
                title={t('dashboardOverview.currentSheriha')} 
                value={hasMeters ? t('common.tier', { tier: 3 }) : "-"} 
                unit={hasMeters ? "0-350" : ""} 
                icon={Zap} 
                color={hasMeters ? "text-amber-400" : "text-neutral-500"}
            />
            <StatCard 
                title={hasMeters ? t('dashboardOverview.remainingToTier', { tier: 4 }) : t('dashboardOverview.nextThreshold')} 
                value={hasMeters ? "65" : "-"} 
                unit={hasMeters ? t('common.kwh') : ""} 
                icon={AlertTriangle} 
                color={hasMeters ? "text-amber-400" : "text-neutral-500"}
                subtext={hasMeters ? t('dashboardOverview.expectedToCross', { days: 4 }) : null}
            />
            <StatCard 
                title={t('dashboardOverview.estimatedBill')} 
                value={hasMeters ? "412" : "0"} 
                unit={t('common.egp')} 
                icon={Receipt} 
            />
            <StatCard 
                title={t('dashboardOverview.monthlySavings')} 
                value={hasMeters ? "180" : "0"} 
                unit={t('common.egp')} 
                icon={PiggyBank} 
                color="text-emerald-400"
                subtext={hasMeters ? t('dashboardOverview.savedViaAi') : null}
            />
        </div>
    );
};

export default DashboardStats;
