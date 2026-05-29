import { lazy } from "react";

export const LoginPage = lazy(() => import("../pages/Login/Login"));
export const HomePage = lazy(() => import("../pages/Home/Home"));
export const CreatePostPage = lazy(
    () => import("../pages/CreatePost/CreatePost"),
);
export const MyPostsPage = lazy(() => import("../pages/MyPosts/MyPosts"));
export const ProfilePage = lazy(() => import("../pages/Profile/Profile"));
export const PostDetailsPage = lazy(() => import("../pages/PostDetails/PostDetails"));
export const ExplorePage = lazy(() => import("../pages/Explore/Explore"));
export const DashboardPage = lazy(() => import("../pages/Admin/Dashboard"));
export const UserManagementPage = lazy(
    () => import("../pages/Admin/UserManagement"),
);
export const PostManagementPage = lazy(
    () => import("../pages/Admin/PostManagement"),
);
export const ModerationQueuePage = lazy(
    () => import("../pages/Admin/ModerationQueue"),
);

export const USER_ROUTES = [
    { path: "/home", Component: HomePage },
    { path: "/create-post", Component: CreatePostPage },
    { path: "/my-posts", Component: MyPostsPage },
    { path: "/profile", Component: ProfilePage },
    { path: "/posts/:postId", Component: PostDetailsPage },
    { path: "/explore", Component: ExplorePage },
];

export const ADMIN_ROUTES = [
    { path: "/admin/dashboard", Component: DashboardPage },
    { path: "/admin/user-management", Component: UserManagementPage },
    { path: "/admin/post-management", Component: PostManagementPage },
    { path: "/admin/moderation-queue", Component: ModerationQueuePage },
];
