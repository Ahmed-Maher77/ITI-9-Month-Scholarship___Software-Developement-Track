import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
    LayoutDashboard, 
    Zap, 
    BarChart2, 
    Receipt, 
    Sparkles, 
    Bell, 
    CreditCard, 
    User, 
    LogOut,
    ChevronLeft,
    ChevronRight,
    Gauge
} from "lucide-react";

import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";
import { useLogout } from "../../hooks/auth/useLogout";

const DashboardSidebar = () => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";
    const user = useSelector(selectUser);
    const { unreadCount } = useSelector((state) => state.alerts);
    const logoutMutation = useLogout();
    const displayName = user?.username || t("profileMenu.fallbackName");
    const planName = user?.subscriptionPlan === "family" ? t("nav.plan.family") : user?.subscriptionPlan === "plus" ? t("nav.plan.plus") : t("nav.plan.free");
    
    const planBaseCoins = user?.subscriptionPlan === "family" ? 300 : user?.subscriptionPlan === "plus" ? 150 : 50;
    const totalCoins = planBaseCoins + (user?.rolloverCoins || 0);
    const remainingCoins = user?.coins ?? 50;
    const usedCoins = Math.max(0, totalCoins - remainingCoins);
    const usagePercentage = totalCoins > 0 ? (usedCoins / totalCoins) * 100 : 0;

    const navItems = [
        { to: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
        // { to: "/meters", label: t("nav.meters"), icon: Zap },
        { to: "/meters", label: t("nav.simulationOverview"), icon: Gauge },
        { to: "/analytics", label: t("nav.analytics"), icon: BarChart2 },
        { to: "/bills", label: t("nav.bills"), icon: Receipt },
        { to: "/ai-advisor", label: t("nav.aiAdvisor"), icon: Sparkles },
        { to: "/alerts", label: t("nav.alerts"), icon: Bell },
        { to: "/billing", label: t("nav.billing"), icon: CreditCard },
        { to: "/profile", label: t("nav.profile"), icon: User },
    ];

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 py-2 rounded-lg text-sm font-medium transition-all overflow-hidden ${
            isActive 
            ? "bg-kashf-blue/10 text-kashf-light-blue" 
            : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-100"
        } ${isCollapsed ? "justify-center px-0 mx-2" : "px-3"}`;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: isRtl ? 20 : -20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
    };

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 flex-shrink-0 border-e border-kashf-border bg-kashf-bg flex flex-col h-full overflow-y-auto scrollbar-tight`}>
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col h-full w-full">
                <motion.div variants={itemVariants} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 pt-4 pb-2 shrink-0`}>
                    {!isCollapsed && (
                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider select-none">
                            {t("nav.mainMenu", { defaultValue: "Main Menu" })}
                        </span>
                    )}
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                        {isCollapsed 
                            ? (isRtl ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />) 
                            : (isRtl ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />)}
                    </button>
                </motion.div>

                {/* Navigation */}
                <nav className={`flex-1 py-6 space-y-1 ${isCollapsed ? 'px-2' : 'px-4'}`}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div key={`${item.to}-${item.label}`} variants={itemVariants}>
                                <NavLink to={item.to} className={navLinkClass} title={isCollapsed ? item.label : undefined}>
                                    <div className="relative flex items-center justify-center shrink-0">
                                        <Icon className="size-5 shrink-0" />
                                        {item.to === "/alerts" && unreadCount > 0 && (
                                            <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white px-1 shadow-md">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
                                    {!isCollapsed && item.to === "/alerts" && unreadCount > 0 && (
                                        <span className={`flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white px-1.5 ${isRtl ? "mr-auto" : "ml-auto"}`}>
                                            {unreadCount}
                                        </span>
                                    )}
                                </NavLink>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className={`p-4 border-t border-kashf-border space-y-4 shrink-0 flex flex-col ${isCollapsed ? 'items-center' : ''}`}>
                    {/* Plan Indicator */}
                    {!isCollapsed && (
                        <motion.div variants={itemVariants} className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 transition-all">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-neutral-400">{t('nav.currentPlan')}</span>
                                <span className="text-[10px] font-bold text-kashf-light-blue bg-kashf-blue/10 px-2 py-0.5 rounded uppercase tracking-wider">{planName}</span>
                            </div>
                            {/* Usage Indicator */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-neutral-400">{t('nav.coinsUsage')}</span>
                                    <span className="text-neutral-200" dir="ltr">{usedCoins} / {totalCoins}</span>
                                </div>
                                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-kashf-blue rounded-full transition-all duration-500" style={{ width: `${usagePercentage}%` }}></div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Profile Actions */}
                    <motion.div 
                        variants={itemVariants} 
                        onClick={() => navigate('/profile')}
                        className={`flex items-center cursor-pointer hover:bg-neutral-800/50 p-2 -mx-2 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : 'gap-3 w-full'}`}
                        title={t("nav.profile")}
                    >
                        <UserAvatar user={user} className="size-9 shrink-0" />
                        {!isCollapsed && (
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-neutral-100">{displayName}</p>
                                {user?.email && <p className="truncate text-[10px] text-neutral-500">{user.email}</p>}
                            </div>
                        )}
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="w-full flex justify-center">
                        <button
                            type="button"
                            disabled={logoutMutation.isPending}
                            onClick={() => logoutMutation.mutate()}
                            className={`flex items-center text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer ${
                                isCollapsed ? 'justify-center p-2 rounded-lg' : 'w-full gap-3 px-3 py-2 rounded-lg text-sm font-medium'
                            }`}
                            title={isCollapsed ? t("auth.logout", { defaultValue: "Log out" }) : undefined}
                        >
                            <LogOut className="size-5 shrink-0" />
                            {!isCollapsed && <span className="truncate">{logoutMutation.isPending ? t("auth.logoutSubmitting", { defaultValue: "Logging out..." }) : t("auth.logout", { defaultValue: "Log out" })}</span>}
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </aside>
    );
};

export default DashboardSidebar;
