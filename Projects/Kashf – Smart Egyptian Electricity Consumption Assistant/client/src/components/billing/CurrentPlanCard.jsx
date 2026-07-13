import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import CancelSubscriptionModal from './CancelSubscriptionModal';
import { cancelSubscription } from '../../services/paymentService';
import { setUser } from '../../store/auth/authSlice';
import { fetchAlerts } from '../../store/alerts/alertsSlice';

const CurrentPlanCard = ({ currentPlan, user }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const formattedRenewalDate = user?.subscriptionRenewalDate 
        ? new Date(user.subscriptionRenewalDate).toLocaleDateString(user.preferredLanguage === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : t('subscription.notApplicable', { defaultValue: 'N/A' });

    const handleCancelConfirm = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await cancelSubscription();
            if (result.success && result.data?.user) {
                dispatch(setUser(result.data.user));
                dispatch(fetchAlerts());
                setIsModalOpen(false);
            } else {
                setError(result.message || 'Failed to cancel subscription.');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during subscription cancellation.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="py-8 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-24 bg-kashf-blue/5 rounded-full blur-2xl"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2">{t('billing.currentPlan')}</p>
                    <h2 className="text-3xl font-bold text-white capitalize">{t(`billing.plans.${currentPlan}.name`)}</h2>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20">
                    {t('billing.active')}
                </span>
            </div>

            <div className="space-y-3 relative z-10">
                <div className="flex justify-between text-sm pb-3 border-b border-neutral-800">
                    <span className="text-neutral-400">{t('billing.renewalDate')}</span>
                    <span className="text-white font-medium">{currentPlan === 'free' ? t('subscription.noCharge', { defaultValue: 'Free forever' }) : formattedRenewalDate}</span>
                </div>
                <div className="flex justify-between text-sm pb-3 border-b border-neutral-800">
                    <span className="text-neutral-400">{t('billing.billingCycle')}</span>
                    <span className="text-white font-medium">{t('billing.monthly')}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">{t('billing.monthlyCost')}</span>
                    <span className="text-white font-medium">{currentPlan === 'free' ? '0' : currentPlan === 'plus' ? '49' : '99'} {t('common.egp')}</span>
                </div>
            </div>

            {currentPlan !== 'free' && (
                <div className="mt-6 pt-6 border-t border-neutral-800 flex justify-end relative z-10">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-xs font-semibold text-neutral-400 hover:text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors border border-neutral-800 hover:border-red-500/20 cursor-pointer"
                    >
                        {t('billing.cancelSubscription', 'Cancel Subscription')}
                    </button>
                </div>
            )}

            <CancelSubscriptionModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setError('');
                }}
                onConfirm={handleCancelConfirm}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default CurrentPlanCard;
