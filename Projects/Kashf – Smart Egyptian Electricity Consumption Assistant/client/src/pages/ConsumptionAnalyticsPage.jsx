import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { fetchMeters } from '../store/meters/metersSlice';
import { 
    BarChart2, 
    TrendingUp, 
    TrendingDown,
    Zap,
    CalendarDays,
    Sparkles,
    AlertCircle,
    ChevronDown
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/common/StatCard';
import UsageTrendsChart from '../components/analytics/UsageTrendsChart';
import CumulativeForecastChart from '../components/analytics/CumulativeForecastChart';
import AIObservations from '../components/analytics/AIObservations';

const ConsumptionAnalyticsPage = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const meterId = searchParams.get('meterId');
    
    const dispatch = useDispatch();
    const { meters, isLoading } = useSelector(state => state.meters);
    
    useEffect(() => {
        // Fetch meters if they haven't been loaded yet
        if (meters.length === 0 && !isLoading) {
            dispatch(fetchMeters());
        }
    }, [dispatch, meters.length, isLoading]);
    
    // Fallback to first meter if none selected
    const meter = useMemo(() => {
        if (meterId) {
            const found = meters.find(m => m.id === meterId);
            if (found) return found;
        }
        return meters.length > 0 ? meters[0] : null;
    }, [meters, meterId]);

    // If loading or no meter exists at all
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kashf-blue"></div>
            </div>
        );
    }

    if (!meter) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <AlertCircle className="size-12 text-neutral-500 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">{t('analytics.noDataTitle', 'No Data Available')}</h2>
                <p className="text-neutral-400">{t('analytics.noDataDesc', 'Add a meter to see analytics.')}</p>
            </div>
        );
    }

    // Derive data from meter.trend
    // Trend is an array of cumulative values, let's assume it represents day 1, day 5, day 10 etc.
    const trendData = meter.trend || [];
    
    const weeklyData = trendData.map((val, i) => {
        // Calculate diff to show daily/weekly usage instead of cumulative
        const prev = i > 0 ? trendData[i - 1] : 0;
        return {
            day: t('analytics.period', { defaultValue: `Period ${i + 1}`, num: i + 1 }),
            usage: val - prev < 0 ? 0 : val - prev // Prevent negative
        };
    });

    const forecastData = trendData.map((val, i) => ({
        date: t('analytics.periodShort', { defaultValue: `P${i + 1}`, num: i + 1 }),
        actual: val
    }));
    
    // Add a dummy forecast point if we have data
    if (forecastData.length > 0) {
        const lastVal = forecastData[forecastData.length - 1].actual;
        forecastData[forecastData.length - 1].forecast = lastVal; // connect lines
        forecastData.push({
            date: t('analytics.periodEst', { defaultValue: `P${forecastData.length + 1} (Est)`, num: forecastData.length + 1 }),
            forecast: lastVal + (lastVal * 0.15) // +15% forecast
        });
    }

    const avgUsage = trendData.length > 0 ? (meter.consumption / trendData.length).toFixed(1) : 0;
    const thisPeriod = weeklyData.length > 0 ? weeklyData[weeklyData.length - 1].usage : 0;
    
    // Generate AI Observations dynamically based on real meter data
    const generateObservations = () => {
        const obs = [];

        if (!meter.consumption || meter.consumption === 0) {
            obs.push({
                type: 'info',
                title: t('analytics.obs.noDataTitle', 'Data Collection in Progress'),
                desc: t('analytics.obs.noDataDesc', 'We are currently collecting your consumption data. Real AI observations will appear after your first few readings.')
            });
            return obs;
        }

        // Tier Observation
        if (meter.tier > 2) {
            obs.push({
                type: 'warning',
                title: t('analytics.highConsumptionAlert', 'High Consumption Alert'),
                desc: t('analytics.highConsumptionDesc', { defaultValue: `You are currently in Tier ${meter.tier}. Consider reducing heavy appliance usage to avoid crossing into the next expensive tier.`, tier: meter.tier })
            });
        } else {
            obs.push({
                type: 'success',
                title: t('analytics.efficientUsage', 'Efficient Usage'),
                desc: t('analytics.efficientUsageDesc', 'Great job! Your consumption is highly optimized compared to similar households.')
            });
        }

        // Trend Observation
        if (weeklyData.length > 1) {
            const latest = weeklyData[weeklyData.length - 1].usage;
            const previous = weeklyData[weeklyData.length - 2].usage;
            
            if (previous > 0) {
                if (latest > previous * 1.2) {
                    obs.push({
                        type: 'alert',
                        title: t('analytics.obs.trendSpikeTitle', 'Consumption Spike Detected'),
                        desc: t('analytics.obs.trendSpikeDesc', 'Your most recent reading shows a 20%+ increase compared to the previous period. Check for any unusually long-running appliances.')
                    });
                } else if (latest < previous * 0.9) {
                    obs.push({
                        type: 'success',
                        title: t('analytics.obs.trendDropTitle', 'Consumption Decreased'),
                        desc: t('analytics.obs.trendDropDesc', 'Excellent! Your recent consumption dropped compared to your previous period.')
                    });
                }
            }
        }

        // High Usage Observation
        if (avgUsage > 250) {
            obs.push({
                type: 'warning',
                title: t('analytics.obs.periodAverageHighTitle', 'High Average Usage'),
                desc: t('analytics.obs.periodAverageHighDesc', { defaultValue: `Your average usage per reading is ${avgUsage} kWh. This is higher than recommended.`, avg: avgUsage })
            });
        }

        return obs;
    };

    const observations = generateObservations();

    // We remove Heatmap and Peak Hour since we don't have hourly granular data.

    return (
        <>
            <Helmet>
                <title>تحليلات الاستهلاك — كشف</title>
                <meta name="description" content="تحليلات متقدمة لاستهلاك الكهرباء — الرسوم البيانية، التوقعات، والملاحظات الذكية من كشف." />
            </Helmet>
            <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Header */}
            <PageHeader 
                title={t('analytics.title')} 
                subtitle={t('analytics.subtitle')}
            >
                {meters.length > 1 && (
                    <div className="relative">
                        <select 
                            value={meter.id}
                            onChange={(e) => setSearchParams({ meterId: e.target.value })}
                            className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm font-medium text-white focus:outline-none focus:border-kashf-blue focus:ring-1 focus:ring-kashf-blue transition-all appearance-none min-w-[200px]"
                        >
                            {meters.map(m => (
                                <option key={m.id} value={m.id}>{t(m.name)}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-3 pointer-events-none text-neutral-400">
                            <ChevronDown className="size-4" />
                        </div>
                    </div>
                )}
            </PageHeader>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard 
                    title={t('analytics.avgDailyUsage', 'Avg Usage per Period')} 
                    value={avgUsage} 
                    unit="kWh" 
                    icon={Zap} 
                />
                <StatCard 
                    title={t('analytics.thisWeek', 'Latest Period')} 
                    value={thisPeriod} 
                    unit="kWh" 
                    icon={CalendarDays} 
                />
                <StatCard 
                    title={t('analytics.monthlyForecast', 'Total Consumption')} 
                    value={meter.consumption} 
                    unit="kWh" 
                    icon={BarChart2} 
                />
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UsageTrendsChart data={weeklyData} />
                <CumulativeForecastChart data={forecastData} />
            </div>

            {/* Insights Panel */}
            <AIObservations observations={observations} />
        </div>
        </>
    );
};


export default ConsumptionAnalyticsPage;
