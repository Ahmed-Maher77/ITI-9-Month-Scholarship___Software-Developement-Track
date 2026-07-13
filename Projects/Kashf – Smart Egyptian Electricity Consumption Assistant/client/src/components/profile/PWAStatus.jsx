import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Smartphone, Monitor, Cloud, CheckCircle, XCircle, Download } from "lucide-react";
import Badge from "../premium/Badge";
import usePWAInstall from "../../hooks/usePWAInstall";

const PWAStatus = () => {
  const { t } = useTranslation();
  const { isInstallable, install } = usePWAInstall();
  const [platform, setPlatform] = useState({ id: "unknown", icon: Monitor });
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect Platform
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
      setPlatform({ id: "windows_phone", icon: Smartphone });
    } else if (/android/i.test(userAgent)) {
      setPlatform({ id: "android", icon: Smartphone });
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setPlatform({ id: "ios", icon: Smartphone });
    } else if (/Mac/i.test(userAgent)) {
      setPlatform({ id: "macos", icon: Monitor });
    } else if (/Win/i.test(userAgent)) {
      setPlatform({ id: "windows", icon: Monitor });
    } else if (/Linux/i.test(userAgent)) {
      setPlatform({ id: "linux", icon: Monitor });
    } else {
      setPlatform({ id: "web_browser", icon: Cloud });
    }

    // Detect PWA Installation
    const checkInstallation = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone || document.referrer.includes('android-app://');
      setIsInstalled(isStandalone);
    };

    checkInstallation();

    // Listen for display-mode changes
    const matchMediaObj = window.matchMedia('(display-mode: standalone)');
    const handleChange = () => checkInstallation();
    matchMediaObj.addEventListener('change', handleChange);

    return () => {
      matchMediaObj.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Cloud className="w-5 h-5 text-kashf-blue" />
        <h2 className="text-lg font-semibold text-white">{t("profile.pwa.title")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <div className="bg-kashf-bg/50 rounded-xl p-4 border border-kashf-border/50 hover:border-kashf-blue/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-kashf-blue/10 rounded-lg p-2">
                <platform.icon className="w-5 h-5 text-kashf-blue" />
              </div>
              <Badge
                variant={isInstalled ? "success" : "outline"}
                className="flex items-center gap-1"
              >
                {isInstalled ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <XCircle className="w-3 h-3" />
                )}
                {isInstalled ? t("profile.pwa.installed") : t("profile.pwa.notInstalled")}
              </Badge>
            </div>
            <p className="text-sm font-medium text-white mb-2">{t("profile.pwa.currentDevice")}: {t("profile.pwa.platforms." + platform.id, { defaultValue: platform.id })}</p>
            <div className="space-y-1">
                {isInstalled ? (
                    <>
                        <p className="text-xs text-neutral-400">{t("profile.pwa.pushNotifications")}</p>
                        <p className="text-xs text-neutral-400">{t("profile.pwa.offlineSync")}</p>
                    </>
                ) : (
                    <>
                        <p className="text-xs text-neutral-400 mb-3">{t("profile.pwa.installPrompt")}</p>
                        <button
                            onClick={install}
                            disabled={!isInstallable}
                            className="w-full py-2 rounded-xl bg-kashf-blue hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-black font-bold text-xs flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            {t("pwa.install", { defaultValue: "Install" })}
                        </button>
                    </>
                )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default PWAStatus;
