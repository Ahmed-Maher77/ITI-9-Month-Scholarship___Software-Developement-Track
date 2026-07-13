import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import CurrentPlanCard from '../components/billing/CurrentPlanCard';
import PaymentMethodCard from '../components/billing/PaymentMethodCard';
import AvailablePlans from '../components/billing/AvailablePlans';
import BillingHistory from '../components/billing/BillingHistory';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../store/auth/authSlice';
import PageHeader from '../components/layout/PageHeader';
import { useSearchParams } from 'react-router-dom';
import { fetchCurrentUser } from '../services/authService';
import { verifyCheckout } from '../services/paymentService';
import { X } from 'lucide-react';

const BillingPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const currentPlan = user?.subscriptionPlan || 'free';
    const [searchParams, setSearchParams] = useSearchParams();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const status = searchParams.get('status');
        if (status === 'success') {
            setAlert({
                type: 'success',
                message: t('billing.paymentSuccessMsg', { defaultValue: 'Success! Your payment was processed and your plan is now active.' })
            });

            // Verify checkout and re-fetch user profile to sync Redux with upgraded plan
            const syncUser = async () => {
                const sessionId = searchParams.get('session_id');
                try {
                    let userData = null;
                    if (sessionId) {
                        const verifyRes = await verifyCheckout(sessionId);
                        if (verifyRes?.data?.user) {
                            userData = verifyRes.data.user;
                        }
                    } else {
                        const res = await fetchCurrentUser();
                        if (res?.data?.user) {
                            userData = res.data.user;
                        }
                    }
                    if (userData) {
                        dispatch(setUser(userData));
                    }
                } catch (err) {
                    console.error("Failed to sync upgraded user profile:", err);
                }
            };
            syncUser();

            // Clean query parameters from URL
            const nextParams = new URLSearchParams(searchParams);
            nextParams.delete('status');
            nextParams.delete('session_id');
            setSearchParams(nextParams);
        } else if (status === 'cancel') {
            setAlert({
                type: 'info',
                message: t('billing.paymentCanceledMsg', { defaultValue: 'Payment was canceled.' })
            });
            const nextParams = new URLSearchParams(searchParams);
            nextParams.delete('status');
            setSearchParams(nextParams);
        }
    }, [searchParams, setSearchParams, dispatch, t]);

    return (
        <>
            <Helmet>
                <title>الفواتير والاشتراك — كشف</title>
                <meta name="description" content="إدارة اشتراكك في كشف — اختر الباقة المناسبة، شاهد سجل الفوترة، وقم بالترقية." />
            </Helmet>
            <div className="space-y-8 max-w-7xl mx-auto pb-10">
            {/* Header */}
            <PageHeader 
                title={t('billing.title')} 
                subtitle={t('billing.subtitle')}
            />

            {/* Payment Alerts */}
            {alert && (
                <div className={`p-4 rounded-xl text-sm flex justify-between items-center gap-4 ${
                    alert.type === 'success' 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                    : 'bg-neutral-800 border border-neutral-700 text-neutral-300'
                }`}>
                    <span>{alert.message}</span>
                    <button 
                        onClick={() => setAlert(null)}
                        className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded-lg hover:bg-neutral-800"
                        aria-label="Close alert"
                    >
                        <X className="size-4 shrink-0" />
                    </button>
                </div>
            )}

            {/* Current Plan & Payment Method Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CurrentPlanCard currentPlan={currentPlan} user={user} />
                <PaymentMethodCard currentPlan={currentPlan} user={user} />
            </div>

            {/* Available Plans */}
            <AvailablePlans currentPlan={currentPlan} />

            {/* Billing History */}
            <BillingHistory currentPlan={currentPlan} user={user} />
        </div>
        </>
    );
};

export default BillingPage;
