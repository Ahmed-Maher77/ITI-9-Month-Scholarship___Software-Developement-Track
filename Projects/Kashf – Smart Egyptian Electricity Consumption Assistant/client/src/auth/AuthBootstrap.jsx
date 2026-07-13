import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshSession } from "../store/auth/authSlice";
import { ensureClientSession } from "./sessionCoordinator";

const AuthBootstrap = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshSession());
        ensureClientSession();
    }, [dispatch]);

    return children;
};

export default AuthBootstrap;
