// Data store (context) for dark mode

//state variable: isDark

//function to toggle dark mode

import { createContext, useEffect, useState } from "react";


export interface DarkModeContextType{
  darkMode : boolean;
  toggle : () => void;
} 
 

const DarkModeContext = createContext<DarkModeContextType>(null);

function DarkModeProvider({ children }) {

  //state variables:  

  const [darkMode, setDarkMode] = useState(false);

  //functions:

  useEffect(() => {
    console.log("code that run on each render");
  }, []);


  useEffect(() => {
    console.log("code that run on mount");
      }, []);

  useEffect(() =>{
    const mode = localStorage.getItem("darkMode");
    if(mode === "dark"){
      setDarkMode(true);
      document.body.classList.toggle("dark");
      
    }
  }, []);

  function toggle() {
    const newMode = !darkMode ? "dark" : "light";
    localStorage.setItem("darkMode", newMode);

    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");

  }

  return (

    <DarkModeContext.Provider value={{ darkMode, toggle }}>

      {children}

    </DarkModeContext.Provider>

  );

}

export { DarkModeProvider, DarkModeContext };