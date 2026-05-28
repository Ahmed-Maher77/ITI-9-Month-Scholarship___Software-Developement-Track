import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import navLinks from "./navLinks";
import "./Sidebar.css";
import Logo from "../Logo";
import ListItem from "../ListItem";
import BottomRoutes from "../BottomRoutes";
import { selectRole } from "../../../store/authSlice";
import {
    selectIsSidebarCollapsed,
    toggleSidebarCollapsed,
} from "../../../store/uiSlice";

function Sidebar({ isMobile, onNavigate }) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
    const dispatch = useDispatch();
    const role = useSelector(selectRole);
    const isCollapsed = useSelector(selectIsSidebarCollapsed);
    const isAdmin = role === "admin";
    const topRoutes = isAdmin
        ? navLinks[0].adminRoutes
        : navLinks[0].userRoutes;

    const sidebarClasses = useMemo(
        () =>
            `Sidebar d-flex flex-column p-3 gray-bg${
                isMobile ? " is-mobile" : " min-h-100 max-h-100"
            }${isCollapsed ? " is-collapsed" : ""}`,
        [isCollapsed, isMobile],
    );

    return (
        <aside className={sidebarClasses}>
            {!isMobile && (
                <div className="sidebar-header d-flex align-items-center justify-content-between">
                    <Logo />
                    <button
                        type="button"
                        className="sidebar-toggle-btn border-0 bg-transparent"
                        onClick={() => dispatch(toggleSidebarCollapsed())}
                        aria-label={
                            isCollapsed
                                ? t("common.expandSidebar")
                                : t("common.collapseSidebar")
                        }
                    >
                        <i
                            className={`fa-solid ${
                                isCollapsed
                                    ? isRTL
                                        ? "fa-angles-left"
                                        : "fa-angles-right"
                                    : isRTL
                                      ? "fa-angles-right"
                                      : "fa-angles-left"
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
                            label={t(route.labelKey)}
                            isCollapsed={isCollapsed}
                            onClick={onNavigate}
                        />
                    ))}
                </div>

                {/* ======== Bottom Routes ======== */}
                <BottomRoutes onNavigate={onNavigate} />
            </ul>
        </aside>
    );
}

export default memo(Sidebar);
