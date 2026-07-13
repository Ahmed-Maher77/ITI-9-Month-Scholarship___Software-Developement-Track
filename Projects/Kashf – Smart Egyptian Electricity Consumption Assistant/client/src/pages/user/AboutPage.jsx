import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AboutHero   from "../../components/about/AboutHero";
import AboutStory  from "../../components/about/AboutStory";
import AboutValues from "../../components/about/AboutValues";
import AboutTeam   from "../../components/about/AboutTeam";
import AboutFAQ    from "../../components/about/AboutFAQ";
import AboutCTA    from "../../components/about/AboutCTA";
import ScrollSection from "../../components/common/ScrollSection";

const AboutPage = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) return;

        const target = document.querySelector(location.hash);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [location.hash]);

    return (
        <>
            <Helmet>
                <title>عن كشف — Kashf</title>
                <meta name="description" content="تعرف على فريق كشف وقصتنا وقيمنا. مهمتنا هي مساعدة الأسر المصرية على إدارة استهلاك الكهرباء بذكاء." />
            </Helmet>
            <div className="min-h-screen bg-kashf-bg text-neutral-100">
            <AboutHero />
            <ScrollSection><AboutStory /></ScrollSection>
            <ScrollSection><AboutValues /></ScrollSection>
            <ScrollSection><AboutTeam /></ScrollSection>
            <ScrollSection><AboutFAQ /></ScrollSection>
            <ScrollSection><AboutCTA /></ScrollSection>
        </div>
        </>
    );
};

export default AboutPage;
