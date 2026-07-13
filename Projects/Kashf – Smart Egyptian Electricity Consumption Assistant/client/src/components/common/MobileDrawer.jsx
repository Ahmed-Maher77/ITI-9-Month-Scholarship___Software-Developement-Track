import React, { useEffect } from 'react';
import BrandLogo from './BrandLogo';


const MobileDrawer = ({ isOpen, onClose, isRtl, children }) => {
    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close sidebar on Escape key press
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <>
            {/* Mobile Drawer Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Mobile Drawer Sidebar */}
            <aside
                className={`fixed inset-y-0 end-0 z-50 w-72 max-w-[85vw] bg-kashf-surface p-6 shadow-xl border-s border-kashf-border transition-transform duration-300 ease-out lg:hidden flex flex-col gap-6 ${
                    isOpen ? "translate-x-0" : isRtl ? "-translate-x-full" : "translate-x-full"
                }`}
                style={{ willChange: "transform" }}
            >
                <div className="flex items-center justify-between shrink-0">
                    <BrandLogo onClick={onClose} />
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1.5 text-neutral-400 hover:bg-kashf-muted hover:text-neutral-100 cursor-pointer"
                        aria-label="Close menu"
                    >
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}
            </aside>
        </>
    );
};

export default MobileDrawer;
