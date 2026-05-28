import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../Logo";
import Sidebar from "../Sidebar/Sidebar";
import "./Navbar.css";

function Navbar() {
    const { t } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev);
    }, []);

    const handleCloseSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    return (
        <nav className="Navbar d-flex align-items-center justify-content-between p-3 gray-bg">
            {/* ======== Logo ======== */}
            <Logo />

            {/* ======== Toggler ======== */}
            <button
                type="button"
                className="menu-toggler border-0 bg-transparent fs-4"
                onClick={handleToggleSidebar}
                aria-label={t("common.toggleSidebar")}
            >
                <i className="fa-solid fa-bars fs-5"></i>
            </button>

            <div
                className={"mobile-overlay " + (isSidebarOpen ? "open" : "")}
                onClick={handleCloseSidebar}
                aria-hidden={!isSidebarOpen}
            />

            <div className={"mobile-menu " + (isSidebarOpen ? "open" : "")}>
                <Sidebar isMobile onNavigate={handleCloseSidebar} />
            </div>
        </nav>
    );
}

export default memo(Navbar);
