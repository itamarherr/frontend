import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/ErrorPage.css";
// import noEntryImage from "../assets/no-entry.gif";

const UnauthorizedPage = () => {
    const navigate = useNavigate();
  return (

    <div className="error-page">
        <h1>
            Unauthorized Access
        </h1>
        <p>
            You are not authorized to access this page. Please contact the system administrator for more information.
        </p>
        {/* <img src={noEntryImage} alt="Access Denied" /> */}
        <button onClick={() => navigate('/')} className="px-4 py-2 rounded-md bg-green-700 text-green-100 hover:bg-green-800 dark:bg-green-600 dark:text-green-100 dark:hover:bg-green-700">
            Return to Homepage
        </button>
    </div>
  )
}

export default UnauthorizedPage