import React from "react";

const Footer = () => {
  const darkMode = false;
  return (
    <div
      className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-fuchsia-50 text-fuchsia-900 dark:bg-green-800 dark:text-green-100"
      style={{
        boxShadow: darkMode
          ? "0px -20px 20px rgba(255, 255, 255, 0.15)"
          : "0px -20px 20px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="text-center md:text-left flex flex-col md:flex-row md:items-center md:gap-6">
        <img
          src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_960_720.png"
          alt="Eco Logo"
          className="h-20 w-auto"
        />
        <h1 className="text-4xl ">Eco Services</h1>
        <p className="text-sm text-gray-500">@ 2025 All righta reserved</p>
      </div>
      <div className="text-center md:text-left flex flex-col md:flex-row md:items-center md:gap-6">
        <p className="text-lg mt-2">
          Phone:{" "}
          <a
            href="tel:+972 523278700"
            className="text-blue-500 hover:underline"
          >
            +972 523278700
          </a>
        </p>
        <p className="text-lg mt-2">
          Email:{" "}
          <a
            href="maito:itamarherr@gmail.com"
            className="text-blue-500 hover:underline"
          >
            itamarherr@gmail.com
          </a>
        </p>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-4 md:mt-0 p-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
      >
        Back to Top
      </button>
    </div>
  );
};

export default Footer;
