import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logoFunread from "../../../logoFunread.png";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      //Return Here component or html code
      <div className="header-navbar-container">
        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
          <Navbar.Brand href="#" className="header-navbar-brand">
            <img
              src={logoFunread}
              alt="logo"
              className="header-navbar-logo-funread"
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <div className="menu-options">
                <Nav.Link className="menu-options-content" href="#1">
                  About Us
                </Nav.Link>
                <Nav.Link className="menu-options-content" href="#2">
                  Study Programs
                </Nav.Link>
                <Nav.Link
                  className="menu-options-content"
                  style={{ marginRight: 0 }}
                  href="#3"
                >
                  Recent Reports
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
