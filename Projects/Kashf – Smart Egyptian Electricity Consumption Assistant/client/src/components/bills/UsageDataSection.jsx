import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, Hash } from 'lucide-react';

const UsageDataSection = ({ formData, handleChange }) => {
    const { t } = useTranslation();

    return (
        <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 border-b border-neutral-800/50 pb-2">
                {t("bills.usageData", "Usage Data")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5 mb-2">
                        <Calculator className="size-3.5 text-neutral-500" />
                        {t("bills.consumption", "Consumption (kWh)")}
                    </label>
                    <input
                        type="number"
                        name="consumption"
                        value={formData.consumption}
                        onChange={handleChange}
                        min="0"
                        placeholder="0"
                        className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-kashf-blue focus:bg-kashf-surface transition-all"
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5 mb-2">
                        <Hash className="size-3.5 text-neutral-500" />
                        {t("bills.history.tier", "Tier")}
                    </label>
                    <div className="relative">
                        <select
                            name="tier"
                            value={formData.tier}
                            onChange={handleChange}
                            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-kashf-blue focus:bg-kashf-surface transition-all appearance-none pr-10"
                            required
                        >
                            <option value="" disabled>
                                {t("common.select", "Select...")}
                            </option>
                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="size-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsageDataSection;
