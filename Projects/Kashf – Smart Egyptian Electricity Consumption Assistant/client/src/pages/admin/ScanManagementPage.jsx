import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
    Search,
    X,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Wifi,
    WifiOff,
    Clock,
    Settings,
    MapPin,
} from 'lucide-react';
import PageHeader from "../../components/layout/PageHeader";
import adminService from "../../services/adminService";

const STATUS_FILTERS = ["all", "active", "standby", "inactive", "maintenance"];
const DEVICE_TYPE_ICONS = {
    residential: MapPin,
    commercial: Settings,
    vacation: Clock,
};

const statusColors = {
    active: "text-emerald-400",
    standby: "text-amber-400",
    inactive: "text-red-400",
    maintenance: "text-purple-400",
};
const statusBgColors = {
    active: "bg-emerald-400/10",
    standby: "bg-amber-400/10",
    inactive: "bg-red-400/10",
    maintenance: "bg-purple-400/10",
};

const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("en-CA");
};

const ScanManagementPage = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");

    const handleSearch = (val) => {
        setSearch(val);
        clearTimeout(window._deviceSearchTimer);
        window._deviceSearchTimer = setTimeout(() => {
            setDebouncedSearch(val);
            setPage(1);
        }, 400);
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["admin-devices", debouncedSearch, page, statusFilter],
        queryFn: () =>
            adminService.getDevices({
                search: debouncedSearch || undefined,
                page,
                limit: 20,
                status: statusFilter !== "all" ? statusFilter : undefined,
            }),
        placeholderData: keepPreviousData,
    });

    const updateMutation = useMutation({
        mutationFn: ({ deviceId, status }) => adminService.updateDeviceStatus(deviceId, status),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-devices"] }),
    });

    const deleteMutation = useMutation({
        mutationFn: (deviceId) => adminService.deleteDevice(deviceId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-devices"] }),
    });

    const devices = data?.data?.devices ?? [];
    const pagination = data?.data?.pagination;

    return (
        <>
            <Helmet>
                <title>{t("adminHelmet.deviceManagement.title")}</title>
                <meta name="description" content={t("adminHelmet.deviceManagement.description")} />
            </Helmet>
            <div className="space-y-8 max-w-7xl mx-auto pb-12 px-6 pt-8">
            <PageHeader
                title={t("pages.scanManagement.title")}
                subtitle={t("pages.scanManagement.description")}
            />

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={t("deviceManagement.searchPlaceholder")}
                        className="w-full bg-kashf-surface border border-kashf-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-kashf-blue/50 transition-colors"
                    />
                    {search && (
                        <button
                            onClick={() => { setSearch(""); setDebouncedSearch(""); setPage(1); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>

                <div className="flex gap-1 bg-kashf-surface border border-kashf-border rounded-lg p-0.5 flex-wrap">
                    {STATUS_FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => { setStatusFilter(f); setPage(1); }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                statusFilter === f
                                    ? "bg-kashf-blue/15 text-kashf-blue"
                                    : "text-neutral-500 hover:text-neutral-300"
                            }`}
                        >
                            {t(`deviceManagement.status${f.charAt(0).toUpperCase() + f.slice(1)}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-kashf-surface border border-kashf-border rounded-xl overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-neutral-500 text-sm">{t("common.loading")}</div>
                ) : isError ? (
                    <div className="p-12 text-center text-red-400 text-sm">{error?.message || t("deviceManagement.loadError")}</div>
                ) : devices.length === 0 ? (
                    <div className="p-12 text-center text-neutral-500 text-sm">
                        {t("deviceManagement.noDevices")}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-kashf-border text-neutral-500 text-xs uppercase tracking-wider">
                                    <th className="text-start px-5 py-3 font-medium">{t("deviceManagement.name")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("deviceManagement.number")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("deviceManagement.type")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("deviceManagement.owner")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("deviceManagement.status")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("deviceManagement.consumption")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("deviceManagement.lastReading")}</th>
                                    <th className="text-end px-5 py-3 font-medium">{t("deviceManagement.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-kashf-border">
                                {devices.map((device) => {
                                    const TypeIcon = DEVICE_TYPE_ICONS[device.type] || MapPin;
                                    return (
                                        <tr key={device._id} className="hover:bg-kashf-muted/30 transition-colors">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <span className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${statusBgColors[device.status] || "bg-kashf-muted"}`}>
                                                        <TypeIcon className={`size-4 ${statusColors[device.status] || "text-neutral-400"}`} />
                                                    </span>
                                                    <span className="font-medium text-neutral-100 truncate max-w-[140px]">
                                                        {device.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-neutral-400 font-mono text-xs">{device.number}</td>
                                            <td className="px-5 py-3.5 text-neutral-400 text-xs capitalize">
                                                {t(`deviceManagement.type${device.type.charAt(0).toUpperCase() + device.type.slice(1)}`)}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <div className="text-sm text-neutral-300 truncate max-w-[150px]">
                                                    {device.user?.username || "—"}
                                                </div>
                                                {device.user?.email && (
                                                    <div className="text-xs text-neutral-500 truncate max-w-[150px]">{device.user.email}</div>
                                                )}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusColors[device.status] || "text-neutral-400"}`}>
                                                    <span className={`size-1.5 rounded-full ${statusColors[device.status] ? `bg-current` : "bg-neutral-500"}`} />
                                                    {t(`deviceManagement.status${device.status.charAt(0).toUpperCase() + device.status.slice(1)}`)}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-neutral-300">
                                                {device.consumption ? `${device.consumption} ${t("common.kwh")}` : "—"}
                                            </td>
                                            <td className="px-5 py-3.5 text-neutral-500 text-xs">
                                                {formatDate(device.lastReading)}
                                            </td>
                                            <td className="px-5 py-3.5 text-end">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => updateMutation.mutate({
                                                            deviceId: device._id,
                                                            status: device.status === "active" ? "standby" : "active",
                                                        })}
                                                        className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-100 hover:bg-kashf-muted transition-colors"
                                                        title={t("deviceManagement.statusUpdated")}
                                                    >
                                                        {device.status === "active" ? <WifiOff className="size-4" /> : <Wifi className="size-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm(t("deviceManagement.deleteConfirm"))) {
                                                                deleteMutation.mutate(device._id);
                                                            }
                                                        }}
                                                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                                        title={t("common.delete")}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">
                        {t("common.pageOf", { current: pagination.page, total: pagination.totalPages })}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={pagination.page <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-kashf-surface border border-kashf-border text-neutral-300 hover:border-kashf-blue/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="size-4" />
                            {t("common.pagination.prev")}
                        </button>
                        <button
                            disabled={pagination.page >= pagination.totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-kashf-surface border border-kashf-border text-neutral-300 hover:border-kashf-blue/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            {t("common.pagination.next")}
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default ScanManagementPage;
