import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { X, Receipt, AlertCircle } from "lucide-react";
import { addBillAsync, editBillAsync } from "../../store/bills/billsSlice";
import { fetchMeters } from "../../store/meters/metersSlice";
import BillingPeriodSection from "./BillingPeriodSection";
import UsageDataSection from "./UsageDataSection";
import FinancialSummarySection from "./FinancialSummarySection";

const BillModal = ({ isOpen, onClose, initialData }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { meters } = useSelector((state) => state.meters);

    useEffect(() => {
        const mainContent = document.getElementById("main-content");
        if (isOpen && mainContent) {
            mainContent.style.overflow = "hidden";
        }
        return () => {
            if (mainContent) {
                mainContent.style.overflow = "";
            }
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchMeters());
        }
    }, [isOpen, dispatch]);

    const [formData, setFormData] = useState({
        month: "",
        consumption: "",
        tier: "",
        amount: "",
        status: "pending",
        dueDate: "",
        meter: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                month: initialData.month || "",
                consumption: initialData.consumption || "",
                tier: initialData.tier || "",
                amount: initialData.amount || "",
                status: initialData.status || "pending",
                dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : "",
                meter: initialData.meter ? (initialData.meter.id || initialData.meter._id || initialData.meter) : "",
            });
        } else {
            setFormData({
                month: "",
                consumption: "",
                tier: "",
                amount: "",
                status: "pending",
                dueDate: "",
                meter: "",
            });
        }
    }, [initialData, isOpen]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const dataToSubmit = {
                ...formData,
                consumption: Number(formData.consumption),
                tier: Number(formData.tier),
                amount: Number(formData.amount),
                meter: formData.meter || undefined,
            };

            if (initialData) {
                await dispatch(editBillAsync({ id: initialData.id, billData: dataToSubmit })).unwrap();
            } else {
                await dispatch(addBillAsync(dataToSubmit)).unwrap();
            }

            // Reset and close
            onClose();
        } catch (err) {
            setError(err || "Failed to add bill");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
            <div className="flex min-h-full items-start justify-center p-4">
                <div className="bg-kashf-bg border border-kashf-border rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-auto">
                <div className="flex justify-between items-center p-6 border-b border-kashf-border bg-neutral-900/30">
                    <div className="flex items-center gap-3">
                        <div className="p-1 text-kashf-light-blue">
                            <Receipt className="size-7" />
                        </div>
                        <h2 className="text-xl font-bold text-white tracking-tight">
                            {initialData ? t("bills.editBill", "Edit Bill") : t("bills.addBill", "Add New Bill")}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-sm text-red-400">
                            <AlertCircle className="size-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-8">
                        {/* Period & Usage Grid */}
                        <div className="grid grid-cols-1 gap-8">
                            <BillingPeriodSection formData={formData} handleChange={handleChange} meters={meters} />
                            <UsageDataSection formData={formData} handleChange={handleChange} />
                        </div>

                        {/* Financials (Bottom) */}
                        <FinancialSummarySection formData={formData} handleChange={handleChange} />
                    </div>

                    <div className="mt-8 pt-6 border-t border-kashf-border flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl font-medium text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                        >
                            {t("common.cancel", "Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-medium text-sm bg-kashf-blue hover:bg-kashf-light-blue text-kashf-bg transition-all disabled:opacity-50 disabled:hover:bg-kashf-blue"
                        >
                            {isSubmitting
                                ? t("common.saving", "Saving...")
                                : t("common.save", "Save Bill")}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default BillModal;
