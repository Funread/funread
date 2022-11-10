import React, { useState } from "react";
import "./BookPages.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

function BookPages(props) {
  const [pageList, setPageList] = useState([
    <div className="book-pages-item-active" key={0}>
      <Button
        className="book-pages-item-content"
        key={0}
        type="button"
      ></Button>
    </div>,
  ]);

  function addPage() {
    setPageList(
      pageList.concat(
        <div className="book-pages-item-inactive" key={pageList.length}>
          <Button
            className="book-pages-item-content"
            key={pageList.length}
            type="button"
          ></Button>
        </div>
      )
    );
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
          onClick={addPage}
        />
        <FontAwesomeIcon className="book-pages-options" icon={faCopy} />
      </div>
      <div className="book-pages-item-container">
        {pageList}
        <div className="book-pages-item-inactive">
          <Button
            className="book-pages-item-add"
            type="button"
            onClick={addPage}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookPages;
