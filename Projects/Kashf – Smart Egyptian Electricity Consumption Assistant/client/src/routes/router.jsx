import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestRoute from "../auth/GuestRoute";
import ProtectedRoute from "../auth/ProtectedRoute";
import { USER_ROLES } from "../auth/authConstants";
import UserLayout from "../layouts/UserLayout";
import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import {
    WelcomePage,
    AuthPage,
    DashboardPage,
    ProfilePage,
    AboutPage,
    NotFoundPage,
    AdminDashboardPage,
    UsersManagementPage,
    ScanManagementPage,
    TierManagementPage,
    AiLogsPage,
    NotificationsManagementPage,
    SystemSettingsPage,
    MyMetersPage,
    ConsumptionAnalyticsPage,
    BillsPage,
    AiAdvisorPage,
    AlertsPage,
    BillingPage,
    CheckoutPage,
    SimulationDashboardPage,
    SimulationOverviewPage
} from "./lazyPages";

export const router = createBrowserRouter([
    {
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <WelcomePage />,
            },
            {
                path: "register",
                element: (
                    <GuestRoute>
                        <AuthPage />
                    </GuestRoute>
                ),
            },
            { path: "about", element: <AboutPage /> },
        ],
    },
    {
        element: <ProtectedRoute allowedRoles={[USER_ROLES.USER, USER_ROLES.ADMIN]} />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    { path: "dashboard", element: <DashboardPage /> },
                    { path: "meters", element: <MyMetersPage /> },
                    { path: "analytics", element: <ConsumptionAnalyticsPage /> },
                    { path: "bills", element: <BillsPage /> },
                    { path: "ai-advisor", element: <AiAdvisorPage /> },
                    { path: "alerts", element: <AlertsPage /> },
                    { path: "billing", element: <BillingPage /> },
                    { path: "checkout/:planId", element: <CheckoutPage /> },
                    { path: "profile", element: <ProfilePage /> },
                    { path: "meters/:id/simulation", element: <SimulationDashboardPage /> },
                    { path: "simulation-overview/:id", element: <SimulationOverviewPage /> },
                ],
            },
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute
                allowedRoles={[USER_ROLES.ADMIN]}
                forbiddenRedirect="/dashboard"
            />
        ),
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="dashboard" replace />,
                    },
                    { path: "dashboard", element: <AdminDashboardPage /> },
                    { path: "users", element: <UsersManagementPage /> },
                    { path: "scans", element: <ScanManagementPage /> },
                    { path: "tiers", element: <TierManagementPage /> },
                    { path: "ai-logs", element: <AiLogsPage /> },
                    {
                        path: "notifications",
                        element: <NotificationsManagementPage />,
                    },
                    { path: "settings", element: <SystemSettingsPage /> },
                ],
            },
        ],
    },
    { path: "*", element: <NotFoundPage /> },
]);
