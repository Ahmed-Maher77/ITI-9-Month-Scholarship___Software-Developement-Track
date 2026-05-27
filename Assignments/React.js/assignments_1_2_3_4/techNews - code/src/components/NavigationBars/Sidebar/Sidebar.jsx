import { memo, useMemo } from "react";
import navLinks from "./navLinks";
import "./Sidebar.css";
import Logo from "../Logo";
import ListItem from "../ListItem";
import BottomRoutes from "../BottomRoutes";

function Sidebar({ isMobile, isCollapsed, onToggleCollapse, isLoggedIn, role, onNavigate }) {
    const isAdmin = role === "admin";
    const userData = {
        username: "Ahmed Maher",
        userPic: null,
    };
    const topRoutes = isAdmin ? navLinks[0].adminRoutes : navLinks[0].userRoutes;

    const sidebarClasses = useMemo(
        () =>
            `Sidebar d-flex flex-column p-3 gray-bg${
                isMobile ? " is-mobile" : " min-h-100 max-h-100"
            }${isCollapsed ? " is-collapsed" : ""}`,
        [isCollapsed, isMobile]
    );

    return (
        <aside className={sidebarClasses}>
            {!isMobile && (
                <div className="sidebar-header d-flex align-items-center justify-content-between">
                    <Logo />
                    <button
                        type="button"
                        className="sidebar-toggle-btn border-0 bg-transparent"
                        onClick={onToggleCollapse}
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <i
                            className={`fa-solid ${
                                isCollapsed ? "fa-angles-right" : "fa-angles-left"
                            }`}
                        ></i>
                    </button>
                </div>
            )}

            {/* ======== Links ======== */}
            <ul className="list-unstyled d-flex flex-column gap-2 mt-4 mb-0 flex-grow-1 justify-content-between">
                {/* ======== Top Routes ======== */}
                <div className="top d-flex flex-column gap-2">
                    {topRoutes.map((route, index) => (
                        <ListItem
                            key={index}
                            href={route.target}
                            icon={route.icon}
                            label={route.name}
                            isCollapsed={isCollapsed}
                            onClick={onNavigate}
                        />
                    ))}
                </div>

                {/* ======== Bottom Routes ======== */}
                <BottomRoutes
                    {...userData}
                    role={role}
                    isCollapsed={isCollapsed}
                    isLoggedIn={isLoggedIn}
                    onNavigate={onNavigate}
                />
            </ul>
        </aside>
    );
}

export default memo(Sidebar);
