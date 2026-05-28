import { useTranslation } from "react-i18next";

function ModerationQueue() {
    const { t } = useTranslation();
    return (
        <section className="ModerationQueue py-4">
            <h1 className="h3 mb-2">{t("nav.moderationQueue")}</h1>
            <p className="text-muted mb-0">
                {t("admin.routeReady", { section: t("nav.moderationQueue") })}
            </p>
        </section>
    );
}

export default ModerationQueue;
