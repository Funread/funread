import React from "react";
import "../../App.css";
import Header from "../Shared/Header/Header";
import SignUp from "../SignUp/SignUp";
import WelcomeFooter from "../Shared/WelcomeFooter/WelcomeFooter";
import Carousel from "../Shared/Carousel/Carousel";
import "./LandingPage.css";
import LogIn from "../LogIn/LogIn";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState } from "react";

import image1 from "./img/fotor-ai-1.jpg"
import image2 from "./img/fotor-ai-2.jpg"
import image3 from "./img/fotor-ai-3.jpg"

// color de libro de logo funread = #A097F2

function LandingPage() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

  function changesLogin() {
    setLogin(!login)
  }


  return (
    <div className="landing-page-container">
      <div className="landing-page-carousel">
        <Carousel Images={[image1,image2,image3]}/>
        <div className="landing-page-carousel-bottom-gradient" />
      </div>
      <div className="landing-page-header">
        <Header />
      </div>
      <div className="landing-page-body">
          <div className="landing-page-account-section">
            <div className="landing-page-account-button-container">
              <button className={"landing-page-button-login" + (login ? " landing-page-button-login-disable" : "")} onClick={changesLogin}>Log In</button>
              <button className={"landing-page-button-singup" + (login ? "" : " landing-page-button-singup-disable")} onClick={changesLogin}>Sing Up</button>
            </div>
            {login ? <LogIn setLogin={setLogin} setSignup={setSignup} /> : <SignUp setSignup={setSignup} setLogin={setLogin} />}
          </div>
      </div>
    </div>
  );
}

export default LandingPage;
