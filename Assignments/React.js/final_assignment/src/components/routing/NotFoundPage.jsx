import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NotFoundPage.css";

function NotFoundPage() {
    const { t } = useTranslation();
    return (
        <section className="not-found-page">
            <div className="not-found-card">
                <p className="not-found-code mb-2">404</p>
                <h1 className="not-found-title mb-2">{t("notFound.title")}</h1>
                <p className="not-found-text mb-4">{t("notFound.text")}</p>

                <div className="not-found-actions">
                    <Link
                        to="/home"
                        className="not-found-link primary d-inline-flex align-items-center gap-2"
                    >
                        <i className="fa-solid fa-house"></i>
                        {t("notFound.goHome")}
                    </Link>
                    <Link
                        to="/explore"
                        className="not-found-link d-inline-flex align-items-center gap-2"
                    >
                        <i className="fa-solid fa-compass"></i>
                        {t("notFound.explorePosts")}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFoundPage;
