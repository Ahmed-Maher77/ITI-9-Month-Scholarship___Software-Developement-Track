import { useTranslation } from "react-i18next";

const SocialProof = () => {
    const { t } = useTranslation();

    const avatars = [
        {
            initial: "A",
            classes: "border-orange-500/30 bg-orange-950/20 text-orange-500",
        },
        {
            initial: "M",
            classes: "border-cyan-500/30 bg-cyan-950/20 text-cyan-400",
        },
        {
            initial: "F",
            classes: "border-emerald-500/30 bg-emerald-950/20 text-emerald-400",
        },
        {
            initial: "S",
            classes: "border-yellow-500/30 bg-yellow-950/20 text-yellow-500",
        },
    ];

    return (
        <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
            <ul
                className="flex -space-x-2.5 rtl:-space-x-2.5 m-0 p-0 list-none"
                aria-hidden="true"
            >
                {avatars.map((avatar, idx) => (
                    <li key={idx} className="inline-block">
                        <span className="inline-flex rounded-full p-0.5 bg-kashf-surface">
                            <span
                                className={`flex size-9 items-center justify-center rounded-full border ${avatar.classes} text-xs font-bold shadow-sm`}
                                aria-label={`User ${avatar.initial}`}
                            >
                                {avatar.initial}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
            <div className="text-start leading-tight">
                <p className="m-0 text-sm font-bold ltr:font-semibold text-neutral-100">
                    {t("welcome.socialProofPrimary")}
                </p>
                <p className="m-0 text-xs text-neutral-500">
                    {t("welcome.socialProofSecondary")}
                </p>
            </div>
        </div>
    );
};

export default SocialProof;
