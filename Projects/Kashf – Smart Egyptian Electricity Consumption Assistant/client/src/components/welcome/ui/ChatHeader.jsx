import { useTranslation } from "react-i18next";

const ChatHeader = () => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center gap-3 px-5 py-4 border-b border-kashf-border bg-kashf-surface/80 backdrop-blur">
            <div className="w-8 h-8 rounded-full bg-kashf-blue flex items-center justify-center text-sm font-bold text-black">
                K
            </div>
            <div>
                <p className="text-neutral-100 text-sm font-semibold">Kashf AI</p>
                <p className="text-emerald-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    {t("ai.online", { defaultValue: "Online" })}
                </p>
            </div>
        </div>
    );
};

export default ChatHeader;
