import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Lock, Smartphone, History, Trash2, ChevronRight } from "lucide-react";
import Button from "../premium/Button";
import { useAuth } from "../../hooks/useAuth";
import { getAccessToken } from "../../auth/authStorage";
import { decodeJwtPayload } from "../../auth/tokenUtils";

import ChangePasswordModal from "./security/ChangePasswordModal";
import TwoFactorAuthModal from "./security/TwoFactorAuthModal";
import ActiveDevicesModal from "./security/ActiveDevicesModal";
import LoginHistoryModal from "./security/LoginHistoryModal";
import DeleteAccountModal from "./security/DeleteAccountModal";

const SecuritySettings = () => {
  const { t: translate, i18n } = useTranslation();
  const t = (key, options) => {
    if (key && key.startsWith("security.")) {
      return translate("profile." + key, options);
    }
    return translate(key, options);
  };
  const { user } = useAuth();
  const isRTL = i18n.dir() === "rtl";

  // Get current session ID from accessToken
  const token = getAccessToken();
  const tokenPayload = token ? decodeJwtPayload(token) : null;
  const currentSessionId = tokenPayload?.sessionId;

  // Active Modals State
  const [activeModal, setActiveModal] = useState(null); // 'password' | '2fa' | 'devices' | 'history' | 'delete'

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const securityOptions = [
    {
      type: "password",
      icon: Lock,
      label: t("security.changePassword"),
      description: t("security.changePasswordDesc"),
      action: t("security.changePassword"),
    },
    {
      type: "2fa",
      icon: Shield,
      label: t("security.twoFactorAuth"),
      description: t("security.twoFactorAuthDesc"),
      action: user.twoFactorEnabled ? t("security.actions.disable") : t("security.actions.enable"),
    },
    {
      type: "devices",
      icon: Smartphone,
      label: t("security.activeDevices"),
      description: t("security.activeDevicesDesc"),
      action: t("security.actions.view"),
    },
    {
      type: "history",
      icon: History,
      label: t("security.loginHistory"),
      description: t("security.loginHistoryDesc"),
      action: t("security.actions.view"),
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-kashf-blue" />
        <h2 className="text-lg font-semibold text-white">{t("security.title")}</h2>
      </div>

      <div className="space-y-3 mb-6">
        {securityOptions.map((option) => (
          <div
            key={option.type}
            className="flex items-center justify-between p-4 bg-kashf-bg/50 rounded-xl border border-kashf-border/50 hover:border-kashf-blue/30 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="bg-kashf-blue/10 rounded-lg p-2">
                <option.icon className="w-4 h-4 text-kashf-blue" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white font-medium">{option.label}</p>
                  {option.type === "2fa" && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${user.twoFactorEnabled ? "bg-green-500/20 text-green-400" : "bg-neutral-500/20 text-neutral-400"}`}>
                      {user.twoFactorEnabled ? t("security.status.enabled") : t("security.status.disabled")}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 mt-1">{option.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => openModal(option.type)}>
              {option.action}
              {isRTL ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-kashf-border/50">
        <Button variant="danger" size="sm" className="flex items-center gap-2" onClick={() => openModal("delete")}>
          <Trash2 className="w-4 h-4" />
          {t("security.deleteAccount")}
        </Button>
      </div>

      <ChangePasswordModal isOpen={activeModal === "password"} onClose={closeModal} />
      <TwoFactorAuthModal isOpen={activeModal === "2fa"} onClose={closeModal} user={user} />
      <ActiveDevicesModal isOpen={activeModal === "devices"} onClose={closeModal} currentSessionId={currentSessionId} />
      <LoginHistoryModal isOpen={activeModal === "history"} onClose={closeModal} />
      <DeleteAccountModal isOpen={activeModal === "delete"} onClose={closeModal} />
    </div>
  );
};

export default SecuritySettings;
