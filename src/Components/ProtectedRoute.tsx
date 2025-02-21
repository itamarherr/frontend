import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { FCP } from "../@types";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";


const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  const publicRoutes = ["/", "/about", "/login", "/register"]; 
  if (!isLoggedIn && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/" />;
  }
  return <Outlet/>;
};
export default ProtectedRoute;