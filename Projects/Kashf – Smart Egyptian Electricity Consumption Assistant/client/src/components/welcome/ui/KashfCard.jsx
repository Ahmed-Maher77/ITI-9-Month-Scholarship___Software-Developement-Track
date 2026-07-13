import React from "react";

/**
 * Reusable card container component with common Kashf styles,
 * hover translations, border glows, and top-line accents.
 */
const KashfCard = ({ children, className = "", onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`relative group flex flex-col rounded-2xl border border-neutral-800 bg-[#0d0d12] p-6 transition-all duration-500 ease-out hover:border-kashf-blue/40 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)] h-full ${
                onClick ? "cursor-pointer" : ""
            } ${className}`}
        >
            {/* Hover glow blob */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-kashf-blue/8 via-kashf-light-blue/5 to-emerald-400/5"
            />
            {/* Top line accent */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-kashf-blue/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Content container */}
            <div className="relative z-10 flex flex-col h-full">
                {children}
            </div>
        </div>
    );
};

export default KashfCard;
