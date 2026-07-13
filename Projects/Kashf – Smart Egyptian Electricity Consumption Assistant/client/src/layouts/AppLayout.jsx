import { Suspense, useEffect } from "react";
import { useOutlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import DashboardSidebar from "../components/common/DashboardSidebar";
import AppHeader from "../components/common/AppHeader";
import Loader from "../components/Loader/Loader";
import Footer from "../components/common/Footer";
import { fetchMeters } from "../store/meters/metersSlice";
import { fetchAlerts } from "../store/alerts/alertsSlice";

const AppLayout = () => {
    const { pathname } = useLocation();
    const currentOutlet = useOutlet();
    const dispatch = useDispatch();

    // Fetch meters and alerts globally for all authenticated pages
    useEffect(() => {
        dispatch(fetchMeters());
        dispatch(fetchAlerts());
        
        const interval = setInterval(() => {
            dispatch(fetchAlerts());
        }, 60000);
        
        return () => clearInterval(interval);
    }, [dispatch]);

    // Scroll to top on route change
    useEffect(() => {
        const main = document.getElementById("main-content");
        if (main) main.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="flex flex-col h-screen bg-kashf-bg overflow-hidden text-neutral-100">
            {/* Global Top Header */}
            <div className="z-20 shadow-sm border-b border-kashf-border relative">
                <AppHeader />
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Desktop Sidebar */}
                <div className="hidden lg:flex z-10 shadow-2xl shadow-black/50">
                    <DashboardSidebar />
                </div>
                
                {/* Main Content Area */}
                <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-neutral-900/30 flex flex-col">
                    <div className="flex-1">
                        <Suspense fallback={<Loader />}>
                            <AnimatePresence mode="wait">
                                {currentOutlet && (
                                    <motion.div
                                        key={pathname}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {currentOutlet}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Suspense>
                    </div>
                    
                    <div className="mt-8">
                        <Footer />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
