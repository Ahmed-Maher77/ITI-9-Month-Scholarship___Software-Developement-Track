import { useTranslation } from "react-i18next";
import "./ExpoBanner.css";
import MainButton from "../../common/MainButton/MainButton";

const expoBannerImage =
    "/portrait-young-african-american-man-with-vr-glasses.jpg";

function ExpoBanner() {
    const { t } = useTranslation();
    return (
        <section className="ExpoBanner">
            <div className="expo-banner-content">
                <h2 className="expo-banner-title">{t("explore.bannerTitle")}</h2>
                <MainButton
                    type="button"
                    className="expo-banner-btn"
                    variant="light"
                >
                    {t("explore.seeDetails")}
                </MainButton>
            </div>

            <div className="expo-banner-image-box" aria-hidden="true">
                <img src={expoBannerImage} alt="" loading="eager" />
            </div>
        </section>
    );
}

export default ExpoBanner;
