import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Pencil, Check, X } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import adminService from "../../services/adminService";

const TierRow = ({ tier, onSave }) => {
    const { t } = useTranslation();
    const [editing, setEditing] = useState(false);
    const [threshold, setThreshold] = useState(tier.threshold);
    const [rate, setRate] = useState(tier.rate);

    const handleSave = () => {
        onSave(tier._id, { threshold: Number(threshold), rate: Number(rate) });
        setEditing(false);
    };

    const handleCancel = () => {
        setThreshold(tier.threshold);
        setRate(tier.rate);
        setEditing(false);
    };

    return (
        <tr className="border-b border-kashf-border last:border-b-0 hover:bg-kashf-muted/30 transition-colors">
            <td className="px-5 py-4">
                <span className="inline-flex items-center justify-center size-8 rounded-lg bg-kashf-blue/10 text-kashf-blue font-semibold text-sm">
                    {tier.tier}
                </span>
            </td>
            <td className="px-5 py-4">
                {tier.label && (
                    <span className="text-neutral-400 text-sm">{tier.label}</span>
                )}
            </td>
            <td className="px-5 py-4">
                {editing ? (
                    <input
                        type="number"
                        value={threshold}
                        onChange={(e) => setThreshold(e.target.value)}
                        className="w-24 bg-kashf-muted border border-kashf-border rounded-lg px-2.5 py-1.5 text-sm text-neutral-100 focus:outline-none focus:border-kashf-blue/50"
                    />
                ) : (
                    <span className="text-neutral-100 text-sm font-mono">{tier.threshold.toLocaleString()}</span>
                )}
            </td>
            <td className="px-5 py-4">
                {editing ? (
                    <input
                        type="number"
                        step="0.01"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-24 bg-kashf-muted border border-kashf-border rounded-lg px-2.5 py-1.5 text-sm text-neutral-100 focus:outline-none focus:border-kashf-blue/50"
                    />
                ) : (
                    <span className="text-neutral-100 text-sm font-mono">{tier.rate.toFixed(2)}</span>
                )}
            </td>
            <td className="px-5 py-4 text-end">
                {editing ? (
                    <div className="flex items-center justify-end gap-1">
                        <button
                            onClick={handleSave}
                            className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-400/10 transition-colors"
                            title={t("tierManagement.save")}
                        >
                            <Check className="size-4" />
                        </button>
                        <button
                            onClick={handleCancel}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                            title={t("tierManagement.cancel")}
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-100 hover:bg-kashf-muted transition-colors"
                        title={t("tierManagement.edit")}
                    >
                        <Pencil className="size-4" />
                    </button>
                )}
            </td>
        </tr>
    );
};

const TierManagementPage = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["admin-tiers"],
        queryFn: adminService.getTiers,
    });

    const updateMutation = useMutation({
        mutationFn: ({ tierId, data }) => adminService.updateTier(tierId, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-tiers"] }),
    });

    const tiers = data?.data?.tiers ?? [];

    return (
        <>
            <Helmet>
                <title>{t("adminHelmet.tierManagement.title")}</title>
                <meta name="description" content={t("adminHelmet.tierManagement.description")} />
            </Helmet>
            <div className="space-y-8 max-w-7xl mx-auto pb-12 px-6 pt-8">
            <PageHeader
                title={t("pages.tierManagement.title")}
                subtitle={t("pages.tierManagement.description")}
            />

            <div className="bg-kashf-surface border border-kashf-border rounded-xl overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-neutral-500 text-sm">{t("common.loading")}</div>
                ) : isError ? (
                    <div className="p-12 text-center text-red-400 text-sm">{error?.message || t("tierManagement.loadError")}</div>
                ) : tiers.length === 0 ? (
                    <div className="p-12 text-center text-neutral-500 text-sm">{t("tierManagement.noTiers")}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-kashf-border text-neutral-500 text-xs uppercase tracking-wider">
                                    <th className="text-start px-5 py-3 font-medium">{t("tierManagement.tier")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("tierManagement.label")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("tierManagement.threshold")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("tierManagement.rate")}</th>
                                    <th className="text-end px-5 py-3 font-medium">{t("tierManagement.actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tiers.map((tier) => (
                                    <TierRow
                                        key={tier._id}
                                        tier={tier}
                                        onSave={(tierId, data) => updateMutation.mutate({ tierId, data })}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {!isLoading && !isError && tiers.length > 0 && (
                <div className="bg-kashf-surface border border-kashf-border rounded-xl p-5">
                    <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
                        {t("tierManagement.infoTitle")}
                    </h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        {t("tierManagement.infoText", { last: tiers.length, threshold: tiers[tiers.length - 1]?.threshold?.toLocaleString() })}
                    </p>
                </div>
            )}
        </div>
        </>
    );
};

export default TierManagementPage;
