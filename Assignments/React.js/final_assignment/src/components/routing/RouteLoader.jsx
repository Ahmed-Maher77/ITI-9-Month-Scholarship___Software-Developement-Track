import { useTranslation } from "react-i18next";
import "./RouteLoader.css";

function RouteLoader() {
    const { t } = useTranslation();
    return (
        <div className="route-loader-wrap" role="status" aria-live="polite">
            <span className="visually-hidden">{t("common.loading")}</span>
            <div className="loader" aria-hidden="true"></div>
        </div>
    );
}

export default RouteLoader;
