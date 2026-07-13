import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileMenu from "./ProfileMenu";
import MobileProfileActions from "./MobileProfileActions";
import MobileDrawer from "./MobileDrawer";

// Section IDs on the home page that map to hash nav items
const SECTION_IDS = [
    "hero",
    "stats",
    "meter-section",
    "features",
    "how-it-works",
    "pwa",
    "testimonials",
    "pricing",
];


// Returns the active hash for the current page.
const useActiveNavItem = () => {
    const location = useLocation();
    const [activeHash, setActiveHash] = useState(location.hash);

    useEffect(() => {
        if (location.pathname !== "/") {
            setActiveHash("");
            return;
        }

        // Immediately sync when the user clicks a hash link
        setActiveHash(location.hash);

        const sectionEls = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);

        if (sectionEls.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the entry that is most visible
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length > 0) {
                    setActiveHash(`#${visible[0].target.id}`);
                } else {
                    // If nothing is intersecting we might be above the first section
                    setActiveHash("");
                }
            },
            {
                // Trigger when a section occupies ≥15% of the viewport for smoother transitions
                threshold: [0, 0.15, 0.3, 0.5],
                // Account for fixed header (80px) and give more bottom margin for better detection
                rootMargin: "-80px 0px -35% 0px",
            }
        );

        sectionEls.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [location.pathname, location.hash]);

    return { activeHash, pathname: location.pathname };
};

const MarketingHeader = () => {
    const { t, i18n } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isRtl = i18n.dir() === "rtl";
    const { activeHash, pathname } = useActiveNavItem();
    
    // Check if user is logged in
    const user = useSelector(selectUser);

    const navItems = [
        { to: "/", label: t("marketingNav.home"), end: true, sectionId: "hero" },
        { to: "/#features", label: t("marketingNav.features"), end: false, sectionId: "features" },
        { to: "/#how-it-works", label: t("marketingNav.howItWorks"), end: false, sectionId: "how-it-works" },
        { to: "/about", label: t("marketingNav.about"), end: true },
        { to: "/#pricing", label: t("marketingNav.pricing"), end: false, sectionId: "pricing" },
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

    /** Decide if a nav item should be highlighted */
    const isActive = (item) => {
        if (item.to === "/") {
            // Home is active when on "/" and either no section in view or hero section is in view
            return pathname === "/" && (!activeHash || activeHash === "#hero");
        }
        if (item.to.startsWith("/#") && item.sectionId) {
            const hash = `#${item.sectionId}`;
            return pathname === "/" && activeHash === hash;
        }
        if (item.to.startsWith("/#")) {
            const hash = item.to.slice(1); // "#features"
            return pathname === "/" && activeHash === hash;
        }
        return pathname === item.to;
    };

    const activeLinkCls = "text-sm no-underline transition-colors text-kashf-light-blue";
    const inactiveLinkCls = "text-sm no-underline transition-colors text-neutral-400 hover:text-kashf-light-blue";

    // Close sidebar and scroll lock are handled by MobileDrawer

    return (
        <header className="border-b border-kashf-border px-6 py-4 bg-kashf-bg">
            <motion.div 
                className="mx-auto flex max-w-6xl items-center justify-between gap-4"
                variants={headerContainerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={headerItemVariants} custom={0} initial="hidden" animate="show">
                    <BrandLogo />
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex flex-1 items-center justify-between gap-4 ms-6">
                    <nav
                        className="flex flex-1 items-center justify-center gap-x-5 gap-y-2"
                        aria-label={t("marketingNav.aria")}
                    >
                        {navItems.map((item, index) => (
                            <motion.div key={item.to} variants={headerItemVariants} custom={index + 1} initial="hidden" animate="show">
                                <NavLink
                                    to={item.to}
                                    end={item.end}
                                    aria-current={isActive(item) ? "page" : undefined}
                                    className={isActive(item) ? activeLinkCls : inactiveLinkCls}
                                >
                                    {item.label}
                                </NavLink>
                            </motion.div>
                        ))}
                        <motion.div variants={headerItemVariants} custom={navItems.length + 1} initial="hidden" animate="show">
                            <LanguageSwitcher />
                        </motion.div>
                    </nav>

                    {user ? (
                        <motion.div variants={headerItemVariants} custom={navItems.length + 2} initial="hidden" animate="show" className="shrink-0 flex items-center gap-4">
                            <Link
                                to="/dashboard"
                                className="text-sm font-semibold text-neutral-300 hover:text-white transition-colors"
                            >
                                {t("nav.dashboard", { defaultValue: "Dashboard" })}
                            </Link>
                            <ProfileMenu />
                        </motion.div>
                    ) : (
                        <motion.div variants={headerItemVariants} custom={navItems.length + 2} initial="hidden" animate="show">
                            <Link
                                to="/register"
                                className="shrink-0 rounded-md bg-kashf-blue px-4 py-2 text-sm font-semibold text-kashf-bg no-underline transition-opacity hover:opacity-90"
                            >
                                {t("marketingNav.joinKashf")}
                            </Link>
                        </motion.div>
                    )}
                </div>

                {/* Mobile Actions */}
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
                        aria-label="Open menu"
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
                        <nav className="flex flex-col gap-1.5" aria-label={t("marketingNav.aria")}>
                            {navItems.map((item) => (
                                <motion.div key={item.to} variants={itemVariants}>
                                    <NavLink
                                        to={item.to}
                                        end={item.end}
                                        onClick={() => setIsSidebarOpen(false)}
                                        aria-current={isActive(item) ? "page" : undefined}
                                        className={
                                            isActive(item)
                                                ? "flex w-full items-center px-4 py-3 rounded-lg text-base no-underline transition-colors hover:bg-kashf-muted hover:text-kashf-light-blue bg-kashf-muted text-kashf-light-blue font-semibold"
                                                : "flex w-full items-center px-4 py-3 rounded-lg text-base no-underline transition-colors hover:bg-kashf-muted hover:text-kashf-light-blue text-neutral-300"
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Mobile CTAs / Profile Actions */}
                        {user ? (
                            <motion.div variants={itemVariants} className="mt-auto w-full">
                                <MobileProfileActions setIsSidebarOpen={setIsSidebarOpen} />
                            </motion.div>
                        ) : (
                            <motion.div variants={itemVariants} className="mt-auto border-t border-kashf-border pt-4 flex flex-col gap-4">
                                <Link
                                    to="/register"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="flex w-full items-center justify-center rounded-lg bg-kashf-blue px-4 py-3 text-base font-semibold text-kashf-bg no-underline transition-opacity hover:opacity-90"
                                >
                                    {t("marketingNav.joinKashf")}
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                </MobileDrawer>
        </header>
    );
};

export default MarketingHeader;
