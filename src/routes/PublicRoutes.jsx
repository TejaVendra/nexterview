import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoaderAuth from "../components/ui/LoaderAuth";

const PublicRoute = ({ children }) => {
  const { user, authLoading } = useSelector(
    (state) => state.auth
  );

  if (authLoading) {
    return <LoaderAuth/>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;