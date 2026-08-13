import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import GlobalLoader from "../components/loaders/GlobalLoader";

function VerificationRoute() {
    const { user, authLoading } = useSelector(
        (state) => state.auth
    );

    if (authLoading) {
        return <GlobalLoader />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.emailVerified) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default VerificationRoute;