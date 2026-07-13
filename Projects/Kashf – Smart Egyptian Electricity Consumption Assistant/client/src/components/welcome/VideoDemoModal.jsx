import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const VideoDemoModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

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

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[2000] overflow-y-auto bg-black/30 backdrop-blur-sm flex items-start justify-center p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-kashf-border bg-kashf-surface shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 end-4 z-10 rounded-full bg-neutral-900/80 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100 cursor-pointer border-none"
                    aria-label="Close demo"
                >
                    <svg
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="aspect-video w-full bg-neutral-950 flex items-center justify-center p-8">
                    <div className="text-center p-6">
                        <span className="flex size-16 items-center justify-center rounded-full bg-kashf-blue/10 border border-kashf-blue/30 text-kashf-light-blue mx-auto mb-4 animate-pulse">
                            <svg
                                className="size-8 fill-current ml-1"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                        <p className="text-lg font-semibold text-neutral-100 mb-1">
                            {t("welcome.demoPlaceholderTitle")}
                        </p>
                        <p className="text-sm text-neutral-500 max-w-sm mx-auto">
                            {t("welcome.demoPlaceholderText")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDemoModal;
