import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
    Search,
    X,
    Trash2,
    ChevronLeft,
    ChevronRight,
    UserX,
    UserCheck,
} from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import adminService from "../../services/adminService";

const STATUS_FILTERS = ["all", "active", "disabled"];

const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("en-CA");
};

const UsersManagementPage = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");

    const searchTimer = useCallback((val) => {
        const timer = setTimeout(() => {
            setDebouncedSearch(val);
            setPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (val) => {
        setSearch(val);
        searchTimer(val);
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["admin-users", debouncedSearch, page, statusFilter],
        queryFn: () =>
            adminService.getUsers({
                search: debouncedSearch || undefined,
                page,
                limit: 20,
                status: statusFilter !== "all" ? statusFilter : undefined,
            }),
        placeholderData: keepPreviousData,
    });

    const toggleMutation = useMutation({
        mutationFn: ({ userId, isActive }) => adminService.toggleUserStatus(userId, isActive),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
    });

    const deleteMutation = useMutation({
        mutationFn: (userId) => adminService.deleteUser(userId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
    });

    const users = data?.data?.users ?? [];
    const pagination = data?.data?.pagination;

    return (
        <>
            <Helmet>
                <title>{t("adminHelmet.usersManagement.title")}</title>
                <meta name="description" content={t("adminHelmet.usersManagement.description")} />
            </Helmet>
            <div className="space-y-8 max-w-7xl mx-auto pb-12 px-6 pt-8">
            <PageHeader
                title={t("pages.usersManagement.title")}
                subtitle={t("pages.usersManagement.description")}
            />

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={t("usersManagement.searchPlaceholder")}
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

                <div className="flex gap-1 bg-kashf-surface border border-kashf-border rounded-lg p-0.5">
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
                            {t(`usersManagement.status${f.charAt(0).toUpperCase() + f.slice(1)}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-kashf-surface border border-kashf-border rounded-xl overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-neutral-500 text-sm">{t("common.loading")}</div>
                ) : isError ? (
                    <div className="p-12 text-center text-red-400 text-sm">{error?.message || t("usersManagement.loadError")}</div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center text-neutral-500 text-sm">
                        {t("usersManagement.noUsers")}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-kashf-border text-neutral-500 text-xs uppercase tracking-wider">
                                    <th className="text-start px-5 py-3 font-medium">{t("usersManagement.username")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("usersManagement.email")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("usersManagement.plan")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("usersManagement.status")}</th>
                                    <th className="text-start px-5 py-3 font-medium">{t("usersManagement.joined")}</th>
                                    <th className="text-end px-5 py-3 font-medium">{t("usersManagement.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-kashf-border">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-kashf-muted/30 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <span className="size-8 rounded-full bg-kashf-muted flex items-center justify-center text-xs font-semibold text-kashf-light-blue shrink-0">
                                                    {(user.username?.[0] || "?").toUpperCase()}
                                                </span>
                                                <span className="font-medium text-neutral-100 truncate max-w-[140px]">
                                                    {user.username}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-neutral-400 truncate max-w-[200px]">
                                            {user.email}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="capitalize text-xs bg-kashf-muted px-2 py-0.5 rounded-full text-neutral-400">
                                                {user.subscriptionPlan || "free"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                                user.isActive ? "text-emerald-400" : "text-red-400"
                                            }`}>
                                                <span className={`size-1.5 rounded-full ${
                                                    user.isActive ? "bg-emerald-400" : "bg-red-400"
                                                }`} />
                                                {user.isActive
                                                    ? t("usersManagement.active")
                                                    : t("usersManagement.disabled")}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-neutral-500 text-xs">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="px-5 py-3.5 text-end">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() =>
                                                        toggleMutation.mutate({ userId: user._id, isActive: !user.isActive })
                                                    }
                                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-100 hover:bg-kashf-muted transition-colors"
                                                    title={user.isActive ? t("usersManagement.disableConfirm") : t("usersManagement.enableConfirm")}
                                                >
                                                    {user.isActive ? <UserX className="size-4" /> : <UserCheck className="size-4" />}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(t("usersManagement.deleteConfirm"))) {
                                                            deleteMutation.mutate(user._id);
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
                                ))}
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

export default UsersManagementPage;
