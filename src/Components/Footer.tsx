import React from "react";

const Footer = () => {
  return <div
className="p-6 flex gap-3 bg-fuchsia-50 text-fuchsia-900 dark:text-fuchsia-50 shadow-md"
style={{
    boxShadow: "0px -20px 20px rgba(0, 0, 0, 0.25)",
  }}
 >
    <img
        src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_960_720.png"
        alt="Eco Logo"
        style={{ height: "80px", width: "auto" }}
      />
      <h1 style={{ fontSize: "40px" }}>Eco Services</h1>
    </div>;
};

export default Footer;
