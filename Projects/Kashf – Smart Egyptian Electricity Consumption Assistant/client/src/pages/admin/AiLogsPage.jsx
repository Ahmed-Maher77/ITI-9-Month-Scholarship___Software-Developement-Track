import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import PagePlaceholder from "../../components/PagePlaceholder/PagePlaceholder";

const AiLogsPage = () => {
    const { t } = useTranslation();
    return (
        <>
            <Helmet>
                <title>{t("adminHelmet.aiLogs.title")}</title>
                <meta name="description" content={t("adminHelmet.aiLogs.description")} />
            </Helmet>
            <PagePlaceholder pageKey="aiLogs" route="/admin/ai-logs" />
        </>
    );
};

export default AiLogsPage;
