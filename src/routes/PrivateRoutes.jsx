import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import GlobalLoader from "../components/loaders/GlobalLoader";

function PrivateRoute() {
    const { user, authLoading } = useSelector(
        (state) => state.auth
    );

    if (authLoading) {
        return <GlobalLoader />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

     if (!user.emailVerified && user.provider !== "google") {
            return <Navigate to="/verification" replace />;
        }

    return <Outlet />;
}

export default PrivateRoute;