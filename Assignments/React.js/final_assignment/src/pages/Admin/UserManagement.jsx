import { useTranslation } from "react-i18next";

function UserManagement() {
    const { t } = useTranslation();
    return (
        <section className="UserManagement py-4">
            <h1 className="h3 mb-2">{t("nav.userManagement")}</h1>
            <p className="text-muted mb-0">
                {t("admin.routeReady", { section: t("nav.userManagement") })}
            </p>
        </section>
    );
}

export default UserManagement;
