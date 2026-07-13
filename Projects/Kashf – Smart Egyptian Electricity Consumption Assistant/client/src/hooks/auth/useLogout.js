import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PUBLIC_REDIRECT_PATH } from "../../auth/authConstants";
import { useAuth } from "../useAuth";
import { logoutUser } from "../../services/authService";

export const useLogout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return useMutation({
        mutationFn: logoutUser,
        onSettled: () => {
            logout();
            navigate(PUBLIC_REDIRECT_PATH, { replace: true });
        },
    });
};
