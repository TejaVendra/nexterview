import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoaderAuth from "../components/ui/LoaderAuth";

function VerifiedRoutes() {
  const { user, authLoading } = useSelector((state) => state.auth);

  if (authLoading) {
    return <LoaderAuth />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.emailVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default VerifiedRoutes;