import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { X, Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import Button from "../../premium/Button";
import { setup2fa, enable2fa, disable2fa } from "../../../services/securityService";
import { setUser } from "../../../store/auth/authSlice";

const TwoFactorAuthModal = ({ isOpen, onClose, user }) => {
  const { t: translate, i18n } = useTranslation();
  const t = (key, options) => {
    if (key && key.startsWith("security.")) {
      return translate("profile." + key, options);
    }
    return translate(key, options);
  };
  const isRTL = i18n.dir() === "rtl";
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [twoFactorSecret, setTwoFactorSecret] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [passwordFor2faDisable, setPasswordFor2faDisable] = useState("");
  const [showPass, setShowPass] = useState({ current: false });

  const resetState = () => {
    setError("");
    setSuccess("");
    setTwoFactorSecret("");
    setTwoFactorCode("");
    setPasswordFor2faDisable("");
    setShowPass({ current: false });
  }

  const handleClose = () => {
      resetState();
      onClose();
  }

  useEffect(() => {
    if (isOpen && !user.twoFactorEnabled) {
      const init2faSetup = async () => {
        setLoading(true);
        setError("");
        try {
          const res = await setup2fa();
          setTwoFactorSecret(res?.data?.secret || "");
        } catch (err) {
          setError(err.message || "Failed to initialize 2FA setup.");
        } finally {
          setLoading(false);
        }
      };
      init2faSetup();
    }
  }, [isOpen, user.twoFactorEnabled]);

  const handleEnable2fa = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await enable2fa(twoFactorCode);
      dispatch(setUser({ ...user, twoFactorEnabled: true }));
      setSuccess(t("security.twoFactorModal.successEnabled"));
      setTimeout(() => handleClose(), 2000);
    } catch (err) {
      setError(err.message || "Failed to enable 2FA.");
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2fa = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await disable2fa(passwordFor2faDisable);
      dispatch(setUser({ ...user, twoFactorEnabled: false }));
      setSuccess(t("security.twoFactorModal.successDisabled"));
      setTimeout(() => handleClose(), 2000);
    } catch (err) {
      setError(err.message || "Failed to disable 2FA.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-start justify-center p-4">
      <div className="bg-neutral-900/95 border border-neutral-800 backdrop-blur-md shadow-2xl rounded-2xl max-w-lg w-full p-6 relative my-auto">
        <button onClick={handleClose} className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} text-neutral-400 hover:text-neutral-200 transition-colors`}>
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-white mb-5 text-center">{t("security.twoFactorModal.title")}</h3>

        {error && <div className="p-3 mb-5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}
        {success && (
          <div className="p-3 mb-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {success}
          </div>
        )}

        {!user.twoFactorEnabled ? (
          <form onSubmit={handleEnable2fa} className="space-y-4 text-center">
            <p className="text-sm text-neutral-300 mb-5">{t("security.twoFactorModal.enableInstructions")}</p>

            {loading && !twoFactorSecret ? (
              <div className="flex justify-center p-6"><Loader2 className="w-6 h-6 text-kashf-blue animate-spin" /></div>
            ) : (
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl mb-7">
                <span className="block text-xs text-neutral-400 mb-1">{t("security.twoFactorModal.secretKey")}</span>
                <span className="font-mono text-white text-sm select-all tracking-wider">{twoFactorSecret}</span>
              </div>
            )}

            <div className="text-right">
              <label className="block text-xs font-semibold text-neutral-400 mb-2">{t("security.twoFactorModal.enterCode")}</label>
              <input
                type="text"
                maxLength={6}
                required
                placeholder="123456"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white outline-none focus:border-kashf-blue font-mono text-center tracking-widest text-lg"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-4 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("security.actions.enable")}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleDisable2fa} className="space-y-4">
            <p className="text-sm text-neutral-300 text-center mb-4">{t("security.twoFactorModal.disableInstructions")}</p>

            <div className="relative text-right">
              <label className="block text-xs font-semibold text-neutral-400 mb-2">{t("security.twoFactorModal.confirmPassword")}</label>
              <input
                type={showPass.current ? "text" : "password"}
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white outline-none focus:border-kashf-blue text-left"
                value={passwordFor2faDisable}
                onChange={(e) => setPasswordFor2faDisable(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPass({ ...showPass, current: !showPass.current })}
                className={`absolute bottom-2.5 ${isRTL ? "left-3" : "right-3"} text-neutral-500 hover:text-neutral-300`}
              >
                {showPass.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button type="submit" variant="danger" disabled={loading} className="w-full mt-4 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("security.actions.disable")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TwoFactorAuthModal;
