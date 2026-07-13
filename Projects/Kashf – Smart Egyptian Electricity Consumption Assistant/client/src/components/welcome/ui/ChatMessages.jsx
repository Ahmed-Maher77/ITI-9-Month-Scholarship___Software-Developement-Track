import { useTranslation } from "react-i18next";

const ChatMessages = ({ messages, quickReplies }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 p-5">
            {messages.map((msg, i) => (
                <div
                    key={i}
                    className={`flex items-end gap-2 ${
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                    {msg.role === "kashf" && (
                        <div className="w-7 h-7 rounded-full bg-kashf-blue shrink-0 flex items-center justify-center text-xs font-bold text-black mb-0.5">
                            K
                        </div>
                    )}
                    <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            msg.role === "kashf"
                                ? "bg-neutral-800 border border-kashf-border text-neutral-200 rounded-bl-sm"
                                : "bg-kashf-blue/15 border border-kashf-blue/30 text-neutral-200 rounded-br-sm"
                        }`}
                        dir={msg.isRtl ? "rtl" : "ltr"}
                        style={{ textAlign: msg.isRtl ? "right" : "left" }}
                    >
                        {t(msg.textKey, { defaultValue: msg.textDefault })}
                    </div>
                </div>
            ))}

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 mt-1 justify-end" dir="rtl">
                {quickReplies.map((r) => (
                    <button
                        key={r.key}
                        className="px-3 py-1.5 rounded-full border border-kashf-border bg-neutral-800 hover:border-kashf-blue/50 hover:bg-kashf-blue/10 text-neutral-300 text-xs transition-all duration-200"
                    >
                        {t(r.key, { defaultValue: r.def })}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatMessages;
