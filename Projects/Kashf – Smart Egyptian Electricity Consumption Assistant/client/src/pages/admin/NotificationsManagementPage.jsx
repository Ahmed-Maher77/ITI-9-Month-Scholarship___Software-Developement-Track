import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
    Trash2,
    ChevronLeft,
    ChevronRight,
    Send,
    X,
    Bell,
    AlertTriangle,
    Lightbulb,
    Info,
} from 'lucide-react';
import PageHeader from "../../components/layout/PageHeader";
import adminService from "../../services/adminService";

const TYPE_ICONS = {
    warning: AlertTriangle,
    critical: Bell,
    recommendation: Lightbulb,
    system: Info,
};

const TYPE_COLORS = {
    warning: "text-amber-400",
    critical: "text-red-400",
    recommendation: "text-emerald-400",
    system: "text-kashf-blue",
};

const NOTIF_TYPES = ["all", "warning", "critical", "recommendation", "system"];
const READ_FILTERS = ["all", "read", "unread"];

const formatDateTime = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-CA", {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit",
    });
};

const NotificationsManagementPage = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [typeFilter, setTypeFilter] = useState("all");
    const [readFilter, setReadFilter] = useState("all");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        userIds: "",
        type: "system",
        titleKey: "",
        messageKey: "",
    });

    const readParam = readFilter === "all" ? undefined : readFilter === "read" ? "true" : "false";

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["admin-notifications", typeFilter, readParam, page],
        queryFn: () =>
            adminService.getNotifications({
                type: typeFilter,
                read: readParam,
                page,
                limit: 20,
            }),
        placeholderData: keepPreviousData,
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => adminService.deleteNotification(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-notifications"] }),
    });

    const createMutation = useMutation({
        mutationFn: (data) => adminService.createNotification(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
            setShowForm(false);
            setFormData({ userIds: "", type: "system", titleKey: "", messageKey: "" });
        },
    });

    const notifications = data?.data?.notifications ?? [];
    const pagination = data?.data?.pagination;

    const handleSend = (e) => {
        e.preventDefault();
        const userIds = formData.userIds
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean);

        if (userIds.length === 0) return;

        createMutation.mutate({
            userIds,
            type: formData.type,
            titleKey: formData.titleKey,
            messageKey: formData.messageKey,
        });
    };

    return (
        <>
            <Helmet>
                <title>{t("adminHelmet.notificationsManagement.title")}</title>
                <meta name="description" content={t("adminHelmet.notificationsManagement.description")} />
            </Helmet>
            <div className="space-y-8 max-w-7xl mx-auto pb-12 px-6 pt-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <PageHeader
                    title={t("pages.notificationsManagement.title")}
                    subtitle={t("pages.notificationsManagement.description")}
                />
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-kashf-blue/15 text-kashf-blue text-sm font-medium hover:bg-kashf-blue/25 transition-colors shrink-0"
                >
                    {showForm ? <X className="size-4" /> : <Send className="size-4" />}
                    {t("notificationsManagement.sendNew")}
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <form onSubmit={handleSend} className="bg-kashf-surface border border-kashf-border rounded-xl p-5 space-y-4">
                    <h4 className="text-sm font-medium text-neutral-100">{t("notificationsManagement.formTitle")}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-neutral-500 mb-1">{t("notificationsManagement.formUserIds")}</label>
                            <input
                                type="text"
                                value={formData.userIds}
                                onChange={(e) => setFormData({ ...formData, userIds: e.target.value })}
                                className="w-full bg-kashf-muted border border-kashf-border rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-kashf-blue/50"
                                                placeholder={t("notificationsManagement.formPlaceholderUserIds")}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-neutral-500 mb-1">{t("notificationsManagement.formType")}</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-kashf-muted border border-kashf-border rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-kashf-blue/50"
                            >
                                {NOTIF_TYPES.filter((t) => t !== "all").map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-neutral-500 mb-1">{t("notificationsManagement.formTitleKey")}</label>
                            <input
                                type="text"
                                value={formData.titleKey}
                                onChange={(e) => setFormData({ ...formData, titleKey: e.target.value })}
                                className="w-full bg-kashf-muted border border-kashf-border rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-kashf-blue/50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-neutral-500 mb-1">{t("notificationsManagement.formMessageKey")}</label>
                            <input
                                type="text"
                                value={formData.messageKey}
                                onChange={(e) => setFormData({ ...formData, messageKey: e.target.value })}
                                className="w-full bg-kashf-muted border border-kashf-border rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-kashf-blue/50"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 rounded-lg text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                            {t("notificationsManagement.formCancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="px-4 py-2 rounded-lg bg-kashf-blue text-white text-sm font-medium hover:bg-kashf-blue/80 disabled:opacity-50 transition-colors"
                        >
                            {createMutation.isPending ? t("notificationsManagement.formSending") : t("notificationsManagement.formSend")}
                        </button>
                    </div>
                </form>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-1 bg-kashf-surface border border-kashf-border rounded-lg p-0.5 flex-wrap">
                    {NOTIF_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => { setTypeFilter(type); setPage(1); }}
                            className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                typeFilter === type
                                    ? "bg-kashf-blue/15 text-kashf-blue"
                                    : "text-neutral-500 hover:text-neutral-300"
                            }`}
                        >
                            {t(`notificationsManagement.type${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                        </button>
                    ))}
                </div>
                <div className="flex gap-1 bg-kashf-surface border border-kashf-border rounded-lg p-0.5">
                    {READ_FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => { setReadFilter(f); setPage(1); }}
                            className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                readFilter === f
                                    ? "bg-kashf-blue/15 text-kashf-blue"
                                    : "text-neutral-500 hover:text-neutral-300"
                            }`}
                        >
                            {t(`notificationsManagement.read${f.charAt(0).toUpperCase() + f.slice(1)}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-kashf-surface border border-kashf-border rounded-xl overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-neutral-500 text-sm">{t("common.loading")}</div>
                ) : isError ? (
                    <div className="p-12 text-center text-red-400 text-sm">{error?.message || t("notificationsManagement.loadError")}</div>
                ) : notifications.length === 0 ? (
                    <div className="p-12 text-center text-neutral-500 text-sm">{t("notificationsManagement.noNotifications")}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-kashf-border text-neutral-500 text-xs uppercase tracking-wider">
                                    <th className="text-start px-5 py-3 font-medium">{t("notificationsManagement.user")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("notificationsManagement.type")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("notificationsManagement.title")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("notificationsManagement.status")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("notificationsManagement.date")}</th>
                                    <th className="text-end px-5 py-3 font-medium">{t("notificationsManagement.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-kashf-border">
                                {notifications.map((notif) => {
                                    const Icon = TYPE_ICONS[notif.type] || Bell;
                                    const color = TYPE_COLORS[notif.type] || "text-neutral-400";
                                    return (
                                        <tr key={notif._id} className="hover:bg-kashf-muted/30 transition-colors">
                                            <td className="px-5 py-3.5">
                                                <span className="text-sm text-neutral-300 truncate max-w-[140px] block">
                                                    {notif.user?.username || "—"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${color}`}>
                                                    <Icon className="size-4" />
                                                    {t(`notificationsManagement.type${notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}`)}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-neutral-300 text-xs max-w-[200px] truncate">
                                                {notif.titleKey}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`text-xs font-medium ${notif.isRead ? "text-neutral-500" : "text-kashf-blue"}`}>
                                                    {notif.isRead ? t("notificationsManagement.read") : t("notificationsManagement.unread")}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-neutral-500 text-xs whitespace-nowrap">
                                                {formatDateTime(notif.createdAt)}
                                            </td>
                                            <td className="px-5 py-3.5 text-end">
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(t("notificationsManagement.deleteConfirm"))) {
                                                            deleteMutation.mutate(notif._id);
                                                        }
                                                    }}
                                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
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

export default NotificationsManagementPage;
