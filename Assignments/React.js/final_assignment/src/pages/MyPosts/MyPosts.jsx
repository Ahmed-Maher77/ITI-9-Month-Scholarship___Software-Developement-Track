import { useTranslation } from "react-i18next";

function MyPosts() {
    const { t } = useTranslation();
    return (
        <section className="MyPosts py-4">
            <h1 className="h4 mb-2">{t("myPosts.title")}</h1>
            <p className="text-muted mb-0">{t("myPosts.empty")}</p>
        </section>
    );
}

export default MyPosts;
