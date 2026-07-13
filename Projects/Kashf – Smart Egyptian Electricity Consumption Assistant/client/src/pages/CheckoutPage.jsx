import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet-async";
import { selectUser } from '../store/auth/authSlice';
import PageHeader from '../components/layout/PageHeader';
import { CreditCard, ArrowLeft, Shield, Users } from 'lucide-react';
import { payForPlan } from '../services/paymentService';
import CheckoutPlanDetails from '../components/billing/CheckoutPlanDetails';
import CheckoutSummary from '../components/billing/CheckoutSummary';

const CheckoutPage = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const user = useSelector(selectUser);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Validate planId
    const isValidPlan = planId === 'plus' || planId === 'family';

    const PLAN_DETAILS = {
        plus: {
            id: 'plus',
            name: t('billing.plans.plus.name'),
            price: '49',
            interval: t('billing.plans.plus.interval'),
            description: t('billing.plans.plus.description'),
            icon: Shield,
            color: 'text-kashf-light-blue',
            bg: '',
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
        },
        family: {
            id: 'family',
            name: t('billing.plans.family.name'),
            price: '99',
            interval: t('billing.plans.family.interval'),
            description: t('billing.plans.family.description'),
            icon: Users,
            color: 'text-amber-400',
            bg: '',
            features: [
                t('feat.fiveMeters', { defaultValue: 'Up to 5 electricity meters' }),
                t('feat.familyCoins', { defaultValue: '300 Coins per month' }),
                t('feat.everythingPlus', { defaultValue: 'Everything in Plus' }),
                t('feat.familyReports', { defaultValue: 'Family usage reports' }),
                t('feat.sharedAccess', { defaultValue: 'Shared access' }),
                t('feat.extHistory', { defaultValue: 'Extended consumption history' }),
                t('feat.prioritySupport', { defaultValue: 'Priority support' })
            ],
        }
    };

    if (!isValidPlan) {
        return (
            <div className="max-w-md mx-auto text-center py-20 space-y-4">
                <h2 className="text-2xl font-bold text-red-400">
                    {t('billing.checkout.invalidPlan', { defaultValue: 'Invalid Plan selected' })}
                </h2>
                <p className="text-neutral-400">
                    {t('billing.checkout.invalidPlanDesc', { defaultValue: 'Please select a valid plan from the available list.' })}
                </p>
                <Link to="/billing" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg text-white font-medium hover:bg-neutral-700 transition-colors">
                    <ArrowLeft className="size-4" /> {t('billing.checkout.backToBilling', { defaultValue: 'Back to Billing' })}
                </Link>
            </div>
        );
    }

    const plan = PLAN_DETAILS[planId];
    const isCurrentPlan = user?.subscriptionPlan === planId;

    const handleCheckout = async () => {
        if (isCurrentPlan) {
            setError(t('billing.checkout.alreadySubscribed', { defaultValue: 'You are already subscribed to this plan.' }));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await payForPlan(planId);
            if (response && response.data && response.data.url) {
                // Redirect user to Stripe Checkout
                window.location.href = response.data.url;
            } else {
                setError(t('billing.checkout.errorGeneric', { defaultValue: 'Failed to initiate payment. Please try again.' }));
            }
        } catch (err) {
            setError(err.message || t('billing.checkout.errorGeneric', { defaultValue: 'Failed to initiate payment. Please try again.' }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>إتمام الدفع — كشف</title>
                <meta name="description" content="مراجعة وترقية باقتك في كشف — عملية دفع آمنة عبر Stripe." />
            </Helmet>
            <div className="space-y-8 max-w-5xl mx-auto pb-10">
            {/* Back button */}
            <button 
                onClick={() => navigate('/billing')} 
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
                <ArrowLeft className="size-4" /> {t('billing.checkout.backToBilling', { defaultValue: 'Back to Billing' })}
            </button>

            {/* Header */}
            <PageHeader 
                icon={CreditCard}
                title={t('billing.checkout.title', { defaultValue: 'Confirm Plan Upgrade' })} 
                subtitle={t('billing.checkout.subtitle', { defaultValue: 'Review your selected plan and proceed to secure checkout.' })}
            />

            {/* Content card */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                <CheckoutPlanDetails plan={plan} />
                <CheckoutSummary 
                    plan={plan}
                    loading={loading}
                    error={error}
                    isCurrentPlan={isCurrentPlan}
                    onCheckout={handleCheckout}
                />
            </div>
        </div>
        </>
    );
};

export default CheckoutPage;
