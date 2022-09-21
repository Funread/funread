import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./MyLibrary.css";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

function MyLibrary() {
  const [myView, setMyView] = useState("1");

  function changeView(view) {
    setMyView(view);
  }

  return (
    <>
      <div className="my-library">
        <div className="my-library-banner">
          <h2>My Library</h2>
        </div>
        <Navbar bg="transparent">
          <Nav>
            <div className="my-library-options">
              <Nav.Link className="my-library-options-content">
                Create Book
              </Nav.Link>
              <Nav.Link className="my-library-options-content">
                Import Book
              </Nav.Link>
              <Nav.Link className="my-library-options-content">
                Filters
              </Nav.Link>
            </div>
          </Nav>
          <Nav className="me-auto"></Nav>
          <Nav className="my-library-options">
            <Navbar.Text
              className="my-library-select-view"
              style={{ marginRight: "60px" }}
            >
              Select View
            </Navbar.Text>
          </Nav>
          <Nav>
            <div className="my-library-options">
              <Nav.Link
                className="my-library-options-content"
                onClick={() => {
                  changeView("1");
                }}
              >
                1
              </Nav.Link>
              <Nav.Link
                className="my-library-options-content"
                onClick={() => {
                  changeView("2");
                }}
              >
                2
              </Nav.Link>
              <Nav.Link
                className="my-library-options-content"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  changeView("3");
                }}
              >
                3
              </Nav.Link>
            </div>
          </Nav>
        </Navbar>
        <div className="my-library-body">
          <div className="my-library-recent-views">
            <p className="my-library-recent-views-title">Recent Views</p>
            <ListGroup className="recent-views">
              <ListGroup.Item>Nombre del libro</ListGroup.Item>
              <ListGroup.Item>Nombre del libro</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="my-library-all-books">
            {myView === "1" ? (
              <View1 />
            ) : myView === "2" ? (
              <View2 />
            ) : (
              <View3 />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function View1() {
  return (
    <div className="my-library-all-books-view-1">
      <Table className="books-table">
        <thead>
          <tr>
            <th style={{ width: "70%", paddingLeft: 20 }}>Book Title</th>
            <th style={{ width: "10%" }}>Class</th>
            <th style={{ width: "10%" }}>Pages</th>
            <th style={{ width: "10%" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "70%", paddingLeft: 20 }}>Name of book</td>
            <td style={{ width: "10%" }}>History</td>
            <td style={{ width: "10%" }}>10</td>
            <td style={{ width: "10%" }}>21 Nov</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function View2() {
  return <div className="my-library-all-books-view-2">Vista 2</div>;
}

function View3() {
  return <div className="my-library-all-books-view-3">Vista 3</div>;
}

export default MyLibrary;
