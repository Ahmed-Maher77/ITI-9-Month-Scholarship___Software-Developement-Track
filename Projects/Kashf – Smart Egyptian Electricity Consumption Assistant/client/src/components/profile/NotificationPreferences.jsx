import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Bell, Mail, Smartphone, MessageSquare, AlertTriangle, Lightbulb, FileText, Wallet } from "lucide-react";
import Toggle from "../premium/Toggle";
import { selectUser, setUser } from "../../store/auth/authSlice";
import { updateNotificationPrefs } from "../../services/notificationService";

// Debounce helper
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

const NotificationPreferences = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const prefs = user?.notificationPreferences ?? {};

  // Local optimistic state
  const [local, setLocal] = useState({
    sherihaWarning:     prefs.sherihaWarning     ?? true,
    billForecast:       prefs.billForecast       ?? true,
    aiRecommendations:  prefs.aiRecommendations  ?? true,
    monthlyReports:     prefs.monthlyReports     ?? false,
    pushNotifications:  prefs.pushNotifications  ?? true,
    emailNotifications: prefs.emailNotifications ?? true,
    smsNotifications:   prefs.smsNotifications   ?? false,
  });
  const [saveError, setSaveError] = useState(null);

  // Debounced API call
  const persist = useCallback(
    debounce(async (key, value, prevLocal) => {
      try {
        const data = await updateNotificationPrefs({ [key]: value });
        dispatch(setUser(data.data.user));
        setSaveError(null);
      } catch (err) {
        // Revert on failure
        setLocal(prevLocal);
        setSaveError(err.message ?? "Failed to save preference.");
      }
    }, 300),
    [dispatch]
  );

  const handleToggle = (key) => {
    const prevLocal = { ...local };
    const newValue = !local[key];
    setLocal((prev) => ({ ...prev, [key]: newValue }));
    persist(key, newValue, prevLocal);
  };

  const alertTypes = [
    { key: "sherihaWarning",    icon: AlertTriangle, label: t("profile.preferences.sherihaWarningAlerts"),      description: t("profile.preferences.sherihaWarningDesc") },
    { key: "billForecast",      icon: Wallet,        label: t("profile.preferences.billForecastNotifications"), description: t("profile.preferences.billForecastDesc") },
    { key: "aiRecommendations", icon: Lightbulb,     label: t("profile.preferences.aiRecommendations"),         description: t("profile.preferences.aiRecommendationsDesc") },
    { key: "monthlyReports",    icon: FileText,      label: t("profile.preferences.monthlyReports"),            description: t("profile.preferences.monthlyReportsDesc") },
  ];

  const channels = [
    { key: "pushNotifications",  icon: Smartphone,    label: t("profile.preferences.pushNotifications") },
    { key: "emailNotifications", icon: Mail,          label: t("profile.preferences.emailNotifications") },
    { key: "smsNotifications",   icon: MessageSquare, label: t("profile.preferences.smsNotifications") },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-5 h-5 text-kashf-blue" />
        <h2 className="text-lg font-semibold text-white">{t("profile.preferences.title")}</h2>
      </div>

      {saveError && (
        <p className="text-sm text-red-400 mb-4 px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
          {saveError}
        </p>
      )}

      <div className="space-y-6">
        {/* Alert types */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-4">{t("profile.preferences.alertTypes")}</h3>
          <div className="space-y-3">
            {alertTypes.map((pref) => (
              <div
                key={pref.key}
                className="flex items-center justify-between p-4 bg-kashf-bg/50 rounded-xl border border-kashf-border/50"
              >
                <div className="flex items-center gap-3 min-w-0 me-4">
                  <div className="bg-kashf-blue/10 rounded-lg p-2 flex-shrink-0">
                    <pref.icon className="w-4 h-4 text-kashf-blue" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium">{pref.label}</p>
                    <p className="text-xs text-neutral-400">{pref.description}</p>
                  </div>
                </div>
                <Toggle
                  checked={local[pref.key]}
                  onChange={() => handleToggle(pref.key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-4">{t("profile.preferences.notificationChannels")}</h3>
          <div className="space-y-3">
            {channels.map((ch) => (
              <div
                key={ch.key}
                className="flex items-center justify-between p-4 bg-kashf-bg/50 rounded-xl border border-kashf-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-kashf-blue/10 rounded-lg p-2 flex-shrink-0">
                    <ch.icon className="w-4 h-4 text-kashf-blue" />
                  </div>
                  <p className="text-sm text-white font-medium">{ch.label}</p>
                </div>
                <Toggle
                  checked={local[ch.key]}
                  onChange={() => handleToggle(ch.key)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
