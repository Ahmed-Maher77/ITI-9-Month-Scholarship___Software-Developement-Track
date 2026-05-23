import "./ExpoBanner.css";
import MainButton from "../../common/MainButton/MainButton";

const expoBannerImage = "/portrait-young-african-american-man-with-vr-glasses.jpg";

const ExpoBanner = () => (
    <section className="ExpoBanner">
        <div className="expo-banner-content">
            <h2 className="expo-banner-title">Gymtex Tech Expo Meetup For All</h2>
            <MainButton type="button" className="expo-banner-btn" variant="light">
                See Details
            </MainButton>
        </div>

        <div className="expo-banner-image-box" aria-hidden="true">
            <img src={expoBannerImage} alt="" loading="eager" />
        </div>
    </section>
);

export default ExpoBanner;
