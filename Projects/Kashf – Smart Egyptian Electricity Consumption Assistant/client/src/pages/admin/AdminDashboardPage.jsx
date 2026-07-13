import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    Users,
    Monitor,
    Activity,
    ArrowRight,
    Smartphone,
    Bell,
    Settings,
    Receipt,
} from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/common/StatCard";
import adminService from "../../services/adminService";

const quickLinks = [
    { to: "/admin/users", label: "adminNav.users", icon: Users, color: "text-kashf-blue" },
    { to: "/admin/scans", label: "adminNav.scans", icon: Monitor, color: "text-emerald-400" },
    { to: "/admin/notifications", label: "adminNav.notifications", icon: Bell, color: "text-amber-400" },
    { to: "/admin/settings", label: "adminNav.settings", icon: Settings, color: "text-neutral-400" },
];

const AdminDashboardPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: adminService.getDashboardStats,
    });

    const { data: recentUsers } = useQuery({
        queryKey: ["admin-recent-users"],
        queryFn: () => adminService.getRecentUsers(5),
    });

    const s = stats?.data;
    const users = recentUsers?.data ?? [];

    return (
        <>
            <Helmet>
                <title>{t("adminHelmet.adminDashboard.title")}</title>
                <meta name="description" content={t("adminHelmet.adminDashboard.description")} />
            </Helmet>
            <div className="space-y-10 max-w-7xl mx-auto pb-12 px-6 pt-8">
            <PageHeader
                title={t("pages.adminDashboard.title")}
                subtitle={t("pages.adminDashboard.description")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    title={t("adminDashboard.totalUsers")}
                    value={statsLoading ? "—" : (s?.totalUsers ?? "—")}
                    icon={Users}
                    color="text-kashf-blue"
                    trend={!statsLoading && s?.usersTrend ? s.usersTrend : null}
                />
                <StatCard
                    title={t("adminDashboard.totalDevices")}
                    value={statsLoading ? "—" : (s?.totalDevices ?? "—")}
                    icon={Smartphone}
                    color="text-emerald-400"
                />
                <StatCard
                    title={t("adminDashboard.totalBills")}
                    value={statsLoading ? "—" : (s?.totalBills ?? "—")}
                    icon={Receipt}
                    color="text-purple-400"
                />
                <StatCard
                    title={t("adminDashboard.activeRate")}
                    value={statsLoading ? "—" : (s?.activeRate ?? "—")}
                    unit="%"
                    icon={Activity}
                    color="text-amber-400"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                        {t("adminDashboard.recentRegistrations")}
                    </h3>
                    <div className="bg-kashf-surface border border-kashf-border rounded-xl overflow-hidden">
                        {users.length === 0 ? (
                            <div className="p-8 text-center text-neutral-500 text-sm">
                                {t("adminDashboard.noRecentUsers")}
                            </div>
                        ) : (
                            <ul className="divide-y divide-kashf-border">
                                {users.map((user) => (
                                    <li key={user.id} className="flex items-center gap-4 px-5 py-4 hover:bg-kashf-muted/50 transition-colors">
                                        <span className="size-9 rounded-full bg-kashf-muted flex items-center justify-center text-xs font-semibold text-kashf-light-blue shrink-0">
                                            {(user.username?.[0] || "?").toUpperCase()}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-neutral-100 truncate">
                                                {user.username || t("common.unknown")}
                                            </p>
                                            {user.email && (
                                                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-neutral-600 shrink-0">
                                            {user.createdAt || ""}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                        {t("adminDashboard.quickActions")}
                    </h3>
                    <div className="space-y-2">
                        {quickLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <button
                                    key={link.to}
                                    onClick={() => navigate(link.to)}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-kashf-surface border border-kashf-border text-sm text-neutral-300 hover:border-kashf-blue/30 hover:text-neutral-100 transition-colors text-start"
                                >
                                    <Icon className={`size-5 shrink-0 ${link.color}`} />
                                    <span className="flex-1">{t(link.label)}</span>
                                    <ArrowRight className="size-4 text-neutral-600" />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AdminDashboardPage;
