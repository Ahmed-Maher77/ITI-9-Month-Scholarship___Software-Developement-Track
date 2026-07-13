import React from 'react';
import { useTranslation } from 'react-i18next';

const BillsPagination = ({ page, setPage, totalPages }) => {
    const { t } = useTranslation();

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-6 py-4 border-t border-kashf-border bg-neutral-900/50">
            <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800/50 hover:bg-neutral-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {t('common.previous', 'Previous')}
            </button>
            <span className="text-sm text-neutral-400">
                {t('common.pageOf', { current: page, total: totalPages, defaultValue: `Page ${page} of ${totalPages}` })}
            </span>
            <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800/50 hover:bg-neutral-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {t('common.next', 'Next')}
            </button>
        </div>
    );
};

export default BillsPagination;
