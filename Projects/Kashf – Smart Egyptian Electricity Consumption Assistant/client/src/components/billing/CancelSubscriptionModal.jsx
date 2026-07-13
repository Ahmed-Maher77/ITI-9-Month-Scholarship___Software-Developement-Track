import React from "react";
import { useTranslation } from "react-i18next";
import { X, AlertTriangle, Loader2 } from "lucide-react";

const CancelSubscriptionModal = ({ isOpen, onClose, onConfirm, loading, error }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-start justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden my-auto">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 relative">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="size-5 text-amber-500" />
                        <h3 className="text-lg font-semibold text-white">
                            {t("billing.cancelSubscriptionTitle", "Cancel Subscription?")}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
                        disabled={loading}
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <p className="text-sm text-neutral-300 leading-relaxed">
                        {t("billing.cancelSubscriptionWarning", "Are you sure you want to cancel your premium subscription and revert to the Free plan?")}
                    </p>

                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                        <AlertTriangle className="size-5 shrink-0 mt-0.5 text-red-400" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-red-300">
                                {t("billing.lossOfFundsWarningTitle", "Financial Loss Warning")}
                            </h4>
                            <p className="text-xs leading-relaxed text-red-400/90">
                                {t("billing.lossOfFundsWarningMessage", "You will lose the money of the current active plan immediately. No refunds will be provided for any unused time in your billing period.")}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 bg-neutral-950/40 p-4 rounded-xl border border-neutral-800/60">
                        <div className="flex gap-2.5 items-start">
                            <span className="text-xs text-amber-500 mt-1 select-none">•</span>
                            <p className="text-xs text-neutral-400">
                                {t("billing.cancelSubscriptionDetail1", "Your account will be immediately downgraded to the Free plan.")}
                            </p>
                        </div>
                        <div className="flex gap-2.5 items-start">
                            <span className="text-xs text-amber-500 mt-1 select-none">•</span>
                            <p className="text-xs text-neutral-400">
                                {t("billing.cancelSubscriptionDetail2", "Your coins balance will reset to the default 50 coins immediately, and you will lose any extra coins.")}
                            </p>
                        </div>
                        <div className="flex gap-2.5 items-start">
                            <span className="text-xs text-amber-500 mt-1 select-none">•</span>
                            <p className="text-xs text-neutral-400">
                                {t("billing.cancelSubscriptionDetail4", "You will be limited to 1 meter (if you have more, extra meters will be disabled or read-only).")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-neutral-900/50 border-t border-neutral-800 flex flex-col sm:flex-row-reverse gap-3">
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {loading && <Loader2 className="size-4 animate-spin" />}
                        {t("billing.cancelSubscriptionConfirm", "Yes, Revert to Free")}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                        {t("billing.cancelSubscriptionCancel", "No, Keep My Plan")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelSubscriptionModal;
