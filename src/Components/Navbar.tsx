import { BsGithub } from "react-icons/bs";
import { SiHomebridge } from "react-icons/si";
import { NavLink,useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// import { DarkModeContext } from "../contexts/DarkmodeContext";
import { BiLogOut, BiSearch, BiMenu } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import useDarkMode from "../hooks/useDarkMode";
import "./Navbar.scss";
import { orders_api } from "../api/Orders-api";
import useFetch from "../hooks/useFetch";

// const { darkMode, toggle } = useContext(DarkModeContext);
const Navbar = () => {
  const { darkMode, toggle } = useDarkMode();
  const { isLoggedIn, logout, role } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([])
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // const {data: searchResults, loading, error } = useFetch(()=>{
  //   if (!searchQuery.trim()) {
  //     return Promise.resolve([]); // ✅ Return empty array if searchQuery is empty
  //   }
  //   return orders_api.searchOrders(searchQuery);
  // }, [searchQuery]);


  return (
    <nav id="app-nav" className="p-4 flex items-center justify-between">
      <div className="logo-container flex items-center">
        <img
          src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_960_720.png"
          alt="Eco Logo"
          className="h-12 w-auto"
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
          {isLoggedIn && role != "admin" &&(
            <>
            <NavLink className="rounded-lg p-2" to="/MyOrderPage">
              My Order
            </NavLink>
            <NavLink className="rounded-lg-2 p-2" to="/Profile">
              My Profile
            </NavLink>
            </>
          )}  
          
            <NavLink className="rounded-lg p-2" to="/OakConsultancyForm">
              Request Oak Consultancy
            </NavLink>
          </>
        )}

        {role === "admin" && (
     <div className="hidden md:flex relative">
     {/* <input
     type="text"
      placeholder="Search..."
     value={searchQuery}
     onChange={(e) => setSearchQuery(e.target.value)}
    className="p-2 pl-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white text-black dark:bg-green-900 dark:text-green-100 focus:ring focus:ring-green-300 dark:focus:ring-green-500"
     /> */}
   {/* <BiSearch className="absolute left-2 top-2 text-gray-500 dark:text-gray-300" /> */}

   {/* {loading && <p className="absolute top-10 left-2 text-gray-500">Loading...</p>}
   {error && <p className="absolute top-10 left-2 text-red-500">Error fetching data</p>} */}

   {/* {searchQuery && searchResults?.length > 0 && (
            <div className="absolute top-10 left-0 w-full bg-white dark:bg-green-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
              {searchResults.map((order) => (
                // <div
                //   key={order.id}
                //   className="block p-2 hover:bg-gray-200 dark:hover:bg-green-700 cursor-pointer"
                //   onClick={() => {
                //     navigate(`/Orders/${order.id}`);
                //     setSearchQuery(""); // ✅ Clear input on click
                //   }}
                // >
                //   Order #{order.id} - {order.userEmail} ({order.statusTypeString})
                // </div>
              ))}
            </div>
          )}    */}

             {/* {searchQuery && searchResults?.length === 0 && !loading && (
              <p className="absolute top-10 left-2 text-gray-500">No results found</p>
            )} */}



            <NavLink className="rounded-lg p-2" to="/UsersList">
              Users List
            </NavLink>
            <NavLink className="rounded-lg p-2" to="/OrdersList">
              Orders List
            </NavLink>
      </div>
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

        {/* <a href="https://github.com/" className="px-2">
          <BsGithub aria-description="Github" />
        </a> */}

        <button
          onClick={toggle}
          className="rounded-lg p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
        >
          {darkMode ? "🌞" : "🌚"}
        </button>

        {isLoggedIn && !menuOpen && (
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
          {/* <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white text-black dark:bg-green-900 dark:text-green-100 focus:ring focus:ring-green-300 dark:focus:ring-green-500"
            />
            <BiSearch className="absolute left-2 top-2 text-gray-500 dark:text-gray-300" />
          </div> */}

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
