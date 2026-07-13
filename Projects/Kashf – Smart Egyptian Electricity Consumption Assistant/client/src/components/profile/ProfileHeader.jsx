import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Crown, Mail, Calendar, Check, Star, Users, Camera, Loader2 } from "lucide-react";
import Badge from "../premium/Badge";
import UserAvatar from "../common/UserAvatar";
import { selectUser, selectSubscriptionPlan } from "../../store/auth/authSlice";
import { useUpdateProfilePicture } from "../../hooks/auth/useUpdateProfilePicture";

const ProfileHeader = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);
  const subscriptionPlan = useSelector(selectSubscriptionPlan);
  const uploadMutation = useUpdateProfilePicture();

  const fileInputRef = useRef(null);
  const [error, setError] = useState("");

  const getPlanBadge = (plan) => {
    switch (plan) {
      case "plus":
        return { label: t("pricing.plan.plus.title", { defaultValue: "Plus" }), icon: Star, className: "bg-kashf-blue/20 text-kashf-blue border-kashf-blue/30", iconColor: "text-kashf-blue" };
      case "family":
        return { label: t("pricing.plan.family.title", { defaultValue: "Family" }), icon: Users, className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", iconColor: "text-emerald-400" };
      default:
        return { label: t("pricing.plan.free.title", { defaultValue: "Free" }), icon: Check, className: "bg-neutral-800 text-neutral-400 border-neutral-700", iconColor: "text-neutral-400" };
    }
  };

  const planBadge = getPlanBadge(subscriptionPlan);
  const PlanIcon = planBadge.icon;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(i18n.language, { year: "numeric", month: "long" })
    : null;

  const handleAvatarClick = () => {
    if (uploadMutation.isPending) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setError("");
      uploadMutation.mutate(file, {
        onError: (err) => {
          setError(err.message || t("profile.header.uploadError") || "Failed to upload photo.");
        }
      });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Profile Picture */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div 
            onClick={handleAvatarClick}
            className="relative group cursor-pointer"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-kashf-blue/50 ring-offset-4 ring-offset-kashf-surface bg-neutral-900 flex items-center justify-center">
              <UserAvatar user={user} size="full" className="w-full h-full" />

              {/* Uploading Spinner State (clipped to circle) */}
              {uploadMutation.isPending && (
                <div className="absolute inset-0 bg-neutral-950/80 flex flex-col items-center justify-center z-10">
                  <Loader2 className="w-6 h-6 text-kashf-blue animate-spin" />
                  <span className="text-[10px] text-neutral-300 mt-1 font-medium text-center px-1">
                    {t("profile.header.uploading") || "Uploading..."}
                  </span>
                </div>
              )}

              {/* Expandable Hover Edit Overlay (starts as small bottom overlay, expands to full circle) */}
              {!uploadMutation.isPending && (
                <div className="absolute bottom-0 left-0 right-0 h-7 md:h-9 bg-neutral-950/70 backdrop-blur-[2px] border-t border-kashf-blue/30 flex flex-col items-center justify-center transition-all duration-300 ease-in-out z-10 group-hover:h-full group-hover:bg-neutral-950/60 group-hover:backdrop-blur-sm group-hover:border-t-transparent">
                  <Camera className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-white/95 transition-all duration-300 group-hover:scale-110 group-hover:mb-1" />
                  <span className="text-[9px] md:text-[10px] text-white font-medium text-center px-1 opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:max-h-6">
                    {t("profile.header.changePicture") || "Change Photo"}
                  </span>
                </div>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-[11px] text-red-400 mt-2 text-center max-w-[120px] leading-tight">
              {error}
            </p>
          )}
        </div>

        {/* User Info */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {user?.username || user?.name || "—"}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                {subscriptionPlan !== "free" && (
                  <Badge variant="premium" className="inline-flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    {t("profile.header.premiumUser")}
                  </Badge>
                )}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${planBadge.className}`}>
                  <PlanIcon className={`w-3.5 h-3.5 ${planBadge.iconColor}`} />
                  {planBadge.label}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-kashf-blue flex-shrink-0" />
              <span>{user?.email || "—"}</span>
            </div>
            {memberSince && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-kashf-blue flex-shrink-0" />
                <span>
                  <b>{t("profile.header.memberSince")}:</b> {memberSince}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
