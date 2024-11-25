import { BsGithub } from "react-icons/bs";
import { SiHomebridge } from "react-icons/si";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkmodeContext";
import { BiLogOut } from "react-icons/bi";
import useAuth from "../hooks/useAuth";

//1) if the user is logged in: show the logout button
//2) if the user is not logged in: show the login and register buttons
//3) only show the products page if the user is logged in
const Navbar = () => {
  // const { darkMode, toggle } = useDarkMode();
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav
      id="app-nav"
      className="hidden sm:flex items-center shadow-2xl p-8 flex gap-3 bg-fuchsia-50 text-fuchsia-900 dark:bg-fuchsia-900 dark:text-fuchsia-50"
    >
    <img 
    src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_960_720.png" 
    alt="Eco Logo" 
    style={{ height: '80px', width: 'auto' }} 
  />
  <h1 style={{ fontSize: '40px' }}>Eco Services</h1>
      <NavLink className="rounded-lg p-2" to="/">
        <SiHomebridge aria-description="Home" />
      </NavLink>

      <NavLink className="rounded-lg p-2" to="/about">
        About
      </NavLink>

      {isLoggedIn && (
        <>
    
         <NavLink className="rounded-lg p-2" to="/ForrestSurveyPage">
          Forrest Survey
        </NavLink>
        <NavLink className="rounded-lg p-2" to="/EcoSurveyPage">
        Ecological Survey
      </NavLink>
      {/* <NavLink className="rounded-lg p-2" to="/OakConsultancyPage">
          Oak Consultancy
        </NavLink> */}
        <NavLink className="rounded-lg p-2" to="/EcoConsultancyPage">
        Ecological Consultancy
        </NavLink>
        <NavLink className="rounded-lg p-2" to="/EcoConsultancyPage">
        Oak Transplate
        </NavLink>
        </>
      )}
      <div className="flex-1"></div>

      <div className="hidden sm:flex items-center">
        {!isLoggedIn && (
          <>
            <NavLink className="rounded-lg p-2" to="/login">
              Login
            </NavLink>
            <NavLink className="rounded-lg p-2" to="/register">
              Register
            </NavLink>
          </>
        )}

        <a href="https://github.com/TomerBu/D290323ER" className="px-2">
          <BsGithub aria-description="Github" />
        </a>

        {/* <button onClick={toggle} className="rounded-lg p-2">
          {darkMode ? "🌞" : "🌚"}
        </button> */}

        {isLoggedIn && (
          <button onClick={() => {
            alert ("Click")
            logout();
          }} className="rounded-lg p-2">
            <BiLogOut aria-description="Logout" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;