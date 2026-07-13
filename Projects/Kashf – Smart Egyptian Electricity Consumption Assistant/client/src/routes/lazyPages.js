import { lazy } from "react";

export const WelcomePage = lazy(() => import("../pages/user/WelcomePage"));
export const AuthPage = lazy(() => import("../pages/user/AuthPage"));
export const DashboardPage = lazy(() => import("../pages/user/DashboardPage"));
export const ProfilePage = lazy(() => import("../pages/user/ProfilePage"));
export const AboutPage = lazy(() => import("../pages/user/AboutPage"));
export const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const MyMetersPage = lazy(() => import("../pages/MyMetersPage"));
export const ConsumptionAnalyticsPage = lazy(() => import("../pages/ConsumptionAnalyticsPage"));
export const BillsPage = lazy(() => import("../pages/BillsPage"));
export const AiAdvisorPage = lazy(() => import("../pages/AiAdvisorPage"));
export const AlertsPage = lazy(() => import("../pages/AlertsPage"));
export const BillingPage = lazy(() => import("../pages/BillingPage"));
export const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
export const SimulationDashboardPage = lazy(() => import("../pages/SimulationDashboardPage"));
export const SimulationOverviewPage = lazy(() => import("../pages/SimulationOverviewPage"));
export const AdminDashboardPage = lazy(() =>
    import("../pages/admin/AdminDashboardPage")
);
export const UsersManagementPage = lazy(() =>
    import("../pages/admin/UsersManagementPage")
);
export const ScanManagementPage = lazy(() =>
    import("../pages/admin/ScanManagementPage")
);
export const TierManagementPage = lazy(() =>
    import("../pages/admin/TierManagementPage")
);
export const AiLogsPage = lazy(() => import("../pages/admin/AiLogsPage"));
export const NotificationsManagementPage = lazy(() =>
    import("../pages/admin/NotificationsManagementPage")
);
export const SystemSettingsPage = lazy(() =>
    import("../pages/admin/SystemSettingsPage")
);
