const navLinks = [
    {
        adminRoutes: [
            {
                labelKey: "nav.dashboard",
                target: "/admin/dashboard",
                icon: "fa-regular fa-house",
                top: true,
            },
            {
                labelKey: "nav.userManagement",
                target: "/admin/user-management",
                icon: "fa-regular fa-user",
            },
            {
                labelKey: "nav.postManagement",
                target: "/admin/post-management",
                icon: "fa-regular fa-newspaper",
            },
            {
                labelKey: "nav.moderationQueue",
                target: "/admin/moderation-queue",
                icon: "fa-regular fa-flag",
            },
        ],
        userRoutes: [
            {
                labelKey: "nav.homeFeed",
                target: "/home",
                icon: "fa-regular fa-house",
            },
            {
                labelKey: "nav.explore",
                target: "/explore",
                icon: "fa-regular fa-compass",
            },
            {
                labelKey: "nav.myPosts",
                target: "/my-posts",
                icon: "fa-regular fa-file-lines",
            },
            {
                labelKey: "nav.createPost",
                target: "/create-post",
                icon: "fa-solid fa-plus",
            },
        ],
    },
];

export default navLinks;
