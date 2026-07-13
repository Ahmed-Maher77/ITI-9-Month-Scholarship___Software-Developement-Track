import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Zap, TrendingUp, Wallet, AlertTriangle } from "lucide-react";

const calculateEstimatedBill = (kwh) => {
  if (!kwh || kwh <= 0) return 0;
  if (kwh <= 50) return Math.round(kwh * 0.58);
  if (kwh <= 100) return Math.round(50 * 0.58 + (kwh - 50) * 0.68);
  if (kwh <= 200) return Math.round(kwh * 0.83);
  if (kwh <= 350) return Math.round(200 * 0.83 + (kwh - 200) * 1.25);
  if (kwh <= 650) return Math.round(350 * 1.25 + (kwh - 350) * 1.40);
  if (kwh <= 1000) return Math.round(650 * 1.40 + (kwh - 650) * 1.50);
  return Math.round(1000 * 1.50 + (kwh - 1000) * 1.65);
};

const getTierLimits = (tier) => {
  switch (tier) {
    case 1: return 50;
    case 2: return 100;
    case 3: return 200;
    case 4: return 350;
    case 5: return 650;
    case 6: return 1000;
    default: return Infinity;
  }
};

const AccountOverview = () => {
  const { t } = useTranslation();
  const { meters } = useSelector((state) => state.meters);

  const totalConsumption = meters.reduce((sum, m) => sum + (m.consumption || 0), 0);
  const totalBill = meters.reduce((sum, m) => sum + calculateEstimatedBill(m.consumption || 0), 0);
  
  const activeMeters = meters.filter(m => m.status === "active");
  const maxTier = activeMeters.length > 0 ? Math.max(...activeMeters.map(m => m.tier || 1)) : (meters.length > 0 ? Math.max(...meters.map(m => m.tier || 1)) : null);
  
  const primaryMeter = activeMeters[0] || meters[0];
  const remainingVal = primaryMeter ? Math.max(0, Math.round(getTierLimits(primaryMeter.tier || 1) - primaryMeter.consumption)) : null;
  const remainingText = remainingVal !== null && remainingVal !== Infinity ? `${remainingVal} ${t("common.kwh", { defaultValue: "kWh" })}` : "—";

  const stats = [
    {
      icon: Zap,
      label: t("profile.overview.currentSheriha"),
      value: maxTier ? t("common.tier", { tier: maxTier }) : "—",
      color: "text-kashf-blue",
      bg: "bg-kashf-blue/10",
    },
    {
      icon: TrendingUp,
      label: t("profile.overview.currentConsumption"),
      value: `${totalConsumption} ${t("common.kwh", { defaultValue: "kWh" })}`,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      icon: AlertTriangle,
      label: t("profile.overview.remainingBeforeNextTier"),
      value: remainingText,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      icon: Wallet,
      label: t("profile.overview.estimatedMonthlyBill"),
      value: `${totalBill} ${t("common.egp", { defaultValue: "EGP" })}`,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="mb-18">
      <h2 className="text-lg font-semibold text-white mt-8 mb-6">
        {t("profile.overview.title")}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-kashf-bg/50 rounded-xl p-4 border border-kashf-border/50 hover:border-kashf-blue/30 transition-all duration-200"
          >
            {/* Icon aligned to logical start — in RTL this appears on the right */}
            <div className={`w-fit mb-3 p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-xs text-neutral-400 mb-1">{stat.label}</p>
            <p className="text-lg font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountOverview;

