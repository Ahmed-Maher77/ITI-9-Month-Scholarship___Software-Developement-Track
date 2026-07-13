import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { User, Mail, Phone, MapPin, Globe, CheckCircle, Pencil, X, Loader2 } from "lucide-react";
import Button from "../premium/Button";
import { selectUser } from "../../store/auth/authSlice";
import { setUser } from "../../store/auth/authSlice";
import { updateProfile } from "../../services/profileService";

const GOVERNORATES = [
  "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira",
  "Fayoum", "Gharbia", "Ismailia", "Menofia", "Minya", "Qaliubiya",
  "New Valley", "North Sinai", "Port Said", "Qalyubia", "Sharqia",
  "South Sinai", "Suez", "Aswan", "Asyut", "Beni Suef", "Kafr el-Sheikh",
  "Luxor", "Matrouh", "Sohag", "Qena", "Damietta",
];

const PersonalInformation = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    username:          user?.username          ?? "",
    phone:             user?.phone             ?? "",
    governorate:       user?.governorate       ?? "",
    preferredLanguage: user?.preferredLanguage ?? "ar",
  });

  const fields = [
    { icon: User,         label: t("profile.personalInfo.fullName"),        value: user?.username          || "—" },
    { icon: Mail,         label: t("profile.personalInfo.emailAddress"),     value: user?.email             || "—" },
    { icon: Phone,        label: t("profile.personalInfo.phoneNumber"),      value: user?.phone             || "—" },
    { icon: MapPin,       label: t("profile.personalInfo.governorate"),      value: user?.governorate ? t(`common.governorates.${user.governorate.toLowerCase().replace(/ /g, "_")}`, { defaultValue: user.governorate }) : "—" },
    { icon: Globe,        label: t("profile.personalInfo.preferredLanguage"),value: user?.preferredLanguage === "ar" ? "العربية" : "English" },
    { icon: CheckCircle,  label: t("profile.personalInfo.accountStatus"),    value: t("profile.personalInfo.active") },
  ];

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {};
      if (form.username          !== user?.username)          payload.username          = form.username;
      if (form.phone             !== (user?.phone ?? ""))     payload.phone             = form.phone;
      if (form.governorate       !== (user?.governorate ?? "")) payload.governorate     = form.governorate;
      if (form.preferredLanguage !== user?.preferredLanguage) payload.preferredLanguage = form.preferredLanguage;

      if (Object.keys(payload).length === 0) { setEditMode(false); return; }

      const data = await updateProfile(payload);
      dispatch(setUser(data.data.user));
      setEditMode(false);
    } catch (err) {
      setError(err.message ?? "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      username:          user?.username          ?? "",
      phone:             user?.phone             ?? "",
      governorate:       user?.governorate       ?? "",
      preferredLanguage: user?.preferredLanguage ?? "ar",
    });
    setError(null);
    setEditMode(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">{t("profile.personalInfo.title")}</h2>
        {!editMode ? (
          <Button variant="primary" size="sm" onClick={() => setEditMode(true)}>
            <Pencil className="w-3.5 h-3.5 me-1.5 inline" />
            {t("profile.personalInfo.editProfile")}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : t("common.save", { defaultValue: "Save" })}
            </Button>
            <Button variant="secondary" size="sm" onClick={handleCancel} disabled={saving}>
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400 mb-4 px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
          {error}
        </p>
      )}

      {!editMode ? (
        <div className="space-y-3">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex items-center gap-3 p-4 bg-kashf-bg/50 rounded-xl border border-kashf-border/50 hover:border-kashf-blue/30 transition-all duration-200"
            >
              <div className="bg-kashf-blue/10 rounded-lg p-2 flex-shrink-0">
                <field.icon className="w-5 h-5 text-kashf-blue" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-400 mb-0.5">{field.label}</p>
                <p className="text-sm text-white font-medium truncate">{field.value}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs text-neutral-400 mb-1.5">{t("profile.personalInfo.fullName")}</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-kashf-bg/50 border border-kashf-border/50 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-kashf-blue/50 focus:ring-1 focus:ring-kashf-blue/30 transition-all"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-xs text-neutral-400 mb-1.5">{t("profile.personalInfo.emailAddress")}</label>
            <input
              type="email"
              value={user?.email ?? ""}
              readOnly
              className="w-full bg-kashf-bg/30 border border-kashf-border/30 rounded-xl px-4 py-3 text-sm text-neutral-500 cursor-not-allowed"
            />
            <p className="text-xs text-neutral-500 mt-1">{t("profile.personalInfo.emailReadOnly", { defaultValue: "Email cannot be changed." })}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs text-neutral-400 mb-1.5">{t("profile.personalInfo.phoneNumber")}</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+20 1XX XXX XXXX"
              className="w-full bg-kashf-bg/50 border border-kashf-border/50 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-kashf-blue/50 focus:ring-1 focus:ring-kashf-blue/30 transition-all"
            />
          </div>

          {/* Governorate */}
          <div>
            <label className="block text-xs text-neutral-400 mb-1.5">{t("profile.personalInfo.governorate")}</label>
            <div className="relative">
              <select
                name="governorate"
                value={form.governorate}
                onChange={handleChange}
                className="w-full bg-kashf-bg/50 border border-kashf-border/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-kashf-blue/50 focus:ring-1 focus:ring-kashf-blue/30 transition-all appearance-none pr-10 cursor-pointer"
              >
                <option value="">{t("profile.personalInfo.selectGovernorate", { defaultValue: "Select governorate" })}</option>
                {GOVERNORATES.map((g) => (
                  <option key={g} value={g}>{t(`common.governorates.${g.toLowerCase().replace(/ /g, "_")}`, { defaultValue: g })}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-xs text-neutral-400 mb-1.5">{t("profile.personalInfo.preferredLanguage")}</label>
            <div className="relative">
              <select
                name="preferredLanguage"
                value={form.preferredLanguage}
                onChange={handleChange}
                className="w-full bg-kashf-bg/50 border border-kashf-border/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-kashf-blue/50 focus:ring-1 focus:ring-kashf-blue/30 transition-all appearance-none pr-10 cursor-pointer"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;
