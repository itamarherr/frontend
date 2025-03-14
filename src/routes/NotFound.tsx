import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../assets/ErrorPage.css";
import lost from "../assets/lost.gif";

const NotFound = () => {
const navigation = useNavigate()


  return (
    <div className="error-page">
    <h1>
    404 - Not Found
    </h1>
    <p>the page that you look for not exist</p>
    <img src={lost} alt="Funny Lost Image" />
    <button onClick={() => navigation('/')} className="px-4 py-2 rounded-md bg-green-700 text-green-100 hover:bg-green-800 dark:bg-green-600 dark:text-green-100 dark:hover:bg-green-700">
      Go to Homepage
      </button>
    </div>

  )
}

export default NotFound