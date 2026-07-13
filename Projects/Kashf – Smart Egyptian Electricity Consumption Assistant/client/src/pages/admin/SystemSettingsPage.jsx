import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Key, Upload, Shield, Save } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import adminService from "../../services/adminService";

const SettingField = ({ label, type = "text", value, onChange, placeholder, disabled }) => (
    <div className="flex items-center justify-between gap-4 py-3">
        <label className="text-sm text-neutral-300">{label}</label>
        {type === "boolean" ? (
            <button
                type="button"
                onClick={() => onChange(!value)}
                disabled={disabled}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                    value ? "bg-kashf-blue" : "bg-kashf-muted"
                } disabled:opacity-50`}
            >
                <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
                    value ? "translate-x-5" : ""
                }`} />
            </button>
        ) : (
            <input
                type={type}
                value={value ?? ""}
                onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className="w-48 bg-kashf-muted border border-kashf-border rounded-lg px-3 py-1.5 text-sm text-neutral-100 text-end focus:outline-none focus:border-kashf-blue/50 disabled:opacity-50"
            />
        )}
    </div>
);

const SettingsSection = ({ icon: Icon, title, desc, children }) => (
    <div className="bg-kashf-surface border border-kashf-border rounded-xl p-5 space-y-1">
        <div className="flex items-center gap-3 mb-4">
            <span className="size-9 rounded-lg bg-kashf-muted flex items-center justify-center">
                <Icon className="size-4 text-kashf-blue" />
            </span>
            <div>
                <h3 className="text-sm font-medium text-neutral-100">{title}</h3>
                <p className="text-xs text-neutral-500">{desc}</p>
            </div>
        </div>
        <div className="divide-y divide-kashf-border">{children}</div>
    </div>
);

const SystemSettingsPage = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["admin-settings"],
        queryFn: adminService.getSettings,
    });

    const [form, setForm] = useState({});
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        if (data?.data?.settings) {
            setForm((prev) => {
                const merged = { ...data.data.settings };
                for (const key of Object.keys(prev)) {
                    if (!(key in merged)) merged[key] = prev[key];
                }
                return merged;
            });
        }
    }, [data]);

    const updateField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setDirty(true);
    };

    const saveMutation = useMutation({
        mutationFn: (payload) => adminService.updateSettings(payload),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
            setDirty(false);
        },
    });

    const handleSave = () => {
        const payload = {};
        for (const key of Object.keys(form)) {
            if (form[key] !== data?.data?.settings[key]) {
                payload[key] = form[key];
            }
        }
        if (Object.keys(payload).length > 0) {
            saveMutation.mutate(payload);
        }
    };

    const settings = data?.data?.settings ?? {};

    if (isLoading) {
        return (
            <div className="space-y-8 max-w-4xl mx-auto pb-12 px-6 pt-8">
                <PageHeader title={t("pages.systemSettings.title")} subtitle={t("pages.systemSettings.description")} />
                <div className="p-12 text-center text-neutral-500 text-sm">{t("common.loading")}</div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{t("adminHelmet.systemSettings.title")}</title>
                <meta name="description" content={t("adminHelmet.systemSettings.description")} />
            </Helmet>
            <div className="space-y-8 max-w-4xl mx-auto pb-12 px-6 pt-8">
            <PageHeader
                title={t("pages.systemSettings.title")}
                subtitle={t("pages.systemSettings.description")}
            />

            <div className="space-y-6">
                <SettingsSection icon={Key} title={t("systemSettings.sectionApi")} desc={t("systemSettings.sectionApiDesc")}>
                    <SettingField
                        label={t("systemSettings.geminiApiKey")}
                        value={form.geminiApiKey ?? ""}
                        onChange={(v) => updateField("geminiApiKey", v)}
                        placeholder={t("systemSettings.geminiApiKeyPlaceholder")}
                    />
                </SettingsSection>

                <SettingsSection icon={Upload} title={t("systemSettings.sectionUpload")} desc={t("systemSettings.sectionUploadDesc")}>
                    <SettingField
                        label={t("systemSettings.maxUploadSizeMb")}
                        type="number"
                        value={form.maxUploadSizeMb ?? 10}
                        onChange={(v) => updateField("maxUploadSizeMb", v)}
                    />
                    <SettingField
                        label={t("systemSettings.maxMetersFree")}
                        type="number"
                        value={form.maxMetersFree ?? 1}
                        onChange={(v) => updateField("maxMetersFree", v)}
                    />
                    <SettingField
                        label={t("systemSettings.maxMetersPlus")}
                        type="number"
                        value={form.maxMetersPlus ?? 2}
                        onChange={(v) => updateField("maxMetersPlus", v)}
                    />
                    <SettingField
                        label={t("systemSettings.maxMetersFamily")}
                        type="number"
                        value={form.maxMetersFamily ?? 5}
                        onChange={(v) => updateField("maxMetersFamily", v)}
                    />
                </SettingsSection>

                <SettingsSection icon={Shield} title={t("systemSettings.sectionSession")} desc={t("systemSettings.sectionSessionDesc")}>
                    <SettingField
                        label={t("systemSettings.sessionTimeoutMinutes")}
                        type="number"
                        value={form.sessionTimeoutMinutes ?? 60}
                        onChange={(v) => updateField("sessionTimeoutMinutes", v)}
                    />
                    <SettingField
                        label={t("systemSettings.maintenanceMode")}
                        type="boolean"
                        value={form.maintenanceMode ?? false}
                        onChange={(v) => updateField("maintenanceMode", v)}
                    />
                </SettingsSection>
            </div>

            {/* Save Bar */}
            <div className={`sticky bottom-6 flex items-center justify-between bg-kashf-surface border rounded-xl p-4 transition-all ${
                dirty ? "border-kashf-blue/40" : "border-kashf-border"
            }`}>
                <span className="text-sm text-neutral-500">
                    {dirty ? t("systemSettings.unsaved") : t("systemSettings.saved")}
                </span>
                <button
                    onClick={handleSave}
                    disabled={!dirty || saveMutation.isPending}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-kashf-blue text-white text-sm font-medium hover:bg-kashf-blue/80 disabled:opacity-50 transition-colors"
                >
                    <Save className="size-4" />
                    {saveMutation.isPending ? t("systemSettings.saving") : t("systemSettings.save")}
                </button>
            </div>
        </div>
        </>
    );
};

export default SystemSettingsPage;
