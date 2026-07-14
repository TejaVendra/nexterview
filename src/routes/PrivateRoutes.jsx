import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoaderAuth from "../components/ui/LoaderAuth.jsx";
const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useSelector(
    (state) => state.auth
  );

  if (authLoading) {
    return <LoaderAuth/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;