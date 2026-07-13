import React from 'react';
import { useTranslation } from 'react-i18next';

const FinancialSummarySection = ({ formData, handleChange }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 border-b border-neutral-800/50 pb-2">
                    {t("bills.financialSummary", "Financial Summary")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-neutral-400 flex items-center justify-between mb-2">
                            <span>{t("bills.history.amount", "Amount (EGP)")}</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-neutral-500 text-sm font-medium">
                                    {t("common.egp", "EGP")}
                                </span>
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                min="0"
                                placeholder="0.00"
                                className="w-full bg-kashf-surface border border-kashf-border rounded-xl pl-14 pr-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-kashf-blue transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-neutral-400 mb-2 block">
                            {t("bills.paymentStatus", "Payment Status")}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {["paid", "pending", "overdue"].map((statusOption) => (
                                <label
                                    key={statusOption}
                                    className={`cursor-pointer rounded-lg border text-center py-2.5 text-sm font-medium transition-all ${
                                        formData.status === statusOption
                                            ? statusOption === "paid"
                                                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                                                : statusOption === "overdue"
                                                ? "bg-red-500/10 border-red-500/50 text-red-400"
                                                : "bg-amber-500/10 border-amber-500/50 text-amber-400"
                                            : "bg-neutral-900/50 border-neutral-800 text-neutral-500 hover:border-neutral-700"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        value={statusOption}
                                        checked={formData.status === statusOption}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span className="capitalize">
                                        {t(`bills.history.${statusOption}`, statusOption)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/50">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-400">
                        {t("bills.totalPayable", "Total Payable")}
                    </span>
                    <span className="text-2xl font-bold text-white tracking-tight" dir="ltr">
                        EGP {formData.amount ? Number(formData.amount).toFixed(2) : "0.00"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FinancialSummarySection;
