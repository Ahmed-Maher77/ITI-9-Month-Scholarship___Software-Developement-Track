import { useTranslation } from "react-i18next";

function Dashboard() {
    const { t } = useTranslation();
    return (
        <section className="Dashboard py-4">
            <h1 className="h3 mb-2">{t("nav.dashboard")}</h1>
            <p className="text-muted mb-0">
                {t("admin.routeReady", { section: t("nav.dashboard") })}
            </p>
        </section>
    );
}

export default Dashboard;
