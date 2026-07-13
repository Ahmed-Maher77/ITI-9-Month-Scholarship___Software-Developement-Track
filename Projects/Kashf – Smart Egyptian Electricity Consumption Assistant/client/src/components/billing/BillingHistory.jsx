import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Loader2, CreditCard } from 'lucide-react';
import { fetchPaymentHistory } from '../../services/paymentService';

const BillingHistory = ({ currentPlan, user }) => {
    const { t } = useTranslation();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await fetchPaymentHistory();
                setHistory(data);
            } catch (err) {
                console.error("Failed to load billing history:", err);
            } finally {
                setLoading(false);
            }
        };
        loadHistory();
    }, []);

    const handleDownloadPDF = (payment) => {
        const isRtl = document.documentElement.dir === 'rtl';
        const invoiceNum = payment.paymentIntentId || payment._id || `INV-${payment.createdAt}`;
        const dateStr = new Date(payment.createdAt).toLocaleDateString(
            isRtl ? 'ar-EG' : 'en-US',
            { year: 'numeric', month: 'long', day: 'numeric' }
        );
        const planName = t(`pricing.plan.${payment.targetPlan}.title`, payment.targetPlan);
        const cardDetails = payment.paymentInfo?.brand 
            ? `${payment.paymentInfo.brand.toUpperCase()} **** **** **** ${payment.paymentInfo.last4 || ''}` 
            : t('billing.paymentMethod.card', 'Credit/Debit Card');

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="${isRtl ? 'ar' : 'en'}" dir="${isRtl ? 'rtl' : 'ltr'}">
            <head>
                <meta charset="UTF-8">
                <title>${isRtl ? 'فاتورة' : 'Invoice'} - ${invoiceNum}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 40px;
                        color: #333;
                        background: #fff;
                    }
                    .invoice-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 2px solid #3b82f6;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .logo-title {
                        font-size: 28px;
                        font-weight: bold;
                        color: #3b82f6;
                    }
                    .invoice-details {
                        margin-bottom: 30px;
                    }
                    .invoice-details table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .invoice-details td {
                        padding: 6px 0;
                    }
                    .invoice-details td.label {
                        font-weight: bold;
                        color: #666;
                        width: 150px;
                    }
                    .billing-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 40px;
                    }
                    .billing-table th, .billing-table td {
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: ${isRtl ? 'right' : 'left'};
                    }
                    .billing-table th {
                        background-color: #f3f4f6;
                        color: #4b5563;
                        font-weight: bold;
                    }
                    .total-section {
                        text-align: ${isRtl ? 'left' : 'right'};
                        font-size: 18px;
                        font-weight: bold;
                        margin-top: 20px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 100px;
                        font-size: 12px;
                        color: #9ca3af;
                        border-top: 1px solid #e5e7eb;
                        padding-top: 20px;
                    }
                    @media print {
                        body { margin: 20px; }
                        button { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="invoice-header">
                    <div>
                        <div class="logo-title">${isRtl ? 'كشف' : 'Kashf'}</div>
                        <div style="font-size: 12px; color: #666; margin-top: 4px;">
                            ${isRtl ? 'مساعد استهلاك الكهرباء الذكي' : 'AI-Powered Electricity Consumption Assistant'}
                        </div>
                    </div>
                    <div style="text-align: ${isRtl ? 'left' : 'right'};">
                        <h1 style="margin: 0; color: #1f2937; font-size: 24px;">${isRtl ? 'فاتورة ضريبية' : 'Tax Invoice'}</h1>
                        <p style="margin: 5px 0 0 0; color: #666;">#${invoiceNum.substring(0, 12)}</p>
                    </div>
                </div>

                <div class="invoice-details">
                    <table>
                        <tr>
                            <td class="label">${isRtl ? 'تاريخ الفاتورة:' : 'Invoice Date:'}</td>
                            <td>${dateStr}</td>
                        </tr>
                        <tr>
                            <td class="label">${isRtl ? 'العميل:' : 'Customer Name:'}</td>
                            <td>${user?.username || user?.name || '—'}</td>
                        </tr>
                        <tr>
                            <td class="label">${isRtl ? 'البريد الإلكتروني:' : 'Email Address:'}</td>
                            <td>${user?.email || '—'}</td>
                        </tr>
                        <tr>
                            <td class="label">${isRtl ? 'وسيلة الدفع:' : 'Payment Method:'}</td>
                            <td>${cardDetails}</td>
                        </tr>
                    </table>
                </div>

                <table class="billing-table">
                    <thead>
                        <tr>
                            <th>${isRtl ? 'الوصف' : 'Description'}</th>
                            <th style="width: 150px; text-align: center;">${isRtl ? 'المجموع' : 'Total'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <b>${isRtl ? 'اشتراك باقة كشف ' : 'Kashf Subscription - '}${planName}</b><br>
                                <span style="font-size: 12px; color: #666;">
                                    ${isRtl ? 'صلاحية لمدة 30 يوماً من تاريخ الدفع' : 'Subscription access valid for 30 days from payment date.'}
                                </span>
                            </td>
                            <td style="text-align: center; font-weight: bold;">${payment.amount.toFixed(2)} ${t('common.egp')}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="total-section">
                    ${isRtl ? 'الإجمالي المستحق:' : 'Total Amount Paid:'} <span style="color: #3b82f6;">${payment.amount.toFixed(2)} ${t('common.egp')}</span>
                </div>

                <div class="footer">
                    <p>${isRtl ? 'شكراً لتعاملك مع كشف!' : 'Thank you for choosing Kashf!'}</p>
                    <p style="margin-top: 5px;">${isRtl ? 'هذه فاتورة تم إنشاؤها تلقائياً ولا تتطلب توقيعاً.' : 'This is a computer-generated invoice and requires no physical signature.'}</p>
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(function() { window.close(); }, 500);
                    };
                </script>
            </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(htmlContent);
        printWindow.document.close();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-12 bg-kashf-surface border border-kashf-border rounded-2xl">
                <Loader2 className="size-6 text-kashf-light-blue animate-spin" />
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="p-8 pt-14 text-center flex flex-col items-center justify-center">
                <CreditCard className="size-10 text-neutral-600 mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">{t('billing.history.title')}</h3>
                <p className="text-sm text-neutral-500">{t('billing.history.empty', { defaultValue: 'No billing records found.' })}</p>
            </div>
        );
    }

    return (
        <div className="bg-kashf-surface border border-kashf-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-kashf-border">
                <h3 className="text-lg font-bold text-white">{t('billing.history.title')}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-sm text-neutral-400">
                    <thead className="bg-neutral-900/50 text-xs uppercase font-semibold text-neutral-500 border-b border-kashf-border">
                        <tr>
                            <th className={`px-6 py-4 ${document.documentElement.dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('billing.history.date')}</th>
                            <th className={`px-6 py-4 ${document.documentElement.dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('billing.history.amount')}</th>
                            <th className={`px-6 py-4 ${document.documentElement.dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('billing.history.plan')}</th>
                            <th className={`px-6 py-4 ${document.documentElement.dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('billing.history.status')}</th>
                            <th className={`px-6 py-4 ${document.documentElement.dir === 'rtl' ? 'text-left' : 'text-right'}`}>{t('billing.history.invoice')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {history.map((payment) => {
                            const date = new Date(payment.createdAt).toLocaleDateString(
                                document.documentElement.dir === 'rtl' ? 'ar-EG' : 'en-US',
                                {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                }
                            );

                            return (
                                <tr key={payment._id} className="hover:bg-neutral-900/30 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{date}</td>
                                    <td className="px-6 py-4 font-medium" dir="ltr">{payment.amount.toFixed(2)} {t('common.egp')}</td>
                                    <td className="px-6 py-4 capitalize">{t(`billing.plans.${payment.targetPlan}.name`)}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                            {t('billing.history.paid')}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 ${document.documentElement.dir === 'rtl' ? 'text-left' : 'text-right'}`}>
                                        <button 
                                            onClick={() => handleDownloadPDF(payment)}
                                            className="text-kashf-light-blue hover:text-white transition-colors inline-flex items-center justify-end gap-1 cursor-pointer"
                                        >
                                            <Download className="size-4" /> {t('billing.history.pdf')}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BillingHistory;
