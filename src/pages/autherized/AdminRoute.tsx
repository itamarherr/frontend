import { AuthContext } from "../../contexts/AuthContext"
import { useContext } from "react";
import { Navigate, Navigation, Outlet } from "react-router-dom";
const AdminRoute = () =>{
    const {isLoggedIn, role} = useContext(AuthContext);
    if(!isLoggedIn  || role !== "admin")
{
    return <Navigate to="/"/>;
}
return  <Outlet/>
}
export default AdminRoute;  