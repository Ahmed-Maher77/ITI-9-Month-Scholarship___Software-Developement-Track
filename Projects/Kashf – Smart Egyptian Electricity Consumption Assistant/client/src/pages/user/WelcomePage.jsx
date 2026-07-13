import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import HeroSection from "../../components/welcome/HeroSection";
import StatsSection from "../../components/welcome/StatsSection";
import TestimonialsSection from "../../components/welcome/TestimonialsSection";
import MeterSection from "../../components/welcome/MeterSection";
import FeaturesSection from "../../components/welcome/FeaturesSection";
import HowItWorksSection from "../../components/welcome/HowItWorksSection";
import PricingSection from "../../components/welcome/PricingSection";
import TheProblemSection from "../../components/welcome/ProblemSection";
import AIAssistantSection from "../../components/welcome/AIAssistantSection";
import PWASection from "../../components/welcome/PWASection";
import CTASection from "../../components/welcome/CTASection";
import ScrollSection from "../../components/common/ScrollSection";

const WelcomePage = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) {
            return;
        }

        const target = document.querySelector(location.hash);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [location.hash]);

    return (
        <>
            <Helmet>
                <title>كشف — AI-Powered Electricity Management for Egyptian Households</title>
                <meta name="description" content="Monitor electricity consumption, avoid costly Sheriha tier jumps, and get personalized energy-saving recommendations with Kashf's AI-powered platform." />
            </Helmet>
            <main className="py-10 pb-16">
            <HeroSection />
            <ScrollSection delay={0.1}><StatsSection /></ScrollSection>
            <MeterSection />
            <FeaturesSection />
            <TheProblemSection />
            <HowItWorksSection />
            <AIAssistantSection />
            <PWASection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
        </main>
        </>
    );
};

export default WelcomePage;
