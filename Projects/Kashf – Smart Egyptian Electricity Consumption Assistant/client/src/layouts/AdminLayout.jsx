import { Suspense, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    LayoutDashboard,
    Users,
    Monitor,
    Layers,
    Bell,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from "lucide-react";
import Loader from "../components/Loader/Loader";
import UserAvatar from "../components/common/UserAvatar";
import AdminHeader from "../components/common/AdminHeader";
import { selectUser } from "../store/auth/authSlice";
import { useLogout } from "../hooks/auth/useLogout";

const AdminLayout = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const isRtl = i18n.dir() === "rtl";
    const currentOutlet = useOutlet();
    const user = useSelector(selectUser);
    const logoutMutation = useLogout();

    const navItems = [
        { to: "/admin/dashboard", label: t("adminNav.dashboard"), icon: LayoutDashboard },
        { to: "/admin/users", label: t("adminNav.users"), icon: Users },
        { to: "/admin/scans", label: t("adminNav.scans"), icon: Monitor },
        { to: "/admin/tiers", label: t("adminNav.tiers"), icon: Layers },
        { to: "/admin/notifications", label: t("adminNav.notifications"), icon: Bell },
        { to: "/admin/settings", label: t("adminNav.settings"), icon: Settings },
    ];

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive
                ? "bg-kashf-blue/10 text-kashf-light-blue"
                : "text-neutral-400 hover:bg-kashf-hover hover:text-neutral-100"
        } ${isCollapsed ? "justify-center px-0 mx-2" : "px-3"}`;

    useEffect(() => {
        const main = document.getElementById("admin-main-content");
        if (main) main.scrollTo(0, 0);
    });

    return (
        <div className="flex flex-col h-screen bg-kashf-bg overflow-hidden text-neutral-100">
            <div className="z-20 shadow-sm border-b border-kashf-border relative">
                <AdminHeader />
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                <div className="hidden lg:flex z-10 shadow-2xl shadow-black/50">
                    <aside className={`${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 flex-shrink-0 border-e border-kashf-border bg-kashf-bg flex flex-col h-full overflow-y-auto scrollbar-tight`}>
                <div className="flex flex-col h-full w-full">
                    <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-4 pt-4 pb-2 shrink-0`}>
                        {!isCollapsed && (
                            <NavLink to="/admin/dashboard" className="text-xs font-bold text-kashf-blue uppercase tracking-wider no-underline select-none">
                                {t("common.brandAdmin")}
                            </NavLink>
                        )}
                        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-kashf-hover transition-colors">
                            {isCollapsed
                                ? (isRtl ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />)
                                : (isRtl ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />)}
                        </button>
                    </div>

                    <nav className={`flex-1 py-6 space-y-1 ${isCollapsed ? "px-2" : "px-4"}`}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink key={item.to} to={item.to} className={navLinkClass} title={isCollapsed ? item.label : undefined}>
                                    <Icon className="size-5 shrink-0" />
                                    {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
                                </NavLink>
                            );
                        })}
                    </nav>

                    <div className={`p-4 border-t border-kashf-border space-y-4 shrink-0 flex flex-col ${isCollapsed ? "items-center" : ""}`}>
                        <NavLink
                            to="/"
                            className={`flex items-center text-sm text-neutral-600 hover:text-kashf-light-blue transition-colors ${isCollapsed ? "justify-center p-2 rounded-lg" : "gap-2 px-2 py-1.5"}`}
                            title={isCollapsed ? t("adminNav.backToApp") : undefined}
                        >
                            <ChevronLeft className="size-4 shrink-0" />
                            {!isCollapsed && <span>{t("adminNav.backToApp")}</span>}
                        </NavLink>

                        <div
                            onClick={() => navigate("/profile")}
                            className={`flex items-center cursor-pointer hover:bg-kashf-hover p-2 -mx-2 rounded-lg transition-colors ${isCollapsed ? "justify-center" : "gap-3 w-full"}`}
                            title={t("nav.profile")}
                        >
                            <UserAvatar user={user} className="size-9 shrink-0" />
                            {!isCollapsed && (
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-neutral-100">{user?.username || t("profileMenu.fallbackName")}</p>
                                    {user?.email && <p className="truncate text-[10px] text-neutral-500">{user.email}</p>}
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            disabled={logoutMutation.isPending}
                            onClick={() => logoutMutation.mutate()}
                            className={`flex items-center text-red-400 hover:bg-red-400/10 transition-colors ${
                                isCollapsed ? "justify-center p-2 rounded-lg" : "w-full gap-3 px-3 py-2 rounded-lg text-sm font-medium"
                            }`}
                            title={isCollapsed ? t("auth.logout") : undefined}
                        >
                            <LogOut className="size-5 shrink-0" />
                            {!isCollapsed && <span className="truncate">{logoutMutation.isPending ? t("auth.logoutSubmitting") : t("auth.logout")}</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </div>

        <main id="admin-main-content" className="flex-1 overflow-y-auto bg-neutral-900/30 p-4 md:p-6 lg:p-8">
            <Suspense fallback={<Loader />}>
                {currentOutlet}
            </Suspense>
        </main>
    </div>
    </div>
    );
};

export default AdminLayout;
