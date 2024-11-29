import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Products from "./routes/Products";
import Navbar from "./Components/Navbar";
import "./App.css";
import EcoSurveyPage from "./routes/EcoSurveyPage";
import EcoConsultancyPage from "./routes/EcoConsultancyPage";
import ForestSurveyPage from "./routes/ForestSurveyPage";
import OakConsultancyPage from "./routes/OakConsultancyPage";
import EcoConsultancyForm from "./routes/forms/EcoConsultancyForm";
import OakConsultancyForm from "./routes/forms/OakConsultancyForm";
import EcoSurveyForm from "./routes/forms/EcoSurveyForm";
import ForestSurveyForm from "./routes/forms/ForestSurveyForm";
import OrdersList from "./routes/OrdersList";

const App = () => {



  const url = import.meta.env.VITE_BASE_URL;
  const mode = import.meta.env.VITE_MODE;
  console.log(url);
  
  
  
  return (
    <>
     <Navbar/>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/products" element={<Products />} />
         <Route path="/EcoSurveyPage" element={<EcoSurveyPage />} />
         <Route path="/ForestSurveyPage" element={<ForestSurveyPage />} />
         <Route path="/OakConsultancyPage" element={<OakConsultancyPage />} />
         <Route path="/EcoConsultancyPage" element={<EcoConsultancyPage />} />
         <Route path="/EcoConsultancyForm" element={<EcoConsultancyForm />} />
         <Route path="/OakConsultancyForm" element={<OakConsultancyForm />} />
         <Route path="/EcoSurveyForm" element={<EcoSurveyForm/>} />
         <Route path="/ForestSurveyForm" element={<ForestSurveyForm/>} />
         <Route path="/OrdersList" element={<OrdersList/>} />
         <Route path="*" element={<div>Not Found</div>} />
       </Routes>
     </>
  );
};
export default App;

