import React from "react";
import {Row, Col} from "react-bootstrap";
import "../../App.css";
import Wizard from "../Shared/Wizard/Wizard";
import Header from "../Shared/Header/Header";
import SignUp from "../SignUp/SignUp";
import MyLibrary from "../MyLibrary/MyLibrary";
import WelcomeFooter from "../Shared/WelcomeFooter/WelcomeFooter";
import "./LandingPage.css";
import LogIn from "../LogIn/LogIn";
import { useState } from "react";


function LandingPage() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  return (
    <div>
      {/* <div className="background" style={{ backgroundColor: "#ffffff" }}>
        <Header />
        <MyLibrary />
        {/*login ? <LogIn setLogin={setLogin} setSignup={setSignup} /> : null*/}
        {/*login ? <WelcomeFooter message={"Welcome Back!"} /> : null*/}
        {/*signup ? <SignUp setSignup={setSignup} setLogin={setLogin} /> : null*/}
        {/*signup ? <WelcomeFooter message={"Welcome!"} /> : null*/}
      {/*</div> */}

      <Col>
        <Row>
          <Wizard />
        </Row>
      </Col>

    </div>
  );
}

export default LandingPage;
