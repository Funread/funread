import React, { useState } from "react";
import "./BookPages.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

function BookPages(props) {
  const [pageList, setPageList] = useState([]);
  const [activedPage, setActivedPage] = useState(null);

  const addNewPage = () => {
    let oldList = [...pageList];
    oldList.push({ pageNumber: oldList.length + 1 });
    setPageList(oldList);
  };

  function toogleActive(id) {
    if (activedPage != null) {
      document.getElementById(activedPage).className =
        "book-pages-item-inactive";
    }
    document.getElementById(id).className = "book-pages-item-active";
    setActivedPage(id);
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
          onClick={addNewPage}
        />
        <FontAwesomeIcon className="book-pages-options" icon={faCopy} />
      </div>
      <div className="book-pages-item-container">
        {pageList.map((page) => (
          <div
            className="book-pages-item-inactive"
            key={page.pageNumber}
            id={"page-" + page.pageNumber}
          >
            <Button
              className="book-pages-item-content"
              key={page.pageNumber}
              onClick={() => toogleActive("page-" + page.pageNumber)}
            ></Button>
          </div>
        ))}
        <div className="book-pages-item-inactive">
          <Button className="book-pages-item-add" onClick={addNewPage}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookPages;
