import React, { useState } from "react";
import "./AddPage.css";
import DashHeader from "../HeaderDashboard/HeaderDashboard";
import { Button } from "react-bootstrap";

function AddPage(props) {
  const [myBookName, setMyBookName] = useState("New Book Name");

  function changePagePreview() {
    console.log("new page");
  }

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
            <div className="add-page-pages-item-active">
              <Button
                className="add-page-pages-item-content"
                type="button"
                onClick={() => {
                  changePagePreview();
                }}
              ></Button>
            </div>
            <div className="add-page-pages-item-inactive">
              <Button
                className="add-page-pages-item-content"
                type="button"
              ></Button>
            </div>
            <div className="add-page-pages-item-inactive">
              <Button
                className="add-page-pages-item-content"
                type="button"
              ></Button>
            </div>
          </div>
          <div className="add-page-preview-container"></div>
        </div>
      </div>
    </div>
  );
}

export default AddPage;
