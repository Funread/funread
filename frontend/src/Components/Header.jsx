import React from "react";

import { Navbar, Container, Nav, Button } from "react-bootstrap";

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
        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
          <Container>
            <Navbar.Brand className="StyleFont" href="#">FUNREAD</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <div className="menu-options">
                  <Nav.Link className="menu-options-content" href="#">About Us</Nav.Link>
                  <Nav.Link className="menu-options-content" href="#">Study Programs</Nav.Link>
                  <Nav.Link className="menu-options-content" href="#">Recent Reports</Nav.Link>
                </div>
                <div className="account-buttons">
                <Button className="buttonLogin account-button-content btn-sm" variant="outline-light">
                    Log In
                  </Button>
                  {"  "}
                  <Button className="account-button-content btn-sm" variant="outline-light">Sign Up</Button>
                </div>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;