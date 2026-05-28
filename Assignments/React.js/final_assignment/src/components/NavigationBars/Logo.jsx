import { useTranslation } from "react-i18next";

function Logo() {
    const { t } = useTranslation();
    return (
        <div className="logo d-flex gap-2 align-items-center p-2 px-3">
            <i className="fa-solid fa-bezier-curve fs-5"></i>
            <h1 className="fs-4 lobster-font mb-0">{t("common.brandName")}</h1>
        </div>
    );
}

export default Logo;
