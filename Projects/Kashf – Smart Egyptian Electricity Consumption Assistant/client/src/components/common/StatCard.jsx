import React from 'react';

const StatCard = ({ title, value, unit, icon: Icon, color = "text-kashf-light-blue", trend, trendColor, subtext }) => {
    return (
        <div className="bg-kashf-surface border border-kashf-border p-5 rounded-2xl hover:border-neutral-700 transition-colors flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-neutral-400">{title}</h3>
                <div className={`p-1 ${color} shrink-0`}>
                    {Icon && <Icon className="size-4" />}
                </div>
            </div>
            <div className="flex flex-col mt-auto">
                <span className="text-2xl font-bold text-white leading-tight">{value}</span>
                {unit && <span className="text-sm text-neutral-500 mt-1">{unit}</span>}
            </div>
            {(trend || subtext) && (
                <p className={`text-[10px] mt-2 ${trendColor || 'text-neutral-500'}`}>
                    {trend || subtext}
                </p>
            )}
        </div>
    );
};

export default StatCard;
