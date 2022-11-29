import React, { useState, useEffect } from "react";
import "./AddPage.css";
import DashHeader from "../HeaderDashboard/HeaderDashboard";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import BookPages from "../BookPages/BookPages";
import PreviewPageOfBook from "../PreviewPageOfBook/PreviewPageOfBook";
import ComponentToolsOfBook from "../ComponentToolsOfBook/ComponentToolsOfBook";

function AddPage(props) {
  const [myBookName, setMyBookName] = useState("New Book Name");
  const [selectedPage, setSelectedPage] = useState(1);
  const [pagesList, setPagesList] = useState([
    {
      pageNumber: 1,
      template: null,
    },
  ]);
  const navigate = useNavigate();

  const closeAddPage = () => {
    navigate("/mylibrary");
  };

  function setPreview() {
    for (let index = 0; index < pagesList.length; index++) {
      if (selectedPage === pagesList[index].pageNumber) {
        return pagesList[index].template;
      }
    }
  }

  return (
    <div className="add-page-container">
      <div className="add-page-header">
        <DashHeader />
      </div>
      <div className="add-page-body">
        <div className="add-page-banner">
          <p className="add-page-banner-title">{myBookName}</p>
          <div className="add-page-banner-buttons-container">
            <Button
              variant="outline-dark"
              size="md"
              className="add-page-banner-option-button"
              type="button"
            >
              PRESENT
            </Button>
            <Button
              variant="outline-dark"
              size="md"
              className="add-page-banner-option-button"
              type="button"
            >
              SAVE
            </Button>
            <Button
              variant="outline-dark"
              className="add-page-banner-close-button"
              style={{ marginRight: 20 }}
              type="button"
              onClick={closeAddPage}
            >
              <FontAwesomeIcon icon={faX} />
            </Button>
          </div>
        </div>
        <div className="add-page-book-information-container">
          <div className="add-page-pages-container">
            <BookPages
              pagesList={pagesList}
              setPagesList={setPagesList}
              setSelectedPage={setSelectedPage}
            />
          </div>
          <div className="add-page-preview-container">
            <PreviewPageOfBook
              pageNumber={selectedPage}
              pageTemplate={setPreview()}
            ></PreviewPageOfBook>
          </div>
          <div className="add-page-template-widget-container">
            <ComponentToolsOfBook
              pageNumber={selectedPage}
              pagesList={pagesList}
              setPagesList={setPagesList}
            ></ComponentToolsOfBook>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPage;
