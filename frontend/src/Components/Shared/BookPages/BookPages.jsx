import React, { useState, useRef } from "react";
import "./BookPages.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFileCirclePlus,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

function BookPages(props) {
  const [pageList, setPageList] = useState({
    activePage: 1,
    pages: [{ pageNumber: 1 }],
  });
  const bottomRef = useRef(null);

  const addNewPage = () => {
    let oldList = [...pageList.pages];
    oldList.push({ pageNumber: oldList.length + 1 });
    props.setTotalPages(oldList.length);
    setPageList({ activePage: pageList.activePage, pages: oldList });
  };

  function toogleActive(id) {
    setPageList({ ...pageList, activePage: id });
    props.setSelectedPage(id);
  }

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
        {pageList.pages.map((page) => (
          <div
            className={
              page.pageNumber === pageList.activePage
                ? "book-pages-item-active"
                : "book-pages-item-inactive"
            }
            key={page.pageNumber}
          >
            <Button
              className="book-pages-item-content"
              key={page.pageNumber}
              onClick={() => toogleActive(page.pageNumber)}
            ></Button>
          </div>
        ))}
        <div className="book-pages-item-last-item" ref={bottomRef}>
          <Button className="book-pages-item-add" onClick={addNewPage}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
      <div className="book-pages-bottom-container">
        <Button className="book-pages-button-bottom" onClick={scrollToBottom}>
          <FontAwesomeIcon icon={faAngleDown} />
        </Button>
      </div>
    </div>
  );
}

export default BookPages;
