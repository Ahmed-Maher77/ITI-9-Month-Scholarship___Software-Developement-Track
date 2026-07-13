import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, Zap, Eye, Trash2, CheckCircle, AlertCircle, Settings, Loader2, X } from "lucide-react";
import Button from "../premium/Button";
import Badge from "../premium/Badge";
import { createMeterAsync, updateMeterAsync, deleteMeterAsync } from "../../store/meters/metersSlice";
import MeterFormModal from "../meters/MeterFormModal";
import DeleteMeterModal from "../meters/DeleteMeterModal";

const ConnectedMeters = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { meters, isLoading, error } = useSelector((state) => state.meters);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingMeter, setEditingMeter] = useState(null);
  const [meterToDelete, setMeterToDelete] = useState(null);
  const [showError, setShowError] = useState(false);

  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleSaveMeter = async (meterData) => {
    if (editingMeter) {
      await dispatch(updateMeterAsync({ id: editingMeter.id, data: meterData })).unwrap();
    } else {
      await dispatch(createMeterAsync(meterData)).unwrap();
    }
    setIsFormModalOpen(false);
    setEditingMeter(null);
  };

  const confirmDelete = () => {
    if (meterToDelete) {
      dispatch(deleteMeterAsync(meterToDelete.id));
      setMeterToDelete(null);
    }
  };

  const getLocalizedErrorMessage = (errMsg, t) => {
    if (!errMsg) return '';
    const errMsgStr = typeof errMsg === 'string' ? errMsg : String(errMsg);
    if (errMsgStr.includes("maximum number of meters allowed")) {
      const match = errMsgStr.match(/\((\d+)\)/);
      const limit = match ? match[1] : '';
      return t("meters.maxMetersError", { 
        limit, 
        defaultValue: `You have reached the maximum number of meters allowed for your plan (${limit}). Please upgrade your plan to register more meters.` 
      });
    }
    if (errMsgStr.includes("already exists")) {
      return t("meters.alreadyExistsError", { 
        defaultValue: "Meter with this number already exists for this user." 
      });
    }
    return t("meters.errorLoading", "Failed to load meters. Please try again.");
  };

  return (
    <div className="mb-6 relative">
      {showError && error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            <span>{getLocalizedErrorMessage(error, t)}</span>
          </div>
          <button 
            onClick={() => setShowError(false)} 
            className="text-red-400 hover:text-white p-1 transition-colors rounded-lg hover:bg-red-500/10"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">{t("profile.meters.title")}</h2>
        <Button 
          variant="primary" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => {
            setEditingMeter(null);
            setIsFormModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          {t("profile.meters.addNewMeter")}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-kashf-blue animate-spin" />
        </div>
      ) : meters.length === 0 ? (
        <div className="text-center py-12 bg-kashf-bg/30 border border-dashed border-kashf-border rounded-xl">
          <Zap className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <p className="text-sm text-neutral-400">
            {t("meters.noMeters", "No meters registered yet.")}
          </p>
          <button
            onClick={() => {
              setEditingMeter(null);
              setIsFormModalOpen(true);
            }}
            className="text-xs text-kashf-blue hover:underline mt-2"
          >
            {t("profile.meters.addNewMeter")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meters.map((meter) => (
            <div
              key={meter.id}
              className="bg-kashf-bg/50 rounded-xl p-5 border border-kashf-border/50 hover:border-kashf-blue/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-kashf-blue/10 rounded-lg p-2">
                    <Zap className="w-5 h-5 text-kashf-blue" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{t(meter.name, meter.name)}</h3>
                    <p className="text-xs text-neutral-400 font-mono">#{meter.number}</p>
                  </div>
                </div>
                <Badge
                  variant={meter.status === "active" ? "success" : "warning"}
                  className="flex items-center gap-1"
                >
                  {meter.status === "active" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {meter.status === "active" 
                    ? t("profile.meters.active", "Active") 
                    : t(`meters.status.${meter.status}`, meter.status)}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">{t("profile.meters.currentConsumption")}</span>
                  <span className="text-white font-medium">
                    {meter.consumption} {t("common.kwh", "kWh")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">{t("profile.meters.currentTier")}</span>
                  <span className="text-white font-medium">
                    {t("common.tier", { tier: meter.tier || "--" })}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => navigate(`/meters/${meter.id}/simulation`)}
                >
                  <Eye className="w-4 h-4" />
                  {t("profile.meters.viewDetails")}
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex items-center justify-center"
                  onClick={() => {
                    setEditingMeter(meter);
                    setIsFormModalOpen(true);
                  }}
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="flex items-center justify-center gap-2"
                  onClick={() => setMeterToDelete(meter)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <MeterFormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        onSave={handleSaveMeter} 
        meter={editingMeter} 
      />

      <DeleteMeterModal 
        isOpen={!!meterToDelete} 
        onClose={() => setMeterToDelete(null)} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
};

export default ConnectedMeters;
