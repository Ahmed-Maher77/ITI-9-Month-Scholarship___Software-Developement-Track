import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Loader2 } from "lucide-react";
import { getLoginHistory } from "../../../services/securityService";
import { parseUA } from "./securityUtils";

const LoginHistoryModal = ({ isOpen, onClose }) => {
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
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchHistory = async () => {
        setLoading(true);
        setError("");
        try {
          const res = await getLoginHistory();
          setLoginHistory(res?.data?.history || []);
        } catch (err) {
          setError(err.message || "Failed to retrieve login history.");
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [isOpen]);

  const handleClose = () => {
    setError("");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-start justify-center p-4">
      <div className="bg-neutral-900/95 border border-neutral-800 backdrop-blur-md shadow-2xl rounded-2xl max-w-lg w-full p-6 relative my-auto">
        <button onClick={handleClose} className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} text-neutral-400 hover:text-neutral-200 transition-colors`}>
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-white mb-4 text-center">{t("security.historyModal.title")}</h3>

        {error && <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}

        {loading && loginHistory.length === 0 ? (
          <div className="flex justify-center p-6"><Loader2 className="w-6 h-6 text-kashf-blue animate-spin" /></div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto pr-1">
            <table className="w-full text-xs text-neutral-300 text-center">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="py-2 text-right">{t("security.historyModal.time")}</th>
                  <th className="py-2">{t("security.historyModal.ip")}</th>
                  <th className="py-2 text-left">{t("security.historyModal.device")}</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((history) => (
                  <tr key={history._id} className="border-b border-neutral-800/40 hover:bg-neutral-950/40">
                    <td className="py-2 text-right">{new Date(history.createdAt).toLocaleString(i18n.language === "ar" ? "ar-EG" : "en-US", { dateStyle: "short", timeStyle: "short" })}</td>
                    <td className="py-2 font-mono">{history.metadata?.ip || "Unknown"}</td>
                    <td className="py-2 text-left truncate max-w-[120px]" title={history.metadata?.userAgent}>{parseUA(history.metadata?.userAgent, t)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginHistoryModal;
