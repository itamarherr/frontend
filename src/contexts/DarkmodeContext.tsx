

import { createContext, useEffect, useState } from "react";



const DarkModeContext = createContext(null);

function DarkModeProvider({ children }) {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "dark";
  });

  useEffect(() => {
    const htmlElement = document.documentElement; 
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  function toggle() {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode ? "dark" : "light");

      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newMode;
    });
  }

  return (

    <DarkModeContext.Provider value={{ darkMode, toggle }}>

      {children}

    </DarkModeContext.Provider>

  );

}

export { DarkModeProvider, DarkModeContext };