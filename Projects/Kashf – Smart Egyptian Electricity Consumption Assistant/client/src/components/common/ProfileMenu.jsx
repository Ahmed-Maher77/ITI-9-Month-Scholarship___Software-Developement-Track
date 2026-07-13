import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuthProfile } from "../../hooks/auth/useAuthProfile";
import { useLogout } from "../../hooks/auth/useLogout";
import { selectUser } from "../../store/auth/authSlice";
import ChevronIcon from "../icons/ChevronIcon";
import UserAvatar from "./UserAvatar";

const ProfileMenu = () => {
    const { t } = useTranslation();
    const user = useSelector(selectUser);
    useAuthProfile();
    const logoutMutation = useLogout();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const menuId = useId();

    const displayName = user?.username || t("profileMenu.fallbackName");

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event) => {
            if (!containerRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const menuItemClass =
        "flex w-full items-center px-3 py-2 text-start text-sm text-neutral-300 transition-colors hover:bg-kashf-muted hover:text-neutral-100";

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-controls={menuId}
                aria-label={t("profileMenu.ariaLabel", { name: displayName })}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-kashf-border bg-transparent p-1 pe-2 transition-colors hover:border-kashf-blue"
            >
                <UserAvatar user={user} className="size-8" />
                <ChevronIcon
                    className={`size-3.5 shrink-0 text-neutral-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div
                    id={menuId}
                    role="menu"
                    aria-label={t("profileMenu.ariaLabel", { name: displayName })}
                    className="absolute inset-e-0 top-[calc(100%+0.375rem)] z-50 min-w-44 overflow-hidden rounded-lg border border-kashf-border bg-kashf-surface py-1 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                >
                    <div className="border-b border-kashf-border px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                            <UserAvatar user={user} className="size-9" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-neutral-100">
                                    {displayName}
                                </p>
                                {user?.email && (
                                    <p className="truncate text-xs text-neutral-500">
                                        {user.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <NavLink
                        to="/profile"
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `${menuItemClass} no-underline ${
                                isActive
                                    ? "bg-kashf-muted text-kashf-light-blue"
                                    : ""
                            }`
                        }
                    >
                        {t("profileMenu.profile")}
                    </NavLink>

                    <button
                        type="button"
                        role="menuitem"
                        disabled={logoutMutation.isPending}
                        onClick={() => {
                            setIsOpen(false);
                            logoutMutation.mutate();
                        }}
                        className={`${menuItemClass} cursor-pointer border-none bg-transparent disabled:opacity-60`}
                    >
                        {logoutMutation.isPending
                            ? t("auth.logoutSubmitting")
                            : t("auth.logout")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
