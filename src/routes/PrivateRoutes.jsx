import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoaderAuth from '../components/ui/LoaderAuth'

function PrivateRoute() {
  const { user, authLoading } = useSelector(
    (state) => state.auth
  );

  if (authLoading) {
    return <LoaderAuth />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;