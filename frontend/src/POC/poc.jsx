import "./poc.css";
import React, { useState } from "react";
import MyBooks from "../Components/MyBooks/MyBooks";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Library from "../Components/Library/Library";
import BookView from "../Components/Shared/BookView/BookView";
import SidebarBook from "../Components/Shared/SidebarBook/SidebarBook";

const POC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const toggleSidebar = (book) => {
    if (!selectedBook) {
      setShowSidebar(true);
      setSelectedBook(book);
      return;
    }

    if (selectedBook.id === book.id) {
      setShowSidebar(false);
      setSelectedBook(null);
      return;
    }
    setSelectedBook(book);
  };

  return (
    <>
      <div className="container-fluid p-0 text-center ">
        <div className="row flex-nowrap " style={{ height: "auto" }}>
          <SidebarBook></SidebarBook>

          <div
            className={`sidenav ${showSidebar ? "col-sm-8" : "col-11"}`}
            style={{}}
          >
            <div style={{ maxWidth: "1000px" }} className="mx-auto">
              <Form className="d-flex mt-1 pt-5">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">
                  <FontAwesomeIcon
                    className="fa-magnifying-glass"
                    icon={faSearch}
                  />
                </Button>
              </Form>

              <h4>Recent Books</h4>
              <MyBooks toggleSidebar={toggleSidebar} />
              {selectedBook && (
                <div
                  className="sidebar-mobile"
                  style={{ background: "#79ABA8" }}
                >
                  <BookView
                    title={selectedBook?.title}
                    description={selectedBook?.description}
                    image={selectedBook?.image}
                    author={selectedBook?.author}
                  />
                </div>
              )}

              <Library toggleSidebar={toggleSidebar} />
            </div>
          </div>
          {selectedBook && (
            <div
              className="col-sm-3 p-0 sidebar-desktop"
              style={{ background: "#79ABA8" }}
            >
              <BookView
                title={selectedBook?.title}
                description={selectedBook?.description}
                image={selectedBook?.image}
                author={selectedBook?.author}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default POC;
