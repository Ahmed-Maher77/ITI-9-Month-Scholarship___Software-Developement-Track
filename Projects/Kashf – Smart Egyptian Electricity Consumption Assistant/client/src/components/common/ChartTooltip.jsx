import React from 'react';

const ChartTooltip = ({ active, payload, label, unit }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl shadow-2xl pointer-events-none">
                {label && <p className="text-neutral-400 text-xs mb-1">{label}</p>}
                <p className="text-white font-bold flex items-baseline gap-1 rtl:justify-end" dir="ltr">
                    {payload[0].value} {unit && <span className="text-xs text-neutral-500 font-normal">{unit}</span>}
                </p>
            </div>
        );
    }
    return null;
};

export default ChartTooltip;
