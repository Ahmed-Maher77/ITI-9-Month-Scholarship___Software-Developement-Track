import "./PricingSection.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants as itemVariants, containerVariants } from "../../utils/animations";
import {
    Zap,
    Check,
    Star,
    Layers,
    BarChart2,
    Bell,
    TrendingUp,
    Users,
    ShieldCheck,
    History,
    Headphones,
    ScanLine,
    ActivitySquare,
    LayoutDashboard,
    CalendarDays,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const plans = [
    {
        key: "free",
        price: null,
        accentClass: "plan-accent--free",
        badgeKey: null,
        Icon: Layers,
        features: [
            { key: "feat.oneMeter", def: "1 electricity meter", Icon: Layers },
            { key: "feat.freeCoins", def: "50 Coins per month", Icon: Zap },
            { key: "feat.meterScan", def: "Meter scanning", Icon: ScanLine },
            {
                key: "feat.consumTrack",
                def: "Consumption tracking",
                Icon: ActivitySquare,
            },
            { key: "feat.sheriha", def: "Sheriha monitoring", Icon: Bell },
            {
                key: "feat.dashboard",
                def: "Basic dashboard",
                Icon: LayoutDashboard,
            },
            { key: "feat.history", def: "Monthly history", Icon: CalendarDays },
        ],
        ctaKey: "pricing.cta.free",
        ctaDef: "Get Started",
        featured: false,
    },
    {
        key: "plus",
        price: 49,
        accentClass: "plan-accent--plus",
        badgeKey: "pricing.badge.popular",
        badgeDef: "Most Popular",
        Icon: Zap,
        features: [
            { key: "feat.twoMeters", def: "Up to 2 electricity meters", Icon: Layers },
            { key: "feat.plusCoins", def: "150 Coins per month", Icon: Zap },
            {
                key: "feat.everythingFree",
                def: "Everything in Free",
                Icon: Check,
            },
            {
                key: "feat.aiRecs",
                def: "AI-powered recommendations",
                Icon: Star,
            },
            {
                key: "feat.billForecast",
                def: "Bill forecasting",
                Icon: TrendingUp,
            },
            {
                key: "feat.earlyAlerts",
                def: "Early Sheriha alerts",
                Icon: Bell,
            },
            {
                key: "feat.analytics",
                def: "Advanced analytics",
                Icon: BarChart2,
            },
            { key: "feat.push", def: "Push notifications", Icon: Bell },
            { key: "feat.pwa", def: "Installable PWA", Icon: Layers },
        ],
        ctaKey: "pricing.cta.plus",
        ctaDef: "Start Free Trial",
        featured: true,
    },
    {
        key: "family",
        price: 99,
        accentClass: "plan-accent--family",
        badgeKey: null,
        Icon: Users,
        features: [
            { key: "feat.fiveMeters", def: "Up to 5 electricity meters", Icon: Layers },
            { key: "feat.familyCoins", def: "300 Coins per month", Icon: Zap },
            {
                key: "feat.everythingPlus",
                def: "Everything in Plus",
                Icon: Check,
            },
            {
                key: "feat.familyReports",
                def: "Family usage reports",
                Icon: BarChart2,
            },
            { key: "feat.sharedAccess", def: "Shared access", Icon: Users },
            {
                key: "feat.extHistory",
                def: "Extended consumption history",
                Icon: History,
            },
            {
                key: "feat.prioritySupport",
                def: "Priority support",
                Icon: Headphones,
            },
        ],
        ctaKey: "pricing.cta.family",
        ctaDef: "Choose Family",
        featured: false,
    },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
const FeatureItem = ({ Icon, label }) => (
    <li className="feature-item">
        <span className="feature-icon-wrap" aria-hidden="true">
            <Icon className="feature-icon" />
        </span>
        <span className="feature-label">{label}</span>
    </li>
);

const PlanCard = ({ plan, t }) => {
    const {
        key,
        price,
        Icon,
        features,
        ctaKey,
        ctaDef,
        badgeKey,
        badgeDef,
        featured,
        accentClass,
    } = plan;
    const titleKey = `pricing.plan.${key}.title`;
    const descKey = `pricing.plan.${key}.desc`;
    const titleDefs = { free: "Free", plus: "Plus", family: "Family" };
    const descDefs = {
        free: "Perfect for getting started",
        plus: "For households that want complete control",
        family: "For multiple properties and households",
    };

    const user = useSelector(selectUser);
    const navigate = useNavigate();
    
    const currentPlan = user?.subscriptionPlan || 'free';
    const isCurrent = user && currentPlan === key;
    const canChoose = !user || (key !== 'free' && (currentPlan === 'free' || (currentPlan === 'plus' && key === 'family')));
    const isDisabled = user && (isCurrent || !canChoose);

    const handleCtaClick = () => {
        if (!user) {
            navigate("/register", { state: { from: `/checkout/${key}` } });
        } else if (canChoose) {
            navigate(`/checkout/${key}`);
        }
    };

    return (
        <motion.div
            variants={plan.variants}
            className={`plan-card ${featured ? "plan-card--featured" : ""} ${accentClass}`}
        >
            {featured && (
                <div className="plan-badge-wrap">
                    <span className="plan-badge">
                        <Star className="plan-badge-icon" aria-hidden="true" />
                        {t(badgeKey, { defaultValue: badgeDef })}
                    </span>
                </div>
            )}

            <div className="plan-header">
                <span className="plan-icon-wrap" aria-hidden="true">
                    <Icon className="plan-icon" />
                </span>
                <div>
                    <h3 className="plan-title">
                        {t(titleKey, { defaultValue: titleDefs[key] })}
                    </h3>
                    <p className="plan-desc">
                        {t(descKey, { defaultValue: descDefs[key] })}
                    </p>
                </div>
            </div>

            <div className="plan-price">
                {price ? (
                    <>
                        <span className="price-currency">EGP</span>
                        <span className="price-amount">{price}</span>
                        <span className="price-period">
                            /{t("pricing.month", { defaultValue: "month" })}
                        </span>
                    </>
                ) : (
                    <span className="price-free">
                        {t("pricing.free", { defaultValue: "Free" })}
                    </span>
                )}
            </div>

            <ul className="feature-list">
                {features.map((f) => (
                    <FeatureItem
                        key={f.key}
                        Icon={f.Icon}
                        label={t(f.key, { defaultValue: f.def })}
                    />
                ))}
            </ul>

             <div className="plan-cta-wrap">
                <button
                    onClick={handleCtaClick}
                    disabled={isDisabled}
                    className={`plan-cta ${featured ? "plan-cta--featured" : ""} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    {isCurrent 
                        ? t("billing.currentPlanBtn", { defaultValue: "Current Plan" }) 
                        : t(ctaKey, { defaultValue: ctaDef })}
                </button>
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
const PricingSection = () => {
    const { t } = useTranslation();

    return (
        <motion.section 
            className="pricing-section" 
            id="pricing"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
        >
            <motion.div variants={itemVariants} className="pricing-header px-4 sm:px-6">
                <span className="pricing-eyebrow">
                    <Zap />
                    {t("pricing.eyebrow", { defaultValue: "Simple Pricing" })}
                </span>
                <h2 className="pricing-headline">
                    {t("pricing.headline", {
                        defaultValue: "Start Saving on Your",
                    })}{" "}
                    <span>
                        {t("pricing.headlineAccent", {
                            defaultValue: "Electricity Bill Today",
                        })}
                    </span>
                </h2>
                <p className="pricing-subline">
                    {t("pricing.subline", {
                        defaultValue:
                            "Everything you need to monitor consumption, avoid costly Sheriha jumps, and receive AI-powered recommendations.",
                    })}
                </p>
            </motion.div>

            <div className="pricing-grid px-4 sm:px-6">
                {plans.map((plan) => (
                    <PlanCard key={plan.key} plan={{...plan, variants: itemVariants}} t={t} />
                ))}
            </div>

            <motion.p variants={itemVariants} className="pricing-footnote px-4 sm:px-6">
                {t("pricing.footnote", {
                    defaultValue: "No credit card required · Cancel anytime ·",
                })}{" "}
                <NavLink to="/about#about-faq" className="pricing-faq-link">
                    {t("pricing.faqLink", { defaultValue: "Read the FAQ" })}
                </NavLink>
            </motion.p>
        </motion.section>
    );
};

export default PricingSection;
