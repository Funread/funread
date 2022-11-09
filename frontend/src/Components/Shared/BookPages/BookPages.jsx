import React, { useState } from "react";
import "./BookPages.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

function BookPages(props) {
  function changePagePreview() {
    console.log("new page");
  }

  return (
    <div className="book-pages-container">
      <div className="book-pages-container-title-options">
        <p className="book-pages-title" style={{ margin: 0 }}>
          Pages
        </p>
        <FontAwesomeIcon
          style={{ marginLeft: "auto" }}
          className="book-pages-options"
          icon={faFileCirclePlus}
        />
        <FontAwesomeIcon className="book-pages-options" icon={faCopy} />
      </div>
      <div className="book-pages-item-container">
        <div className="book-pages-item-inactive">
          <Button className="book-pages-item-add" type="button">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookPages;
