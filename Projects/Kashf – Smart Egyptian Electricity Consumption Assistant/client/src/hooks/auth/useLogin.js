import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { POST_REGISTER_REDIRECT_PATH } from "../../auth/authConstants";
import { useAuth } from "../useAuth";
import { loginUser } from "../../services/authService";

const resolvePostAuthPath = (from) => {
    if (!from || from === "/register") {
        return POST_REGISTER_REDIRECT_PATH;
    }

    return from;
};

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data?.data?.twoFactorRequired) {
                return;
            }
            const accessToken = data?.data?.accessToken;
            const role = data?.data?.user?.role ?? "user";

            if (!accessToken) {
                throw new Error("missing_token");
            }

            login({ accessToken, role, user: data?.data?.user });
            navigate(resolvePostAuthPath(location.state?.from), {
                replace: true,
            });
        },
    });
};
