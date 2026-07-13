import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Loader2 } from 'lucide-react';

const CheckoutSummary = ({ plan, loading, error, isCurrentPlan, onCheckout }) => {
    const { t } = useTranslation();

    return (
        <div className="md:col-span-2 bg-gradient-to-br from-kashf-surface to-[#1e1b4b]/10 border border-kashf-border rounded-2xl p-6 space-y-6">
            <h3 className="font-bold text-white text-base">
                {t('billing.checkout.summary', { defaultValue: 'Order Summary' })}
            </h3>
            
            <div className="space-y-3 pb-6 border-b border-neutral-800">
                <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">{plan.name}</span>
                    <span className="text-white font-medium">{plan.price} {t('common.egp')}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">{t('billing.billingCycle')}</span>
                    <span className="text-white font-medium">{t('billing.monthly')}</span>
                </div>
            </div>

            <div className="flex justify-between items-baseline">
                <span className="text-base font-bold text-white">
                    {t('billing.checkout.total', { defaultValue: 'Total Due' })}
                </span>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-sm text-neutral-400">
                        {t('common.egp')} / {t('billing.month', { defaultValue: 'month' })}
                    </span>
                </div>
            </div>

            {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs leading-relaxed" dir="auto">
                    {error}
                </div>
            )}

            <button 
                onClick={onCheckout}
                disabled={loading || isCurrentPlan}
                className={`w-full py-3 text-sm rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isCurrentPlan 
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700' 
                    : 'bg-kashf-blue hover:opacity-90 text-kashf-bg cursor-pointer'
                }`}
            >
                {loading ? (
                    <>
                        <Loader2 className="size-5 animate-spin" />
                        {t('billing.checkout.processing', { defaultValue: 'Redirecting to Stripe...' })}
                    </>
                ) : isCurrentPlan ? (
                    t('billing.checkout.currentActive', { defaultValue: 'Current Active Plan' })
                ) : (
                    <>
                        <CreditCard className="size-5" />
                        {t('billing.checkout.payNow', { defaultValue: 'Pay with Card (Stripe)' })}
                    </>
                )}
            </button>

            <p className="text-[10px] text-center text-neutral-500 leading-normal">
                {t('billing.checkout.terms', { 
                    defaultValue: 'By upgrading, you agree to our terms of service. Secure payment is processed via Stripe.' 
                })}
            </p>
        </div>
    );
};

export default CheckoutSummary;
