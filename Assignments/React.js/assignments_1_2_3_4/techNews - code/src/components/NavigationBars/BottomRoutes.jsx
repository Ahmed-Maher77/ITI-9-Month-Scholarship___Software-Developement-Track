import Avatar from "../common/Avatar/Avatar";
import ListItem from "./ListItem";
import MainButton from "../common/MainButton/MainButton";
import { useNavigate } from "react-router-dom";
import { clearStoredAuth } from "../../utils/authStorage";
import { toast } from "react-toastify";

const BottomRoutes = ({ username, userPic, isCollapsed, isLoggedIn, role, onNavigate }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        onNavigate?.();
        clearStoredAuth();
        toast.success("Logged out successfully.");
        setTimeout(() => {
            navigate("/login", { replace: true });
        }, 700);
    };

    return (
        <div className="bottom d-flex flex-column gap-2">
            {isLoggedIn ? (
                <>
                    {role !== "admin" ? (
                        <ListItem
                            href="/profile"
                            label="Profile"
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
                        label="Logout"
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
                            <span>Login</span>
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </div>
                    )}
                </MainButton>
            )}
        </div>
    );
};

export default BottomRoutes;
