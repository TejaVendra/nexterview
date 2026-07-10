import axiosInstance from "../axios/axiosInstance";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
   
    const user = useSelector(state => state.auth.user);
    console.log(user + " in ")


    if (!user) return <Navigate to="/login" />;
 
  return children;
}

export default PrivateRoute;