import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { Navbar, Nav } from "react-bootstrap";
import logoFunread from "../../../logoFunread.png";
import "./Header.css";

class Header extends React.Component {
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
        <Navbar collapseOnSelect expand="xxl" bg="transparent" variant="dark">
          <Navbar.Brand href="#">
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
              <div className="menu-options">
                <Nav.Link className="menu-options-content" href="#1">
                  About Us
                </Nav.Link>
                <Nav.Link className="menu-options-content" href="#2">
                  Study Programs
                </Nav.Link>
                <Nav.Link className="menu-options-content" href="#3">
                  Recent Reports
                </Nav.Link>
              </div>
              <div>
                <CustomButton
                  name={"Log In"}
                  setLogin={this.props.setLogin}
                  setSignup={this.props.setSignup}
                />
                <CustomButton
                  name={"Sign Up"}
                  setSignup={this.props.setSignup}
                  setLogin={this.props.setLogin}
                />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
