import React from "react";
import "../../App.css";
import Header from "../Shared/Header/Header";
import SignUp from "../SignUp/SignUp";
import WelcomeFooter from "../Shared/WelcomeFooter/WelcomeFooter";
import "./LandingPage.css";
import LogIn from "../LogIn/LogIn";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Wizard from "../Shared/Wizard/Wizard";

function LandingPage() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  return (
    <Container fluid className="background-container">
      {/* <Row>
        <Col>
          <Container fluid className="landing-page-container">
            <Row>
              <Col>
                <Header />
              </Col>
            </Row>
            <Row>
              <Container fluid className="body-container">
                <Row>
                  <Col
                    md={5}
                    lg={7}
                    xl={7}
                    xxl={8}
                    className="nopadding d-none d-lg-block"
                  >
                    <div className="news-container"></div>
                  </Col>
                  <Col md={7} lg={5} xl={5} xxl={4} className="nopadding">
                    <div>
                      {login ? (
                        <LogIn setLogin={setLogin} setSignup={setSignup} />
                      ) : null}
                      {signup ? (
                        <SignUp setSignup={setSignup} setLogin={setLogin} />
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </Container>
            </Row>
            <Row>
              <Col>
                <div className="footer-container d-none d-xxl-block">
                  {login ? <WelcomeFooter message={"Welcome Back!"} /> : null}
                  {signup ? <WelcomeFooter message={"Welcome!"} /> : null}
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row> */}
      <Col>
        <Row>
          <Wizard />
        </Row>
      </Col>
      
    </Container>
  );
}

export default LandingPage;
