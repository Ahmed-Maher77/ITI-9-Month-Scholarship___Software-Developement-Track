import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronDown, Filter } from 'lucide-react';

const BillsFilter = ({ yearFilter, setYearFilter, statusFilter, setStatusFilter, setPage }) => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* Year Filter */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="size-4 text-neutral-500" />
                </div>
                <select 
                    value={yearFilter}
                    onChange={(e) => { setYearFilter(e.target.value); setPage(1); }}
                    className="bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-neutral-300 rounded-lg pl-8 pr-6 py-1.5 sm:pl-10 sm:pr-8 sm:py-2 appearance-none focus:outline-none focus:border-kashf-blue"
                >
                    <option value="all">{t('common.allYears', 'All Years')}</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="size-4 text-neutral-500" />
                </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="size-4 text-neutral-500" />
                </div>
                <select 
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    className="bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-neutral-300 rounded-lg pl-8 pr-6 py-1.5 sm:pl-10 sm:pr-8 sm:py-2 appearance-none focus:outline-none focus:border-kashf-blue"
                >
                    <option value="all">{t('common.allStatus', 'All Status')}</option>
                    <option value="paid">{t('bills.history.paid', 'Paid')}</option>
                    <option value="pending">{t('bills.history.pending', 'Pending')}</option>
                    <option value="overdue">{t('bills.history.overdue', 'Overdue')}</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="size-4 text-neutral-500" />
                </div>
            </div>
        </div>
    );
};

export default BillsFilter;
