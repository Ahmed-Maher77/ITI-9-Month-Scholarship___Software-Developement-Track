import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../services/authService";
import {
    selectIsAuthenticated,
    setUser,
} from "../../store/auth/authSlice";

export const useAuthProfile = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const query = useQuery({
        queryKey: ["auth", "me"],
        queryFn: fetchCurrentUser,
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000,
        select: (response) => response?.data?.user ?? null,
    });

    useEffect(() => {
        if (query.data) {
            dispatch(setUser(query.data));
        }
    }, [query.data, dispatch]);

    return query;
};
