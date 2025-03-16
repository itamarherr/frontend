import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";



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