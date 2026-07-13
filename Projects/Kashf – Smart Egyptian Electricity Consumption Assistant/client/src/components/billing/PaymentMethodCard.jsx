import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Trash2, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/auth/authSlice';
import { removePaymentMethod } from '../../services/paymentService';

const PaymentMethodCard = ({ currentPlan, user }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await removePaymentMethod();
            if (res?.data?.user) {
                dispatch(setUser(res.data.user));
            }
            setConfirmDelete(false);
        } catch (err) {
            setError(err.message || t('common.errorGeneric', { defaultValue: 'Something went wrong.' }));
        } finally {
            setLoading(false);
        }
    };

    const hasMethod = currentPlan !== 'free' && user?.hasPaymentMethod;

    return (
        <div className="bg-kashf-surface border border-kashf-border rounded-2xl p-6 flex flex-col min-h-[180px]">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-1">{t('billing.paymentMethod')}</p>
                    <h2 className="text-lg font-bold text-white">{t('billing.defaultCard')}</h2>
                </div>
            </div>

            {!hasMethod ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 rounded-xl gap-1 text-center">
                    <CreditCard className="size-8 text-neutral-600 mb-3" />
                    <p className="text-sm text-neutral-400">{t('billing.noPaymentMethod')}</p>
                    <p className="text-xs text-neutral-500 mt-1">{t('billing.upgradeToAddCard')}</p>
                </div>
            ) : confirmDelete ? (
                <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-xl space-y-3">
                    <p className="text-sm text-red-400 leading-normal">{t('billing.deleteCardConfirm')}</p>
                    {error && <p className="text-xs text-red-400">{error}</p>}
                    <div className="flex gap-2">
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                            {loading && <Loader2 className="size-3.5 animate-spin" />}
                            {t('billing.deleteCardBtn')}
                        </button>
                        <button
                            onClick={() => setConfirmDelete(false)}
                            disabled={loading}
                            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50"
                        >
                            {t('billing.deleteCardCancel')}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-4 border border-neutral-700 bg-neutral-800/50 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-white rounded flex items-center justify-center font-bold text-blue-900 text-xs italic shrink-0">
                            VISA
                        </div>
                        <div>
                            <p className="text-white font-medium text-sm flex items-center gap-2">
                                •••• •••• •••• 4242
                                <span className="px-1.5 py-0.5 bg-neutral-700 text-[10px] rounded text-neutral-300">{t('billing.default')}</span>
                            </p>
                            <p className="text-xs text-neutral-500">{t('billing.expires')} 12/28</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setConfirmDelete(true)}
                        className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        aria-label="Remove payment method"
                    >
                        <Trash2 className="size-4.5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentMethodCard;
