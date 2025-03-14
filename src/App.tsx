import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./routes/Home";
import About from "./routes/About";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Products from "./routes/Products";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./App.css";
import OakConsultancyPage from "./routes/OakConsultancyPage";
// import EcoConsultancyForm from "./routes/forms/EcoConsultancyForm";
import OakConsultancyForm from "./routes/forms/OakConsultancyForm";
// import EcoSurveyForm from "./routes/forms/EcoSurveyForm";
// import ForestSurveyForm from "./routes/forms/ForestSurveyForm";
import OrdersList from "./routes/OrdersList";
import MyOrderPage from "./routes/MyOrderPage";
import UpdateOrderForm from "./routes/forms/UpdateOrderForm";
import UsersList from "./routes/UsersList";
import UserRegistrationFormFields from "./routes/forms/UserRegistrationFormFields";
import UserSettingsPage from "./routes/UserSettingsPage";
import AdminUserProfilePage from "./routes/AdminUserProfilePage";
import UserProfilePage from "./routes/UserProfilePage";
import AdminOrderDetailsPage from "./routes/AdminOrderDetailsPage";
import AdminRoute from "./routes/AdminRoute";
import NotFound from "./routes/NotFound";
import UnauthorizedPage from "./routes/UnauthorizedPage";

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
            <Route path="/products" element={<Products />} />
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

          {/* <Route path="/EcoConsultancyForm" element={<EcoConsultancyForm />} /> */}
          {/* <Route path="/EcoSurveyForm" element={<EcoSurveyForm />} />
        <Route path="/ForestSurveyForm" element={<ForestSurveyForm />} /> */}
          {/* <Route path="/Users/:id" element={<UpdateUsersForm/>} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
export default App;
