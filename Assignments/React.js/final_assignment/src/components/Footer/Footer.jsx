import Logo from "../NavigationBars/Logo";
import "./Footer.css";
import MainButton from "../common/MainButton/MainButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="AppFooter mt-5 pt-5">
            <div className="footer-main">
                <div className="footer-column">
                    <div className="footer-logo-wrap">
                        <Logo />
                    </div>
                    <p className="footer-description">
                        {t("footer.description")}
                    </p>
                    <nav className="footer-links" aria-label="Footer links">
                        <Link to="/home">{t("nav.homeFeed")}</Link>
                        <Link to="/explore">{t("nav.explore")}</Link>
                        <Link to="/my-posts">{t("nav.myPosts")}</Link>
                    </nav>
                </div>

                <div className="footer-column footer-newsletter">
                    <h3 className="">{t("footer.newsletter")}</h3>
                    <p>{t("footer.newsletterHint")}</p>
                    <form className="newsletter-form">
                        <input
                            type="email"
                            placeholder={t("footer.newsletterPlaceholder")}
                        />
                        <MainButton
                            type="submit"
                            className="footer-subscribe-btn"
                        >
                            {t("footer.subscribe")}
                        </MainButton>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                © {currentYear} {t("footer.allRightsReserved")}
            </div>
        </footer>
    );
};

export default Footer;
