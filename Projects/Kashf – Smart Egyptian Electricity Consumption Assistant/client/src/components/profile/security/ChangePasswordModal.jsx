import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import Button from "../../premium/Button";
import { changePassword } from "../../../services/securityService";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { t: translate, i18n } = useTranslation();
  const t = (key, options) => {
    if (key && key.startsWith("security.")) {
      return translate("profile." + key, options);
    }
    return translate(key, options);
  };
  const isRTL = i18n.dir() === "rtl";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  if (!isOpen) return null;

  const resetState = () => {
    setError("");
    setSuccess("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPass({ current: false, new: false, confirm: false });
  }

  const handleClose = () => {
      resetState();
      onClose();
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError(t("security.changePasswordModal.mismatch"));
      return;
    }

    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      setSuccess(t("security.changePasswordModal.success"));
      setTimeout(() => {
          handleClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-start justify-center p-4">
      <div className="bg-neutral-900/95 border border-neutral-800 backdrop-blur-lg shadow-2xl rounded-2xl max-w-md w-full p-6 relative my-auto">
        <button onClick={handleClose} className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} text-neutral-400 hover:text-neutral-200 transition-colors`}>
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-white mb-4 text-center">{t("security.changePasswordModal.title")}</h3>

        {error && <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}
        {success && (
          <div className="p-3 mb-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {success}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="relative">
            <label className="block text-xs font-semibold text-neutral-400 mb-2">{t("security.changePasswordModal.currentPassword")}</label>
            <input
              type={showPass.current ? "text" : "password"}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white outline-none focus:border-kashf-blue"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPass({ ...showPass, current: !showPass.current })}
              className={`absolute bottom-2.5 ${isRTL ? "left-3" : "right-3"} text-neutral-500 hover:text-neutral-300`}
            >
              {showPass.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-xs font-semibold text-neutral-400 mb-2">{t("security.changePasswordModal.newPassword")}</label>
            <input
              type={showPass.new ? "text" : "password"}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white outline-none focus:border-kashf-blue"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPass({ ...showPass, new: !showPass.new })}
              className={`absolute bottom-2.5 ${isRTL ? "left-3" : "right-3"} text-neutral-500 hover:text-neutral-300`}
            >
              {showPass.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-xs font-semibold text-neutral-400 mb-2">{t("security.changePasswordModal.confirmPassword")}</label>
            <input
              type={showPass.confirm ? "text" : "password"}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white outline-none focus:border-kashf-blue"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })}
              className={`absolute bottom-2.5 ${isRTL ? "left-3" : "right-3"} text-neutral-500 hover:text-neutral-300`}
            >
              {showPass.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4 flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("security.actions.save")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
