import { useTranslation } from "react-i18next";

function PostManagement() {
    const { t } = useTranslation();
    return (
        <section className="PostManagement py-4">
            <h1 className="h3 mb-2">{t("nav.postManagement")}</h1>
            <p className="text-muted mb-0">
                {t("admin.routeReady", { section: t("nav.postManagement") })}
            </p>
        </section>
    );
}

export default PostManagement;
