import { useTranslation } from "react-i18next";
import {
  LogIn, LogOut, UserPlus, UserCog, Camera, Target, Bell,
  ScanLine, Upload, AlertTriangle, Download, Plus, Trash2, Clock, RefreshCw,
  ChevronLeft, ChevronRight, CheckCircle2, XCircle, AlertCircle
} from "lucide-react";
import useActivity from "../../hooks/useActivity";

// Map each activity type to a semantic icon + color scheme
const ACTIVITY_ICON_MAP = {
  login:                      { icon: LogIn,         bg: "bg-kashf-blue/20",   color: "text-kashf-blue",    ring: "ring-kashf-blue/30" },
  logout:                     { icon: LogOut,        bg: "bg-neutral-500/20",  color: "text-neutral-400",   ring: "ring-neutral-500/30" },
  register:                   { icon: UserPlus,      bg: "bg-emerald-500/20",  color: "text-emerald-400",   ring: "ring-emerald-500/30" },
  profile_updated:            { icon: UserCog,       bg: "bg-purple-500/20",   color: "text-purple-400",    ring: "ring-purple-500/30" },
  picture_updated:            { icon: Camera,        bg: "bg-violet-500/20",   color: "text-violet-400",    ring: "ring-violet-500/30" },
  goals_updated:              { icon: Target,        bg: "bg-amber-500/20",    color: "text-amber-400",     ring: "ring-amber-500/30" },
  notification_prefs_updated: { icon: Bell,          bg: "bg-sky-500/20",      color: "text-sky-400",       ring: "ring-sky-500/30" },
  scan_uploaded:              { icon: ScanLine,      bg: "bg-kashf-blue/20",   color: "text-kashf-blue",    ring: "ring-kashf-blue/30" },
  bill_uploaded:              { icon: Upload,        bg: "bg-emerald-500/20",  color: "text-emerald-400",   ring: "ring-emerald-500/30" },
  alert_received:             { icon: AlertTriangle, bg: "bg-amber-500/20",    color: "text-amber-400",     ring: "ring-amber-500/30" },
  report_downloaded:          { icon: Download,      bg: "bg-neutral-500/20",  color: "text-neutral-400",   ring: "ring-neutral-500/30" },
  meter_added:                { icon: Plus,          bg: "bg-emerald-500/20",  color: "text-emerald-400",   ring: "ring-emerald-500/30" },
  meter_removed:              { icon: Trash2,        bg: "bg-red-500/20",      color: "text-red-400",       ring: "ring-red-500/30" },
  subscription_success:       { icon: CheckCircle2,  bg: "bg-emerald-500/20",  color: "text-emerald-400",   ring: "ring-emerald-500/30" },
  subscription_canceled:      { icon: XCircle,       bg: "bg-red-500/20",      color: "text-red-400",       ring: "ring-red-500/30" },
  subscription_expired:       { icon: AlertTriangle, bg: "bg-amber-500/20",    color: "text-amber-400",     ring: "ring-amber-500/30" },
  subscription_failed:        { icon: AlertCircle,   bg: "bg-red-500/20",      color: "text-red-400",       ring: "ring-red-500/30" },
};

const DEFAULT_ICON = { icon: Clock, bg: "bg-neutral-500/20", color: "text-neutral-400", ring: "ring-neutral-500/30" };

// Relative time formatter
const formatRelativeTime = (dateStr, t) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours   / 24);
  const weeks   = Math.floor(days    / 7);

  if (seconds < 60)  return t("common.time.justNow", { defaultValue: "just now" });
  if (minutes < 60)  return t("common.time.minutesAgo", { count: minutes, defaultValue: `${minutes}m ago` });
  if (hours   < 24)  return t("common.time.hoursAgo", { count: hours, defaultValue: `${hours}h ago` });
  if (days    < 7)   return t("common.time.daysAgo", { count: days, defaultValue: `${days}d ago` });
  if (weeks   < 4)   return t("common.time.weeksAgo", { count: weeks, defaultValue: `${weeks}w ago` });
  return new Date(dateStr).toLocaleDateString();
};

