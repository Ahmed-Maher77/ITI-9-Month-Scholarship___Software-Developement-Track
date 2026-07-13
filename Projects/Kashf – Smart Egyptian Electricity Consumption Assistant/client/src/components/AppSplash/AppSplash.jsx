import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";

const SPLASH_DURATION_MS = 2500;

const AppSplash = ({ children }) => {
    const { t } = useTranslation();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS);
        return () => clearTimeout(timer);
    }, []);

    if (showSplash) {
        return (
            <div
                className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-kashf-bg px-6 text-center select-none"
                role="status"
                aria-label={t("common.loading")}
            >
                <div className="mb-6 flex items-center justify-center">
                    <Loader fullscreen={false} />
                </div>
                <h1 className="m-0 text-[1.75rem] font-bold tracking-wide text-neutral-100 mb-2">
                    {t("common.brand")}
                </h1>
                <p className="m-0 text-sm text-neutral-500 max-w-xs leading-relaxed">
                    {t("splash.tagline")}
                </p>
            </div>
        );
    }

    return children;
};

export default AppSplash;
