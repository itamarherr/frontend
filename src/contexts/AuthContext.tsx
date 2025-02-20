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
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      try {
        const decode: any = jwtDecode(storedToken);
        const decodedRole = decode.role || storedRole;
        setRole(decodedRole);
      } catch (error) {
        console.log("Invalid token");
        logout();
      }
    } else {
      setRole(storedRole || null);
    }
  }, []);

  function login(token: string) {
    try {
      const decode: any = jwtDecode(token);
      console.log("Decoded Token: ", decode); // Debugging output
      const roleClaimKey = Object.keys(decode).find(key =>
        key.includes("role") // Finds the role key dynamically
      );
  
      let userRole = "user"; // Default to "user"
      
      if (roleClaimKey) {
        const roles = decode[roleClaimKey]; // Extract roles
  
        if (Array.isArray(roles)) {
          userRole = roles.includes("admin") ? "admin" : roles[0]; // Pick "admin" if available
        } else {
          userRole = roles;
        }
      }
  

      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);


      console.log("Decoded Role on Login:", userRole);
      console.log("Decoded Token:", decode); // Debugging output
      setIsLoggedIn(true);
      setToken(token);
      setRole(userRole);
    } catch (error) {
      console.log("Invalid token");
      logout();
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
