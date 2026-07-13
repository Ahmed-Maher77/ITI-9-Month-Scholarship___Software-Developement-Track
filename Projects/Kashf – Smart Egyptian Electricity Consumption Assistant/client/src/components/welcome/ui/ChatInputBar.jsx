import { useTranslation } from "react-i18next";

const ChatInputBar = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    return (
        <div className="px-4 pb-4">
            <div
                className="flex items-center gap-2 rounded-xl border border-kashf-border bg-neutral-800/60 px-4 py-2.5"
                dir={i18n.dir()}
            >
                <input
                    readOnly
                    placeholder={t("ai.inputPlaceholder", {
                        defaultValue: "اسأل كشف عن فاتورتك...",
                    })}
                    className={`flex-1 bg-transparent text-sm text-neutral-400 placeholder-neutral-600 outline-none ${
                        isRtl ? "text-right" : "text-left"
                    }`}
                />
                <button className="w-7 h-7 rounded-lg bg-kashf-blue flex items-center justify-center shrink-0">
                    <svg
                        className={`w-3.5 h-3.5 text-black transition-transform duration-200 ${
                            isRtl ? "rotate-270" : "rotate-90"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 19V5m-7 7l7-7 7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatInputBar;
