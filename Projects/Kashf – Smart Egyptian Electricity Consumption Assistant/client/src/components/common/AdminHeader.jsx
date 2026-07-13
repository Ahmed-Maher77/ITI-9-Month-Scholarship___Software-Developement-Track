import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileProfileActions from "./MobileProfileActions";
import MobileDrawer from "./MobileDrawer";

const navLinkClassMobile = ({ isActive }) =>
    `flex w-full items-center px-4 py-3 rounded-lg text-base no-underline transition-colors hover:bg-kashf-muted hover:text-kashf-light-blue ${
        isActive ? "bg-kashf-muted text-kashf-light-blue font-semibold" : "text-neutral-300"
    }`;

const AdminHeader = () => {
    const { t, i18n } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isRtl = i18n.dir() === "rtl";

    const navItems = [
        { to: "/admin/dashboard", label: t("adminNav.dashboard") },
        { to: "/admin/users", label: t("adminNav.users") },
        { to: "/admin/scans", label: t("adminNav.scans") },
        { to: "/admin/tiers", label: t("adminNav.tiers") },
        { to: "/admin/notifications", label: t("adminNav.notifications") },
        { to: "/admin/settings", label: t("adminNav.settings") },
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

    return (
        <header className="border-b border-kashf-border px-6 py-4 bg-kashf-bg lg:hidden">
            <motion.div
                className="mx-auto flex items-center justify-between gap-4"
                variants={headerContainerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={headerItemVariants} custom={0} initial="hidden" animate="show">
                    <BrandLogo />
                </motion.div>

                <div className="flex items-center gap-3">
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
                    <nav className="flex flex-col gap-1.5" aria-label={t("nav.mainAria")}>
                        {navItems.map(({ to, label }) => (
                            <motion.div key={`${to}-${label}`} variants={itemVariants}>
                                <NavLink
                                    to={to}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={navLinkClassMobile}
                                >
                                    <span className="truncate flex-1">{label}</span>
                                </NavLink>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div variants={itemVariants} className="mt-auto w-full">
                        <MobileProfileActions setIsSidebarOpen={setIsSidebarOpen} />
                    </motion.div>
                </motion.div>
            </MobileDrawer>
        </header>
    );
};

export default AdminHeader;
