import React, { useState } from "react";
import "./AddPage.css";
import Header from "../Header/Header";
import DashHeader from "../HeaderDashboard/HeaderDashboard";

function AddPage() {
  const [myBookName, setMyBookName] = useState("New Book Name");

  return (
    <div className="add-page-container">
      <div className="add-page-header">
        <DashHeader />
      </div>
      <div className="add-page-body">
        <div className="add-page-banner">
          <p className="add-page-title">{myBookName}</p>
        </div>
        <div className="add-page-book-information-container">
          <div className="add-page-pages-container">
            <p className="add-page-pages-title">Páginas</p>
          </div>
          <div className="add-page-preview-container"></div>
        </div>
      </div>
    </div>
  );
}

export default AddPage;
