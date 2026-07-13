import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../../services/authService";
import { setUser } from "../../store/auth/authSlice";

export const useUpdateProfilePicture = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfilePicture,
        onSuccess: (data) => {
            const user = data?.data?.user;

            if (user) {
                dispatch(setUser(user));
                queryClient.setQueryData(["auth", "me"], data);
            }
        },
    });
};
