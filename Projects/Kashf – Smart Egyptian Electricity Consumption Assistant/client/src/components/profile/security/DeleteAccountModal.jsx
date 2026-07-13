import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X, Loader2, Eye, EyeOff } from "lucide-react";
import Button from "../../premium/Button";
import { deleteAccount } from "../../../services/securityService";
import { logout as logoutAction } from "../../../store/auth/authSlice";

const DeleteAccountModal = ({ isOpen, onClose }) => {
  const { t: translate, i18n } = useTranslation();
  const t = (key, options) => {
    if (key && key.startsWith("security.")) {
      return translate("profile." + key, options);
    }
    return translate(key, options);
  };
  const isRTL = i18n.dir() === "rtl";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [showPass, setShowPass] = useState({ current: false });

  const handleClose = () => {
    setError("");
    setSuccess("");
    setDeletePassword("");
    setShowPass({ current: false });
    onClose();
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await deleteAccount(deletePassword);
      setSuccess(t("security.deleteModal.success"));
      setTimeout(() => {
        dispatch(logoutAction());
        navigate("/register", { replace: true });
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to delete account.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-start justify-center p-4">
      <div className="bg-neutral-900/95 border border-red-900/35 backdrop-blur-md shadow-2xl rounded-2xl max-w-md w-full p-6 relative my-auto">
        <button onClick={handleClose} className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer`}>
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-red-500 mb-4 text-center">{t("security.deleteModal.title")}</h3>

        {error && <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}
        {success && <div className="p-3 mb-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">{success}</div>}

        <p className="text-xs text-red-400 px-1 py-3 rounded-xl mb-4 leading-relaxed text-right">
          {t("security.deleteModal.warning")}
        </p>

        <form onSubmit={handleDeleteAccount} className="space-y-4">
          <div className="relative text-right">
            <label className="block text-xs font-semibold text-neutral-400 mb-2">{t("security.deleteModal.confirmText")}</label>
            <input
              type={showPass.current ? "text" : "password"}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white outline-none focus:border-red-500"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPass({ ...showPass, current: !showPass.current })}
              className={`absolute bottom-3 ${isRTL ? "left-3" : "right-3"} text-neutral-500 hover:text-neutral-300`}
            >
              {showPass.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <Button type="submit" variant="danger" disabled={loading} className="w-full mt-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("security.deleteModal.button")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
