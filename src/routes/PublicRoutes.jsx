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

  if(!user){
    return children;
  }

 if (!user?.emailVerified) {
    return <Navigate to="/verification" replace />;
}
  return <Navigate to="/dashboard" replace />;
};

export default PublicRoute;