// Skeleton row
const SkeletonRow = () => (
  <div className="relative flex items-start gap-4 pb-8 animate-pulse">
    <div className="absolute -start-10 top-0 w-12 h-12 rounded-full bg-neutral-800 z-10" />
    <div className="flex-grow ms-8 pt-1 space-y-2">
      <div className="h-3 bg-neutral-800 rounded w-2/3" />
      <div className="h-2.5 bg-neutral-700 rounded w-1/3" />
    </div>
  </div>
);

const ActivityHistory = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { items, loading, error, hasMore, totalPages, prevPage, nextPage, page, refresh } = useActivity({ limit: 5 });

  const getActivityLabel = (type) =>
    t(`profile.activity.types.${type}`, { defaultValue: type.replace(/_/g, " ") });

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-2 mb-6 mt-18">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-kashf-blue" />
          <h2 className="text-lg font-semibold text-white">{t("profile.activity.title")}</h2>
        </div>
        <button
          onClick={refresh}
          className="text-neutral-500 hover:text-kashf-blue transition-colors cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400 mb-4 px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
          {error}
        </p>
      )}

      <div className={`relative ${isRTL ? "pr-8" : "pl-8"}`}>
        {loading && items.length === 0 && (
          Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
        )}

        {!loading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-neutral-500">
            <Clock className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">{t("profile.activity.empty", { defaultValue: "No activity yet." })}</p>
          </div>
        )}

        {items.map((activity, index) => {
          const { icon: Icon, bg, color, ring } = ACTIVITY_ICON_MAP[activity.type] ?? DEFAULT_ICON;
          const isLast = index === items.length - 1;

          return (
            <div
              key={activity._id}
              className={`relative flex items-start gap-4 pb-8 group ${
                !isLast
                  ? isRTL
                    ? "before:-right-4 before:top-12 before:bottom-0 before:w-0.5 before:bg-neutral-700/40 before:absolute"
                    : "before:-left-4 before:top-12 before:bottom-0 before:w-0.5 before:bg-neutral-700/40 before:absolute"
                  : ""
              }`}
            >
              {/* Icon bubble */}
              <div
                className={`absolute top-0 w-10 h-10 rounded-full border-2 border-kashf-surface z-10 flex items-center justify-center shrink-0 ring-2 ring-offset-2 ring-offset-kashf-surface ${
                  isRTL ? "-right-9" : "-left-9"
                } ${bg} ${ring}`}
              >
                <Icon className={`w-4 h-4 ${color}`} />
              </div>

              {/* Content */}
              <div className={`flex-grow min-w-0 pt-1 ${isRTL ? "mr-6" : "ml-6"}`}>
                <p className="text-sm text-white font-medium group-hover:text-kashf-blue transition-colors">
                  {getActivityLabel(activity.type)}
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  {formatRelativeTime(activity.createdAt, t)}
                </p>
              </div>
            </div>
          );
        })}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-kashf-border/30 mt-4">
            <button
              onClick={prevPage}
              disabled={page === 1 || loading}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-kashf-bg/50 border border-kashf-border/50 text-xs text-neutral-300 hover:border-kashf-blue/30 disabled:opacity-40 disabled:hover:border-kashf-border/50 cursor-pointer transition-colors"
            >
              {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              {t("common.pagination.prev", { defaultValue: "Previous" })}
            </button>
            
            <span className="text-xs text-neutral-400 font-medium">
              {t("common.pagination.pageInfo", { page, totalPages, defaultValue: `Page ${page} of ${totalPages}` })}
            </span>

            <button
              onClick={nextPage}
              disabled={!hasMore || loading}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-kashf-bg/50 border border-kashf-border/50 text-xs text-neutral-300 hover:border-kashf-blue/30 disabled:opacity-40 disabled:hover:border-kashf-border/50 cursor-pointer transition-colors"
            >
              {t("common.pagination.next", { defaultValue: "Next" })}
              {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;
