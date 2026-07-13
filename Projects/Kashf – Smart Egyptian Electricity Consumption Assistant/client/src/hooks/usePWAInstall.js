import { useState, useEffect, useCallback } from "react";

function getPrompt() {
    if (window.__deferredPrompt) return window.__deferredPrompt;
    return null;
}

function clearPrompt() {
    window.__deferredPrompt = null;
}

export default function usePWAInstall() {
    const [ready, setReady] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const isInstallable = ready && !!getPrompt() && !isInstalled;

    useEffect(() => {
        const checkInstalled = () => {
            const standalone =
                window.matchMedia("(display-mode: standalone)").matches ||
                navigator.standalone ||
                document.referrer.includes("android-app://");
            setIsInstalled(standalone);
        };

        checkInstalled();

        if (getPrompt()) {
            setReady(true);
        }

        const onPrompt = () => setReady(true);

        window.addEventListener("beforeinstallprompt", onPrompt, { once: true });

        const mediaQuery = window.matchMedia("(display-mode: standalone)");
        const onChange = () => checkInstalled();
        mediaQuery.addEventListener("change", onChange);

        return () => {
            window.removeEventListener("beforeinstallprompt", onPrompt);
            mediaQuery.removeEventListener("change", onChange);
        };
    }, []);

    const install = useCallback(async () => {
        const prompt = getPrompt();
        if (!prompt) return;

        prompt.prompt();
        const { outcome } = await prompt.userChoice;
        clearPrompt();

        if (outcome === "accepted") {
            setIsInstalled(true);
        }
    }, []);

    return { isInstallable, isInstalled, install };
}
