import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../utils/animations";
import { WifiOff, Bell, RefreshCw, MonitorSmartphone, Download, CheckCircle } from "lucide-react";
import appMockup from "../../assets/images/installable-app.png";
import SectionBadge from "./ui/SectionBadge";
import SectionHeading from "./ui/SectionHeading";
import FeatureList from "./ui/FeatureList";
import usePWAInstall from "../../hooks/usePWAInstall";

const PLATFORMS = ["iOS", "Android", "Windows", "macOS"];

const FEATURE_DEFS = [
    { icon: WifiOff,           key: "pwa.feat1", def: "Offline-first architecture" },
    { icon: Bell,              key: "pwa.feat2", def: "Push notification alerts" },
    { icon: RefreshCw,         key: "pwa.feat3", def: "Automatic background sync" },
    { icon: MonitorSmartphone, key: "pwa.feat4", def: "iOS, Android, Windows & macOS support" },
];

const PWASection = () => {
    const { t } = useTranslation();
    const { isInstallable, isInstalled, install } = usePWAInstall();

    const featureItems = FEATURE_DEFS.map((f) => ({
        icon: f.icon,
        label: t(f.key, { defaultValue: f.def }),
    }));

    return (
        <section 
            id="pwa" 
            className="relative py-20 md:py-28 overflow-hidden border-t border-kashf-border"
        >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-kashf-blue/6 blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">

                    {/* ── Left: text ── */}
                    <div className="flex flex-col gap-6 order-2 lg:order-1">
                        <SectionHeading
                            align="left"
                            badge={
                                <SectionBadge icon={<Download className="w-3.5 h-3.5" />}>
                                    {t("pwa.badge", { defaultValue: "Installable PWA" })}
                                </SectionBadge>
                            }
                            title={t("pwa.title", { defaultValue: "Install it." })}
                            accent={t("pwa.titleAccent", { defaultValue: "No app store required." })}
                            subtitle={t("pwa.desc", {
                                defaultValue:
                                    "Kashf is a Progressive Web App — install it directly from your browser on any phone or desktop. Works offline, gets push notifications, feels like a native app.",
                            })}
                            baseDelay={0}
                        />

                        <motion.div 
                            variants={fadeUpVariants} 
                            custom={0}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <FeatureList items={featureItems} iconWrapClass="rounded-lg" />
                        </motion.div>

                        {/* Platform pills */}
                        <motion.div 
                            variants={fadeUpVariants} 
                            custom={1} 
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                            className="flex flex-wrap gap-2 mt-2"
                        >
                            {PLATFORMS.map((p) => (
                                <span
                                    key={p}
                                    className="px-3 py-1 rounded-full text-xs font-medium border border-kashf-border bg-kashf-surface text-neutral-400"
                                >
                                    {p}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right: phone mockup + install toast ── */}
                    <motion.div 
                        variants={fadeUpVariants} 
                        custom={2} 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="order-1 lg:order-2 flex justify-center lg:justify-end"
                    >
                        {/* Outer wrapper: stacked on mobile, side-by-side on sm+ */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-4 w-full sm:w-auto">

                            {/* Phone image */}
                            <div className="flex justify-center sm:block">
                                <img
                                    src={appMockup}
                                    alt="Kashf PWA Mockup"
                                    className="w-[220px] xs:w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] relative z-10"
                                />
                            </div>

                            {/* Install toast — below on mobile, beside + offset on sm+ */}
                            <div className="sm:mt-10 w-full sm:w-44 md:w-48 rounded-2xl border border-kashf-border bg-kashf-surface shadow-xl p-4 flex flex-col gap-3 shrink-0">
                                <div>
                                    <p className="text-neutral-100 text-sm font-bold mb-0.5">
                                        {t("pwa.addToHome", { defaultValue: "Add to Home Screen" })}
                                    </p>
                                    <p className="text-neutral-500 text-xs">
                                        {t("pwa.installDesc", { defaultValue: "Install Kashf for the best experience" })}
                                    </p>
                                </div>
                                {isInstalled ? (
                                    <div className="w-full py-2 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold text-sm flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        {t("profile.pwa.installed", { defaultValue: "Installed" })}
                                    </div>
                                ) : (
                                    <button
                                        onClick={install}
                                        disabled={!isInstallable}
                                        className="w-full py-2 rounded-xl bg-kashf-blue hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-black font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Download className="w-4 h-4" />
                                        {t("pwa.install", { defaultValue: "Install" })}
                                    </button>
                                )}
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default PWASection;