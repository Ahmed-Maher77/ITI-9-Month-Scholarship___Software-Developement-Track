import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';

const CheckoutPlanDetails = ({ plan }) => {
    const { t } = useTranslation();
    const Icon = plan.icon;

    return (
        <div className="md:col-span-3 py-6 space-y-6">
            <div className="flex items-center gap-4">
                <div className={`p-1 px-2 rounded-xl ${plan.bg} ${plan.color}`}>
                    <Icon className="size-8" />
                </div>
                <div>
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        {t('billing.checkout.targetPlan', { defaultValue: 'Selected Plan' })}
                    </span>
                    <h2 className="text-2xl font-bold text-white capitalize">{plan.name}</h2>
                </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed">{plan.description}</p>

            <div className="border-t border-neutral-800 pt-6">
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                    {t('subscription.includes', { defaultValue: "What's included" })}:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                            <CheckCircle2 className="size-4.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CheckoutPlanDetails;
