import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import GlobalLoader from "../components/loaders/GlobalLoader";

const PublicRoute = ({ children }) => {
  const { user, authLoading } = useSelector(
    (state) => state.auth
  );

  if (authLoading) {
    return <GlobalLoader/>;
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