import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Zap, Shield, Users } from 'lucide-react';

const AvailablePlans = ({ currentPlan }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const PLANS = [
        {
            id: 'free',
            name: t('billing.plans.free.name'),
            price: '0',
            interval: t('billing.plans.free.interval'),
            description: t('billing.plans.free.description'),
            features: [
                t('feat.oneMeter', { defaultValue: '1 electricity meter' }),
                t('feat.freeCoins', { defaultValue: '50 Coins per month' }),
                t('feat.meterScan', { defaultValue: 'Meter scanning' }),
                t('feat.consumTrack', { defaultValue: 'Consumption tracking' }),
                t('feat.sheriha', { defaultValue: 'Sheriha monitoring' }),
                t('feat.dashboard', { defaultValue: 'Basic dashboard' }),
                t('feat.history', { defaultValue: 'Monthly history' })
            ],
            icon: Zap,
            color: 'text-neutral-400',
            bg: ''
        },
        {
            id: 'plus',
            name: t('billing.plans.plus.name'),
            price: '49',
            interval: t('billing.plans.plus.interval'),
            description: t('billing.plans.plus.description'),
            features: [
                t('feat.twoMeters', { defaultValue: 'Up to 2 electricity meters' }),
                t('feat.plusCoins', { defaultValue: '150 Coins per month' }),
                t('feat.everythingFree', { defaultValue: 'Everything in Free' }),
                t('feat.aiRecs', { defaultValue: 'AI-powered recommendations' }),
                t('feat.billForecast', { defaultValue: 'Bill forecasting' }),
                t('feat.earlyAlerts', { defaultValue: 'Early Sheriha alerts' }),
                t('feat.analytics', { defaultValue: 'Advanced analytics' }),
                t('feat.push', { defaultValue: 'Push notifications' }),
                t('feat.pwa', { defaultValue: 'Installable PWA' })
            ],
            icon: Shield,
            color: 'text-kashf-light-blue',
            bg: '',
            popular: true
        },
        {
            id: 'family',
            name: t('billing.plans.family.name'),
            price: '99',
            interval: t('billing.plans.family.interval'),
            description: t('billing.plans.family.description'),
            features: [
                t('feat.fiveMeters', { defaultValue: 'Up to 5 electricity meters' }),
                t('feat.familyCoins', { defaultValue: '300 Coins per month' }),
                t('feat.everythingPlus', { defaultValue: 'Everything in Plus' }),
                t('feat.familyReports', { defaultValue: 'Family usage reports' }),
                t('feat.sharedAccess', { defaultValue: 'Shared access' }),
                t('feat.extHistory', { defaultValue: 'Extended consumption history' }),
                t('feat.prioritySupport', { defaultValue: 'Priority support' })
            ],
            icon: Users,
            color: 'text-amber-400',
            bg: ''
        }
    ];

    return (
        <div>
            <h3 className="text-lg font-bold text-white mb-4">{t('billing.availablePlans')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map((plan) => {
                    const Icon = plan.icon;
                    const isCurrent = currentPlan === plan.id;
                    const canChoose = plan.id !== 'free' && (currentPlan === 'free' || (currentPlan === 'plus' && plan.id === 'family'));
                    const isDisabled = isCurrent || !canChoose;
                    
                    return (
                        <div key={plan.id} className={`relative bg-kashf-surface border rounded-2xl p-6 flex flex-col ${
                            plan.popular ? 'border-kashf-blue' : isCurrent ? 'border-neutral-600' : 'border-kashf-border'
                        } hover:border-neutral-500 transition-colors`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-kashf-blue text-kashf-bg text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                                    {t('billing.mostPopular')}
                                </div>
                            )}
                            
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-1 rounded-lg ${plan.bg} ${plan.color}`}>
                                    <Icon className="size-6" />
                                </div>
                                <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                            </div>
                            
                            <div className="mb-4 flex items-baseline gap-1.5" dir="auto">
                                <span className="text-3xl font-bold text-white">{plan.price}</span>
                                <span className="text-sm text-neutral-400">{t('common.egp')} / {plan.interval}</span>
                            </div>
                            
                            <p className="text-sm text-neutral-400 mb-6 flex-1">{plan.description}</p>
                            
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <button 
                                onClick={() => navigate(`/checkout/${plan.id}`)}
                                disabled={isDisabled} 
                                className={`w-full py-2.5 rounded-xl font-medium transition-colors ${
                                    isDisabled 
                                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700' 
                                    : plan.popular 
                                        ? 'bg-kashf-blue hover:opacity-90 text-kashf-bg cursor-pointer' 
                                        : 'bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer'
                                }`}
                            >
                                {isCurrent 
                                    ? t('billing.currentPlanBtn') 
                                    : plan.id === 'free' 
                                        ? t('billing.freePlanBtn') 
                                        : currentPlan === 'family' || (currentPlan === 'plus' && plan.id === 'plus')
                                            ? t('billing.unavailableBtn')
                                            : t('billing.upgradeBtn')}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AvailablePlans;
