import React from 'react';

const PageHeader = ({ title, subtitle, icon: Icon, children }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 mb-10">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    {Icon && <Icon className="size-5 sm:size-6 text-kashf-light-blue" />}
                    {title}
                </h1>
                {subtitle && <p className="text-neutral-400 text-xs sm:text-sm mt-2">{subtitle}</p>}
            </div>
            {children && (
                <div className="flex items-center gap-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
