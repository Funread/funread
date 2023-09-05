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

import image1 from "./img/imagen1.webp"
import image2 from "./img/imagen2.webp"
import image3 from "./img/imagen3.webp"
import image4 from "./img/imagen4.webp"
import image5 from "./img/imagen5.webp"
import image6 from "./img/imagen6.webp"

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
        <Carousel Images={[image1,image2,image3,image4,image5,image6]}/>
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
