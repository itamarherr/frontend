import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkmodeContext";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const root = document.getElementById("root")!;

//alt shift f (format the code)
ReactDOM.createRoot(root).render(

  <BrowserRouter>
  <AuthProvider>
  <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </AuthProvider>
   
  </BrowserRouter>
);