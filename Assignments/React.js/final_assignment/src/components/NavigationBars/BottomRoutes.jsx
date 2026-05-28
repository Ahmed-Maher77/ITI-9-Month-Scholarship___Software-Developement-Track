import Avatar from "../common/Avatar/Avatar";
import ListItem from "./ListItem";
import MainButton from "../common/MainButton/MainButton";
import ThemeToggleButton from "../common/ThemeToggleButton/ThemeToggleButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { clearStoredAuth } from "../../utils/authStorage";
import { toast } from "react-toastify";
import {
    selectAuth,
    selectIsLoggedIn,
    selectRole,
} from "../../store/authSlice";
import { selectIsSidebarCollapsed } from "../../store/uiSlice";
import LanguageSwitcher from "../common/LanguageSwitcher/LanguageSwitcher";

const BottomRoutes = ({ onNavigate }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const auth = useSelector(selectAuth);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const role = useSelector(selectRole);
    const isCollapsed = useSelector(selectIsSidebarCollapsed);
    const username = auth?.name || t("profile.fallbackUser");
    const userPic = auth?.userPic || null;

    const handleLogout = () => {
        onNavigate?.();
        clearStoredAuth();
        toast.success(t("auth.loggedOutSuccess"));
        setTimeout(() => {
            navigate("/login", { replace: true });
        }, 700);
    };

    return (
        <div className="bottom d-flex flex-column gap-2">
            <div
                className={`theme-sidebar-row ${isCollapsed ? "is-collapsed" : ""}`}
            >
                <ThemeToggleButton
                    variant="switch"
                    compact={isCollapsed}
                    label=""
                />
            </div>
            <div
                className={`theme-sidebar-row ${isCollapsed ? "is-collapsed" : ""}`}
            >
                <LanguageSwitcher compact={isCollapsed} />
            </div>
            {isLoggedIn ? (
                <>
                    {role !== "admin" ? (
                        <ListItem
                            href="/profile"
                            label={t("nav.profile")}
                            justifyBetween={true}
                            isCollapsed={isCollapsed}
                            itemClassName="profile-item"
                            onClick={onNavigate}
                        >
                            <figure className="mb-0 d-flex align-items-center gap-2 justify-content-between">
                                {userPic ? (
                                    <Avatar
                                        src={userPic}
                                        size={35}
                                        alt={`${username}'s picture`}
                                    />
                                ) : (
                                    <Avatar username={username} size={35} />
                                )}
                            </figure>
                        </ListItem>
                    ) : null}
                    <ListItem
                        label={t("nav.logout")}
                        justifyBetween={true}
                        itemClassName="logout-item"
                        isCollapsed={isCollapsed}
                        onClick={handleLogout}
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </ListItem>
                </>
            ) : (
                <MainButton
                    type="button"
                    className={`login-main-btn${isCollapsed ? " is-collapsed" : ""}`}
                    fullWidth={!isCollapsed}
                    onClick={() => {
                        onNavigate?.();
                        navigate("/login");
                    }}
                >
                    {isCollapsed ? (
                        <i className="fa-solid fa-right-to-bracket"></i>
                    ) : (
                        <div className="d-flex align-items-center gap-2 justify-content-center">
                            <span>{t("nav.login")}</span>
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </div>
                    )}
                </MainButton>
            )}
        </div>
    );
};

export default BottomRoutes;
