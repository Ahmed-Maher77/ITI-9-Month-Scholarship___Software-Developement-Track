import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet-async";
import { 
    Download, 
    AlertCircle,
    Plus
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import BillModal from '../components/bills/BillModal';
import BillForecastSection from '../components/bills/BillForecastSection';
import BillsTableSection from '../components/bills/BillsTableSection';
import { fetchBills, deleteBillAsync } from '../store/bills/billsSlice';

const BillsPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [yearFilter, setYearFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [billToEdit, setBillToEdit] = useState(null);
    const [billToDelete, setBillToDelete] = useState(null);

    const { bills, totalPages, isLoading } = useSelector(state => state.bills);

    const handleDelete = async () => {
        if (billToDelete) {
            await dispatch(deleteBillAsync(billToDelete.id));
            setBillToDelete(null);
        }
    };

    const handleExportSummary = () => {
        if (!bills || bills.length === 0) return;
        
        const headers = [
            t('bills.history.invoiceNo', 'Invoice No.'),
            t('bills.history.billingMonth', 'Billing Month'),
            t('bills.history.consumption', 'Consumption'),
            t('bills.history.tier', 'Tier'),
            t('bills.history.amount', 'Amount'),
            t('bills.history.status', 'Status')
        ].join(',');

        const csvRows = bills.map(bill => {
            return [
                bill.id || '',
                bill.month || '',
                bill.consumption || 0,
                bill.tier || '',
                bill.amount || 0,
                bill.status || ''
            ].join(',');
        });

        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers + "\n" + csvRows.join('\n');
        const encodedUri = encodeURI(csvContent);
        
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Kashf_Bills_Summary_${new Date().getFullYear()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        dispatch(fetchBills({ page, limit: 5, year: yearFilter, status: statusFilter }));
    }, [dispatch, page, yearFilter, statusFilter]);


    return (
        <>
            <Helmet>
                <title>الفواتير — كشف</title>
                <meta name="description" content="إدارة فواتير الكهرباء — عرض سجل الفواتير، التوقعات، وتصدير الملخصات في كشف." />
            </Helmet>
            <div className="space-y-6 max-w-7xl mx-auto pb-10 relative">
            <BillModal 
                isOpen={isAddModalOpen || !!billToEdit} 
                onClose={() => { setIsAddModalOpen(false); setBillToEdit(null); }} 
                initialData={billToEdit}
            />

            {/* Delete Confirmation Modal */}
            {billToDelete && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-kashf-bg border border-kashf-border rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="size-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {t('bills.deleteConfirmTitle', 'Delete Bill?')}
                            </h3>
                            <p className="text-sm text-neutral-400 mb-6">
                                {t('bills.deleteConfirmDesc', 'Are you sure you want to delete this bill? This action cannot be undone.')}
                            </p>
                            <div className="flex gap-3 w-full">
                                <button 
                                    onClick={() => setBillToDelete(null)}
                                    className="flex-1 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium transition-colors"
                                >
                                    {t('common.cancel', 'Cancel')}
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors"
                                >
                                    {t('common.delete', 'Delete')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <PageHeader 
                title={t('bills.title')} 
                subtitle={t('bills.subtitle')}
            >
                <div className="flex flex-wrap items-center gap-3">
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-kashf-blue hover:bg-kashf-light-blue text-kashf-bg px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                    >
                        <Plus className="size-4" />
                        {t('bills.addBill', 'Add Bill')}
                    </button>
                    <button 
                        onClick={handleExportSummary}
                        disabled={!bills || bills.length === 0}
                        className="flex items-center gap-2 bg-kashf-surface border border-kashf-border hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                    >
                        <Download className="size-4" />
                        {t('bills.exportSummary')}
                    </button>
                </div>
            </PageHeader>

            <BillForecastSection />
            <BillsTableSection 
                bills={bills}
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                yearFilter={yearFilter}
                setYearFilter={setYearFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                setBillToEdit={setBillToEdit}
                setBillToDelete={setBillToDelete}
            />
        </div>
        </>
    );
};

export default BillsPage;
