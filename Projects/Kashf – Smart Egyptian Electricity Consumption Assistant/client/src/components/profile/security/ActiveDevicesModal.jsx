import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Loader2, Smartphone } from "lucide-react";
import Button from "../../premium/Button";
import { getDevices, revokeDevice } from "../../../services/securityService";
import { parseUA } from "./securityUtils";

const ActiveDevicesModal = ({ isOpen, onClose, currentSessionId }) => {
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
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getDevices();
      setDevices(res?.data?.sessions || []);
    } catch (err) {
      setError(err.message || "Failed to retrieve active devices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDevices();
    }
  }, [isOpen]);

  const handleRevokeDevice = async (sessionId) => {
    setError("");
    try {
      await revokeDevice(sessionId);
      setSuccess(t("security.devicesModal.revokeSuccess"));
      await fetchDevices();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to revoke device.");
    }
  };

  const handleClose = () => {
    setError("");
    setSuccess("");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-start justify-center p-4">
      <div className="bg-neutral-900/95 border border-neutral-800 backdrop-blur-md shadow-2xl rounded-2xl max-w-lg w-full p-6 relative my-auto">
        <button onClick={handleClose} className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} text-neutral-400 hover:text-neutral-200 transition-colors`}>
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-white mb-4 text-center">{t("security.devicesModal.title")}</h3>

        {error && <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}
        {success && <div className="p-3 mb-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">{success}</div>}

        {loading && devices.length === 0 ? (
          <div className="flex justify-center p-6"><Loader2 className="w-6 h-6 text-kashf-blue animate-spin" /></div>
        ) : devices.length === 0 ? (
          <p className="text-center text-sm text-neutral-400 py-6">{t("security.devicesModal.empty") || "No active devices found."}</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {devices.map((device, idx) => {
              const isCurrent = currentSessionId ? (currentSessionId === device._id) : (idx === 0);
              return (
                <div key={device._id} className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-neutral-400" />
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <span className="block text-sm text-white font-medium">{parseUA(device.userAgent, t)}</span>
                      <span className="block text-xs text-neutral-500 font-mono">{device.ip}</span>
                    </div>
                  </div>
                  {isCurrent ? (
                    <span className="text-[10px] font-semibold text-kashf-blue bg-kashf-blue/10 px-2 py-0.5 rounded-full">
                      {t("security.devicesModal.current")}
                    </span>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-xs text-red-400 hover:bg-red-500/10" onClick={() => handleRevokeDevice(device._id)}>
                      {t("security.actions.revoke")}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveDevicesModal;
