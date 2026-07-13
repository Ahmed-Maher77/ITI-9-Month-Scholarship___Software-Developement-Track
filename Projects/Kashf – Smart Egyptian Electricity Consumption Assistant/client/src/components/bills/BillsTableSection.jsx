import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Clock, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import BillsFilter from './BillsFilter';
import BillsPagination from './BillsPagination';

const BillsTableSection = ({ 
    bills, 
    isLoading, 
    page, 
    setPage, 
    totalPages, 
    yearFilter, 
    setYearFilter, 
    statusFilter, 
    setStatusFilter,
    setBillToEdit,
    setBillToDelete
}) => {
    const { t } = useTranslation();

    const getStatusProps = (status) => {
        switch (status) {
            case 'paid':
                return { icon: Check, color: 'text-emerald-400', label: t('bills.history.paid', 'Paid') };
            case 'pending':
                return { icon: Clock, color: 'text-amber-400', label: t('bills.history.pending', 'Pending') };
            case 'overdue':
                return { icon: AlertCircle, color: 'text-red-400', label: t('bills.history.overdue', 'Overdue') };
            default:
                return { icon: Check, color: 'text-neutral-400', label: status };
        }
    };

    return (
        <div className="pt-4">
            <div className="pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-base sm:text-lg font-bold text-white">{t('bills.history.title')}</h3>
                <BillsFilter 
                    yearFilter={yearFilter}
                    setYearFilter={setYearFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    setPage={setPage}
                />
            </div>
            
            <div className="overflow-x-auto border border-kashf-border rounded-xl">
                <table className="w-full text-start text-xs sm:text-sm text-neutral-400 min-w-[600px]">
                    <thead className="bg-neutral-900/50 text-[10px] sm:text-xs uppercase font-semibold text-neutral-500 border-b border-kashf-border">
                        <tr>
                            <th className="px-6 py-4 text-start">{t('bills.history.invoiceNo')}</th>
                            <th className="px-6 py-4 text-start">{t('bills.history.billingMonth')}</th>
                            <th className="px-6 py-4 text-start">{t('bills.history.consumption')}</th>
                            <th className="px-6 py-4 text-start">{t('bills.history.tier')}</th>
                            <th className="px-6 py-4 text-start">{t('bills.history.amount')}</th>
                            <th className="px-6 py-4 text-start">{t('bills.history.status')}</th>
                            <th className="px-6 py-4 text-end">{t('bills.history.action')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 bg-kashf-surface">
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-neutral-500">
                                    {t('common.loading', 'Loading...')}
                                </td>
                            </tr>
                        ) : bills.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-neutral-500">
                                    {t('bills.history.noBills', 'No bills found.')}
                                </td>
                            </tr>
                        ) : (
                            bills.map((bill) => (
                                <tr key={bill.id} className="hover:bg-neutral-900/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-white">{bill.id}</td>
                                    <td className="px-6 py-4">{bill.month}</td>
                                    <td className="px-6 py-4"><span dir="ltr">{bill.consumption} kWh</span></td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                            bill.tier >= 4 ? 'bg-amber-500/10 text-amber-400' : 'bg-kashf-blue/10 text-kashf-light-blue'
                                        }`}>
                                            {t('common.tier', { tier: bill.tier, defaultValue: `Tier ${bill.tier}` })}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-white">{bill.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        {(() => {
                                            const statusProps = getStatusProps(bill.status);
                                            const Icon = statusProps.icon;
                                            return (
                                                <span className={`flex items-center gap-1.5 ${statusProps.color} font-medium`}>
                                                    <Icon className={`size-4 ${statusProps.color}`} />
                                                    {statusProps.label}
                                                </span>
                                            );
                                        })()}
                                    </td>
                                    <td className="px-6 py-4 text-end">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => setBillToEdit(bill)}
                                                className="p-2 text-neutral-500 hover:text-white bg-neutral-800/0 hover:bg-neutral-800 rounded-lg transition-colors focus:opacity-100"
                                                title={t('common.edit', 'Edit')}
                                            >
                                                <Edit2 className="size-4" />
                                            </button>
                                            <button 
                                                onClick={() => setBillToDelete(bill)}
                                                className="p-2 text-neutral-500 hover:text-red-400 bg-neutral-800/0 hover:bg-red-500/10 rounded-lg transition-colors focus:opacity-100"
                                                title={t('common.delete', 'Delete')}
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {!isLoading && (
                    <BillsPagination page={page} setPage={setPage} totalPages={totalPages} />
                )}
            </div>
        </div>
    );
};

export default BillsTableSection;
