import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { fetchMeters } from "../../store/meters/metersSlice";
import ProfileHeader from "../../components/profile/ProfileHeader";
import AccountOverview from "../../components/profile/AccountOverview";
import PersonalInformation from "../../components/profile/PersonalInformation";
import ConnectedMeters from "../../components/profile/ConnectedMeters";
import NotificationPreferences from "../../components/profile/NotificationPreferences";
import AIAssistantPreferences from "../../components/profile/AIAssistantPreferences";
import ConsumptionGoals from "../../components/profile/ConsumptionGoals";
import SecuritySettings from "../../components/profile/SecuritySettings";
import ActivityHistory from "../../components/profile/ActivityHistory";
import PWAStatus from "../../components/profile/PWAStatus";
import Subscription from "../../components/profile/Subscription";
import Tabs from "../../components/premium/Tabs";

const ProfilePage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        dispatch(fetchMeters());
    }, [dispatch]);

    const tabs = [
        { id: "overview", label: t("profile.tabs.overview") },
        { id: "meters", label: t("profile.tabs.meters") },
        { id: "preferences", label: t("profile.tabs.preferences") },
        { id: "security", label: t("profile.tabs.security") },
        { id: "subscription", label: t("profile.tabs.subscription") },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <div className="space-y-6">
                        <AccountOverview />
                        <div className="border-t border-kashf-border/50" />
                        <ConsumptionGoals />
                        <div className="border-t border-kashf-border/50" />
                        <ActivityHistory />
                    </div>
                );
            case "meters":
                return (
                    <div className="space-y-6">
                        <ConnectedMeters />
                    </div>
                );
            case "preferences":
                return (
                    <div className="space-y-6">
                        <PersonalInformation />
                        <div className="border-t border-kashf-border/50" />
                        <NotificationPreferences />
                        <div className="border-t border-kashf-border/50" />
                        {/* <AIAssistantPreferences /> */}
                        <div className="border-t border-kashf-border/50" />
                        <PWAStatus />
                    </div>
                );
            case "security":
                return (
                    <div className="space-y-6">
                        <SecuritySettings />
                    </div>
                );
            case "subscription":
                return (
                    <div className="space-y-6">
                        <Subscription />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Helmet>
                <title>الملف الشخصي — كشف</title>
                <meta name="description" content="إدارة ملفك الشخصي، العدادت المتصلة، الإعدادات، والأمان في كشف." />
            </Helmet>
            <main className="w-full mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
            <ProfileHeader />
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-6 min-h-[60vh]">
                {renderTabContent()}
            </div>
        </main>
        </>
    );
};

export default ProfilePage;
