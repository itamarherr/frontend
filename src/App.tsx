import { Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Register from "./pages/autherized/Register";
import Login from "./pages/autherized/Login";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import "./App.css";
// import EcoConsultancyForm from "./routes/forms/EcoConsultancyForm";
import OakConsultancyForm from "./pages/forms/OakConsultancyForm";
// import EcoSurveyForm from "./routes/forms/EcoSurveyForm";
// import ForestSurveyForm from "./routes/forms/ForestSurveyForm";
import OrdersList from "./pages/orders/OrdersList";
import MyOrderPage from "./pages/orders/MyOrderPage";
import UpdateOrderForm from "./pages/forms/UpdateOrderForm";
import UsersList from "./pages/users/UsersList";
import UserSettingsPage from "./pages/users/UserSettingsPage";
import AdminUserProfilePage from "./pages/users/AdminUserProfilePage";
import UserProfilePage from "./pages/users/UserProfilePage";
import AdminOrderDetailsPage from "./pages/orders/AdminOrderDetailsPage";
import NotFound from "./pages/errorHandling/NotFound";
import UnauthorizedPage from "./pages/errorHandling/UnauthorizedPage";
import AdminRoute from "./pages/autherized/AdminRoute";
import ProtectedRoute from "./pages/autherized/ProtectedRoute";

const App = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const mode = import.meta.env.VITE_MODE;
  console.log(url);

  return (
    <div className=" flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/MyOrderPage" element={<MyOrderPage />} />
            <Route path="/UserSettingsPage" element={<UserSettingsPage />} />
            <Route path="/Profile" element={<UserProfilePage />} />
            <Route
              path="/OakConsultancyForm"
              element={<OakConsultancyForm />}
            />
            <Route path="/my-orders/for-update" element={<UpdateOrderForm />} />
            <Route path="/Orders/:id" element={<UpdateOrderForm />} />
            <Route
              path="/edit-order/:orderId"
              element={<OakConsultancyForm />}
            />
          </Route>
          <Route element={<AdminRoute />}>
            <Route
              path="/AdminUserProfilePage/:id"
              element={<AdminUserProfilePage />}
            />
            <Route
              path="/AdminOrderDetailsPage/:id"
              element={<AdminOrderDetailsPage />}
            />
            <Route path="/OrdersList" element={<OrdersList />} />
            <Route path="/UsersList" element={<UsersList />} />
          </Route>
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
export default App;
