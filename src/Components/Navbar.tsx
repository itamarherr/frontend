import { BsGithub } from "react-icons/bs";
import { SiHomebridge } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
// import { DarkModeContext } from "../contexts/DarkmodeContext";
import { BiLogOut, BiMenu } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import useDarkMode from "../hooks/useDarkMode";
import "./Navbar.scss";



// const { darkMode, toggle } = useContext(DarkModeContext);
const Navbar = () => {
  const { darkMode, toggle } = useDarkMode();
  const { isLoggedIn, logout, role } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      id="app-nav"
      className="p-4 flex items-center justify-between"
    >
      <div className="logo-container flex items-center">
        <img
          src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_960_720.png"
          alt="Eco Logo"
          className="h-12 w-auto"
          // style={{ height: "80px", width: "auto" }}
        />
        <h1 className="text-3xl font-bold">Eco Services</h1>
      </div>


      <div className="hidden md:flex desktop-menu gap-4">
        <NavLink className="rounded-lg p-2" to="/">
          <SiHomebridge size={32} aria-description="Home" />
        </NavLink>
        <NavLink className="rounded-lg p-2" to="/about">
          About
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink className="rounded-lg p-2" to="/MyOrderPage">
              My Order
            </NavLink>
            <NavLink className="rounded-lg-2 p-2" to="/Profile">
              My Profile
            </NavLink>
            <NavLink className="rounded-lg p-2" to="/OakConsultancyForm">
              Request Oak Consultancy
            </NavLink>
          </>
        )}
        {role === "admin" && (
          <>
            <NavLink className="rounded-lg p-2" to="/UsersList">
              Users List
            </NavLink>
            <NavLink className="rounded-lg p-2" to="/OrdersList">
              Orders List
            </NavLink>
          </>
        )}
      </div>

      <div className="hidden md:flex items-center gap-4">
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

        <a href="https://github.com/" className="px-2">
          <BsGithub aria-description="Github" />
        </a>

        <button
          onClick={toggle}
          className="rounded-lg p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
        >
          {darkMode ? "🌞" : "🌚"}
        </button>

        {isLoggedIn && (
          <button
            onClick={() => {
              logout();
            }}
            className="rounded-lg p-2"
          >
            <BiLogOut aria-description="Logout" />
          </button>
        )}
      </div>



      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <BiMenu />
      </button>


      {menuOpen && (
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <NavLink className="rounded-lg p-2" to="/">
            <SiHomebridge />
          </NavLink>
          <NavLink className="rounded-lg p-2" to="/about">
            About
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink className="rounded-lg p-2" to="/MyOrderPage">
              
                My Order
              </NavLink>
              <NavLink className=" rounded-lgp-2" to="/Profile">
               
                My Profile
              </NavLink>
            </>
          )}
          {role === "admin" && (
            <>
              <NavLink className="rounded-lg p-2" to="/UsersList">
                Users List
              </NavLink>
              <NavLink className="rounded-lg p-2" to="/OrdersList">
                Orders List
              </NavLink>
            </>
          )}

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
          <button
            onClick={toggle}
            className="rounded-lg p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
          >
            {darkMode ? "🌞" : "🌚"}
          </button>
          {isLoggedIn && (
            <button onClick={logout} className="p-2">
              <BiLogOut />
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
