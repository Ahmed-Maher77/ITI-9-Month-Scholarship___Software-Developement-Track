import { Suspense } from "react";
import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AppHeader from "../components/common/AppHeader";
import Footer from "../components/common/Footer";
import MarketingHeader from "../components/common/MarketingHeader";
import Loader from "../components/Loader/Loader";

const UserLayout = () => {
    const { pathname } = useLocation();
    const currentOutlet = useOutlet();

    return (
        <div className="flex min-h-screen flex-col bg-kashf-bg text-neutral-100">
            <MarketingHeader />
            <Suspense fallback={<Loader />}>
                <AnimatePresence mode="wait">
                    {currentOutlet && (
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex-1 w-full"
                        >
                            {currentOutlet}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Suspense>
            <Footer />
        </div>
    );
};

export default UserLayout;

