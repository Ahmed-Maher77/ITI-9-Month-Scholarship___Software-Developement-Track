import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet-async";
import { 
    Bell, 
    AlertTriangle, 
    TrendingUp, 
    Sparkles, 
    CheckCircle2,
    Trash2,
    Check
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { fetchAlerts, markAsRead, markAllAsRead, deleteAlert } from '../store/alerts/alertsSlice';

const ICON_MAP = {
    AlertTriangle,
    TrendingUp,
    Sparkles,
    Bell
};

const formatRelativeTime = (dateStr, t) => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours   / 24);
    const weeks   = Math.floor(days    / 7);

    if (seconds < 60)  return t("common.time.justNow", { defaultValue: "just now" });
    if (minutes < 60)  return t("common.time.minutesAgo", { count: minutes, defaultValue: `${minutes}m ago` });
    if (hours   < 24)  return t("common.time.hoursAgo", { count: hours, defaultValue: `${hours}h ago` });
    if (days    < 7)   return t("common.time.daysAgo", { count: days, defaultValue: `${days}d ago` });
    if (weeks   < 4)   return t("common.time.weeksAgo", { count: weeks, defaultValue: `${weeks}w ago` });
    return new Date(dateStr).toLocaleDateString();
};

const AlertsPage = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const dispatch = useDispatch();
    const { alerts, unreadCount } = useSelector((state) => state.alerts);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        dispatch(fetchAlerts());
    }, [dispatch]);

    const FILTER_TABS = [
        { key: 'all', label: t('alerts.filters.all') },
        { key: 'warning', label: t('alerts.filters.warnings') },
        { key: 'critical', label: t('alerts.filters.critical') },
        { key: 'recommendation', label: t('alerts.filters.recommendations') },
        { key: 'system', label: t('alerts.filters.system') }
    ];

    const filteredAlerts = alerts.filter(alert => 
        activeTab === 'all' ? true : alert.type === activeTab
    );

    return (
        <>
            <Helmet>
                <title>التنبيهات — كشف</title>
                <meta name="description" content="مركز التنبيهات في كشف — تتبع استهلاكك، تحذيرات الشريحة، وتوصيات التوفير." />
            </Helmet>
            <div className="space-y-6 max-w-4xl mx-auto pb-10">
            {/* Header */}
            <PageHeader 
                title={t('alerts.title')} 
                subtitle={t('alerts.subtitle')}
            >
                {unreadCount > 0 && (
                    <button 
                        onClick={() => dispatch(markAllAsRead())}
                        className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors bg-neutral-800/50 hover:bg-neutral-800 px-3 py-1.5 rounded-lg"
                    >
                        <CheckCircle2 className="size-4" />
                        {t('alerts.markAllRead')}
                    </button>
                )}
            </PageHeader>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide border-b border-kashf-border pb-px">
                {FILTER_TABS.map(tab => (
                    <button 
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                            activeTab === tab.key 
                            ? 'border-kashf-light-blue text-kashf-light-blue' 
                            : 'border-transparent text-neutral-500 hover:text-neutral-300'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Alerts Timeline */}
            <div className="pt-6">
                {filteredAlerts.length > 0 ? (
                    <div className={`relative ${isRTL ? "pr-8" : "pl-8"}`}>
                        {filteredAlerts.map((alert, index) => {
                            const Icon = ICON_MAP[alert.iconName] || Bell;
                            const isLast = index === filteredAlerts.length - 1;
                            return (
                                <div
                                    key={alert.id}
                                    className={`relative flex items-start gap-4 pb-8 group ${
                                        !isLast
                                            ? isRTL
                                                ? "before:-right-4 before:top-12 before:bottom-0 before:w-0.5 before:bg-neutral-700/40 before:absolute"
                                                : "before:-left-4 before:top-12 before:bottom-0 before:w-0.5 before:bg-neutral-700/40 before:absolute"
                                            : ""
                                    }`}
                                >
                                    {/* Icon bubble */}
                                    <div
                                        className={`absolute top-0 w-10 h-10 rounded-full border-2 border-kashf-surface z-10 flex items-center justify-center shrink-0 ring-2 ring-offset-2 ring-offset-kashf-surface ${
                                            isRTL ? "-right-9" : "-left-9"
                                        } ${alert.bg} ${alert.ring}`}
                                    >
                                        <Icon className={`w-4 h-4 ${alert.color}`} />
                                    </div>
                                    
                                    {/* Content Card (Seamless) */}
                                    <div className={`flex-grow min-w-0 pt-1 transition-all ${isRTL ? "mr-6" : "ml-6"} ${alert.isRead ? 'opacity-60' : 'opacity-100'}`}>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-1.5">
                                            <div className="flex items-center gap-2.5">
                                                {!alert.isRead && (
                                                    <span className="flex size-1.5 rounded-full bg-kashf-light-blue shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0"></span>
                                                )}
                                                <h3 className={`text-sm font-medium ${alert.isRead ? 'text-neutral-400' : 'text-white group-hover:text-kashf-light-blue transition-colors'}`}>
                                                    {t(alert.titleKey)}
                                                </h3>
                                            </div>
                                            <span className="text-xs text-neutral-500 whitespace-nowrap font-medium font-mono shrink-0">
                                                {formatRelativeTime(alert.createdAt, t)}
                                            </span>
                                        </div>
                                        
                                        <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                                            {t(alert.messageKey, alert.messageParams)}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4 transition-opacity focus-within:opacity-100">
                                            {!alert.isRead && (
                                                <button 
                                                    onClick={() => dispatch(markAsRead(alert.id))}
                                                    className="flex items-center gap-1.5 text-xs font-medium text-kashf-light-blue hover:text-white transition-colors"
                                                >
                                                    <Check className="size-3.5" />
                                                    {t('alerts.markAsRead', 'Mark as read')}
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => dispatch(deleteAlert(alert.id))}
                                                className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="size-3.5" />
                                                {t('common.delete', 'Delete')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-neutral-800 rounded-2xl bg-neutral-900/20">
                        <div className="size-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4">
                            <Bell className="size-8 text-neutral-600" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">{t('alerts.emptyState.title')}</h3>
                        <p className="text-sm text-neutral-500 max-w-sm">{t('alerts.emptyState.subtitle')}</p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default AlertsPage;
