import { BsGithub } from "react-icons/bs";
import { SiHomebridge } from "react-icons/si";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkmodeContext";
import { BiLogOut } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import useDarkMode from "../hooks/useDarkMode";

//1) if the user is logged in: show the logout button
//2) if the user is not logged in: show the login and register buttons
//3) only show the products page if the user is logged in
const Navbar = () => {
  const { darkMode, toggle } = useDarkMode();
  const { isLoggedIn, logout, role } = useAuth();
  console.log("User role:", role);

  return (
    <nav
      id="app-nav"
      className="hidden sm:flex items-center shadow-2xl p-8 flex gap-3 bg-fuchsia-50 text-fuchsia-900 dark:bg-green-800 dark:text-green-100"
    >
      <img
        src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_960_720.png"
        alt="Eco Logo"
        style={{ height: "80px", width: "auto" }}
      />
      <h1 style={{ fontSize: "40px" }}>Eco Services</h1>
      <NavLink className="rounded-lg p-2" to="/">
        <SiHomebridge aria-description="Home" />
      </NavLink>
      <NavLink className="rounded-lg p-2" to="/about">
        About
      </NavLink>
      <NavLink className="rounded-lg p-2" to="/">
        home
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
      {role && <p>Detected Role: {role}</p>} {/* Debug output */}
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
      <div className="flex-1"></div>
      <div className="hidden sm:flex items-center">
        {!isLoggedIn && role !== "admin" && (
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

        <button
          onClick={toggle}
          className="rounded-lg p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
        >
          {darkMode ? "🌞" : "🌚"}
        </button>

        {(!isLoggedIn || role !== "admin") && (
          <button
            onClick={() => {
              alert("Click");
              logout();
            }}
            className="rounded-lg p-2"
          >
            <BiLogOut aria-description="Logout" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
