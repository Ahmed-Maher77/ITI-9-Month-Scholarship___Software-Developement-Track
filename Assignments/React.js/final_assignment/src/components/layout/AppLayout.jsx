import { Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../NavigationBars/Navbar/Navbar";
import Sidebar from "../NavigationBars/Sidebar/Sidebar";
import RouteLoader from "../routing/RouteLoader";
import { selectIsSidebarCollapsed } from "../../store/uiSlice";

function AppLayout({ isSmallScreen }) {
    const isSidebarCollapsed = useSelector(selectIsSidebarCollapsed);
    const pagesClasses = useMemo(
        () =>
            `pages pb-4 ${isSmallScreen ? "pt-8" : "pt-4"}${
                !isSmallScreen && isSidebarCollapsed ? " sidebar-collapsed" : ""
            }`,
        [isSmallScreen, isSidebarCollapsed]
    );
    const footerOffsetClasses = useMemo(
        () =>
            `footer-offset ${
                !isSmallScreen && isSidebarCollapsed ? "sidebar-collapsed" : ""
            }`,
        [isSmallScreen, isSidebarCollapsed],
    );

    return (
        <div className="App min-vh-100 d-flex">
            {isSmallScreen ? (
                <Navbar />
            ) : (
                <Sidebar />
            )}
            <div className="flex-grow-1 d-flex flex-column">
                <div className={pagesClasses}>
                    <Suspense fallback={<RouteLoader />}>
                        <Outlet />
                    </Suspense>
                </div>
                <div className={footerOffsetClasses}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AppLayout;
