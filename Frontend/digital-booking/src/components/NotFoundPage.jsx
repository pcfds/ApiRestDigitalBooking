import React from 'react'
import "../styles/notFoundPage.css";
import { Link } from "react-router-dom";

 const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <div className="text-container">
      <h1>....OOPPSS</h1>
      <h2>No pudimos encontrar esa página </h2>
      </div>
      <Link to={"/"} className="button-page">
          Volver a la pagina principal
        </Link>
    </div>
  )
}

export default NotFoundPage;
