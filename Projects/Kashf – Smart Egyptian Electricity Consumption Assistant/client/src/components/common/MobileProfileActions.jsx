import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";
import { useLogout } from "../../hooks/auth/useLogout";
import UserAvatar from "./UserAvatar";

const navLinkClassMobile = ({ isActive }) =>
    `flex w-full items-center px-4 py-3 rounded-lg text-base no-underline transition-colors hover:bg-kashf-muted hover:text-kashf-light-blue ${
        isActive ? "bg-kashf-muted text-kashf-light-blue font-semibold" : "text-neutral-300"
    }`;

const MobileProfileActions = ({ setIsSidebarOpen }) => {
    const { t } = useTranslation();
    const user = useSelector(selectUser);
    const logoutMutation = useLogout();
    const displayName = user?.username || t("profileMenu.fallbackName");

    if (!user) return null;

    return (
        <div className="mt-auto border-t border-kashf-border pt-4 flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3 px-4">
                <UserAvatar user={user} className="size-10 shrink-0" />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-100">{displayName}</p>
                    {user?.email && <p className="truncate text-xs text-neutral-500">{user.email}</p>}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <NavLink
                    to="/profile"
                    onClick={() => setIsSidebarOpen(false)}
                    className={navLinkClassMobile}
                >
                    {t("profileMenu.profile")}
                </NavLink>
                <button
                    type="button"
                    disabled={logoutMutation.isPending}
                    onClick={() => {
                        setIsSidebarOpen(false);
                        logoutMutation.mutate();
                    }}
                    className="flex w-full items-center px-4 py-3 rounded-lg text-base text-red-400 hover:bg-kashf-muted transition-colors cursor-pointer border-none bg-transparent disabled:opacity-60 text-start font-semibold"
                >
                    {logoutMutation.isPending ? t("auth.logoutSubmitting", { defaultValue: "Logging out..." }) : t("auth.logout", { defaultValue: "Log Out" })}
                </button>
            </div>
        </div>
    );
};

export default MobileProfileActions;
