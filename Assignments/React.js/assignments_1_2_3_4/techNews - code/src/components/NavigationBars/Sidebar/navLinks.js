const navLinks = [
    {
        adminRoutes: [
            {
                name: "Dashboard",
                target: "/admin/dashboard",
                icon: "fa-regular fa-house",
                top: true,
            },
            {
                name: "User Management",
                target: "/admin/user-management",
                icon: "fa-regular fa-user",
            },
            {
                name: "Post Management",
                target: "/admin/post-management",
                icon: "fa-regular fa-newspaper",
            },
            {
                name: "Moderation Queue",
                target: "/admin/moderation-queue",
                icon: "fa-regular fa-flag",
            },
        ],
        userRoutes: [
            { name: "Home Feed", target: "/home", icon: "fa-regular fa-house" },
            {
                name: "Explore",
                target: "/explore",
                icon: "fa-regular fa-compass",
            },
            {
                name: "My Posts",
                target: "/my-posts",
                icon: "fa-regular fa-file-lines",
            },
            {
                name: "Create Post",
                target: "/create-post",
                icon: "fa-solid fa-plus",
            },
        ],
    },
];

export default navLinks;