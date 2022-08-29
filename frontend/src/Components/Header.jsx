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
      <div>
        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
          <Container>
            <Navbar.Brand className="StyleFont" href="#">FUNREAD</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link className="StyleFont" href="#">About Us</Nav.Link>
                <Nav.Link className="StyleFont" href="#">Study Programs</Nav.Link>
                <Nav.Link className="StyleFont" href="#">Recent Reports</Nav.Link>
                <Button className="buttonLogin StyleFont" variant="outline-light">
                  Log In
                </Button>
                {"  "}
                <Button className="StyleFont" variant="outline-light">Sign Up</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;