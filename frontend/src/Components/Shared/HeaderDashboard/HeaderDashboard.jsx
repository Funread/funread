import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logoFunread from "../../../logoFunread.png";
import "./HeaderDashboard.css";

class HeaderDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //ListHere
      label: this.props.miPrimerProps,
    };
  }

  render() {
    return (
      //Return Here component or html code
      <div className="main-header">
        <Navbar
          className="header-dashboard-navbar"
          collapseOnSelect
          expand="lg"
          bg="transparent"
          variant="dark"
        >
          <Navbar.Brand href="#" className="header-dashboard-navbar-brand">
            <div
              className="logo-funread"
              style={{
                backgroundImage: `url(${logoFunread})`,
              }}
            ></div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <div className="dashboard-options">
                <input
                  type="text"
                  className="search-hover"
                  name=""
                  placeholder="search here..."
                />
                <Nav.Link className="dashboard-options-content" href="#2">
                  C
                </Nav.Link>
                <Nav.Link className="dashboard-options-content" href="#3">
                  M
                </Nav.Link>
                <Nav.Link className="dashboard-options-content" href="#4">
                  U
                </Nav.Link>
              </div>
              <div></div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default HeaderDashboard;
