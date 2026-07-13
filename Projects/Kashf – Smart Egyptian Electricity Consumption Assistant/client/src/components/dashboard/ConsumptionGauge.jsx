import React from 'react';
import { motion } from 'framer-motion';

const ConsumptionGauge = ({ hasMeters, value, unit }) => {
    return (
        <div className="w-56 mb-8 flex flex-col items-center">
            <div className="relative w-full aspect-[2/1] mb-6">
                {/* Fake SVG Gauge */}
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                    {/* Track */}
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#262626" strokeWidth="12" strokeLinecap="round" />
                    {/* Value (Amber zone) */}
                    <motion.path 
                        d="M 10 50 A 40 40 0 0 1 70 15" 
                        fill="none" 
                        stroke={hasMeters ? "#f59e0b" : "transparent"} 
                        strokeWidth="12" 
                        strokeLinecap="round" 
                        className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: hasMeters ? 1 : 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    {/* Needle */}
                    <motion.g
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: hasMeters ? 120 : 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ transformOrigin: "center", transformBox: "fill-box" }}
                    >
                        <circle cx="50" cy="50" r="50" fill="transparent" />
                        <line x1="50" y1="50" x2="18" y2="50" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" />
                    </motion.g>
                    <circle cx="50" cy="50" r="4" fill="#e5e5e5" />
                </svg>
            </div>
            
            <div className="w-full text-center">
                <p className="text-5xl font-bold text-white tracking-tight">{hasMeters ? value : "0"}</p>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mt-2">{unit}</p>
            </div>
        </div>
    );
};

export default ConsumptionGauge;
