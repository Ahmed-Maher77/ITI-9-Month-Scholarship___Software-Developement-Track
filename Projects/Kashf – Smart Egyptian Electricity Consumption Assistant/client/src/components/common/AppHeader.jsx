import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthProfile } from "../../hooks/auth/useAuthProfile";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileMenu from "./ProfileMenu";
import UserAvatar from "./UserAvatar";
import MobileProfileActions from "./MobileProfileActions";
import MobileDrawer from "./MobileDrawer";

const navLinkClass = ({ isActive }) =>
    `text-sm no-underline transition-colors hover:text-kashf-light-blue ${
        isActive ? "text-kashf-light-blue" : "text-neutral-500"
    }`;

const navLinkClassMobile = ({ isActive }) =>
    `flex w-full items-center px-4 py-3 rounded-lg text-base no-underline transition-colors hover:bg-kashf-muted hover:text-kashf-light-blue ${
        isActive ? "bg-kashf-muted text-kashf-light-blue font-semibold" : "text-neutral-300"
    }`;

const AppHeader = () => {
    const { t, i18n } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isRtl = i18n.dir() === "rtl";

    const user = useSelector(selectUser);
    const { unreadCount } = useSelector((state) => state.alerts);
    useAuthProfile();
    const logoutMutation = useLogout();
    const displayName = user?.username || t("profileMenu.fallbackName");

    const navItems = [
        { to: "/dashboard", label: t("nav.dashboard") },
        { to: "/meters", label: t("nav.meters") },
        { to: "/meters", label: t("nav.simulationOverview") },
        { to: "/analytics", label: t("nav.analytics") },
        { to: "/bills", label: t("nav.bills") },
        { to: "/ai-advisor", label: t("nav.aiAdvisor") },
        { to: "/alerts", label: t("nav.alerts") },
        { to: "/billing", label: t("nav.billing") },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
    };

    const headerContainerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    };

    const headerItemVariants = {
        hidden: { opacity: 0, y: -15 },
        show: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.6 + (i * 0.1),
                duration: 0.4,
                ease: "easeOut"
            }
        })
    };

    // Close sidebar and scroll lock are handled by MobileDrawer

    return (
        <header className="border-b border-kashf-border px-6 py-4 bg-kashf-bg">
            <motion.div 
                className="mx-auto flex items-center justify-between gap-4"
                variants={headerContainerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={headerItemVariants} custom={0} initial="hidden" animate="show">
                    <BrandLogo />
                </motion.div>

                {/* Desktop Actions */}
                <div className="hidden lg:flex flex-1 items-center justify-end gap-4 ms-6">
                    <motion.div variants={headerItemVariants} custom={1} initial="hidden" animate="show">
                        <LanguageSwitcher />
                    </motion.div>
                    <motion.div variants={headerItemVariants} custom={2} initial="hidden" animate="show">
                        <ProfileMenu />
                    </motion.div>
                </div>

                {/* Mobile Actions (Burger Button) */}
                <div className="flex lg:hidden items-center gap-3">
                    <motion.div variants={headerItemVariants} custom={1} initial="hidden" animate="show">
                        <LanguageSwitcher />
                    </motion.div>
                    <motion.button
                        variants={headerItemVariants}
                        custom={2}
                        initial="hidden"
                        animate="show"
                        type="button"
                        onClick={() => setIsSidebarOpen(true)}
                        className="rounded-md p-1.5 text-neutral-400 hover:bg-kashf-muted hover:text-neutral-100 cursor-pointer"
                        aria-label="Open sidebar"
                    >
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </motion.button>
                </div>
            </motion.div>

            <MobileDrawer isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isRtl={isRtl}>
                <motion.div 
                    className="flex flex-col gap-6 flex-1 overflow-y-auto overflow-x-hidden scrollbar-tight"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isSidebarOpen ? "show" : "hidden"}
                >
                    {/* Mobile Navigation Links */}
                    <nav className="flex flex-col gap-1.5" aria-label={t("nav.mainAria")}>
                        {navItems.map(({ to, label }) => (
                            <motion.div key={`${to}-${label}`} variants={itemVariants}>
                                <NavLink
                                    to={to}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={navLinkClassMobile}
                                >
                                    <span className="truncate flex-1">{label}</span>
                                    {to === "/alerts" && unreadCount > 0 && (
                                        <span className={`flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white px-1.5 ${isRtl ? "mr-auto" : "ml-auto"}`}>
                                            {unreadCount}
                                        </span>
                                    )}
                                </NavLink>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Mobile Profile & Actions */}
                    <motion.div variants={itemVariants} className="mt-auto w-full">
                        <MobileProfileActions setIsSidebarOpen={setIsSidebarOpen} />
                    </motion.div>
                </motion.div>
            </MobileDrawer>
        </header>
    );
};

export default AppHeader;
