import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export interface AuthContextType {
  isLoggedIn: boolean;
  role: string | null;
  token: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null);

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decode: any = jwtDecode(token);
        setRole(decode.role || null);
      } catch (error) {
        console.log("Invalid token");
        logout();
      }
    }
  }, [token]);

  function login(token: string) {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setToken(token);
    try{
      const decode: any = jwtDecode(token);
      setRole(decode.role || null);
    } catch (error){
      console.log("Invalid token")
      logout();
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("click");
    setToken("");
    setRole(null);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
