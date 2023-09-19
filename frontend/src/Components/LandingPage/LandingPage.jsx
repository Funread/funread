import React from "react";
import "../../App.css";
import Header from "../Shared/Header/Header";
import SignUp from "../SignUp/SignUp";
import WelcomeFooter from "../Shared/WelcomeFooter/WelcomeFooter";
import "./LandingPage.css";
import LogIn from "../LogIn/LogIn";
import { useState } from "react";
import image from "./ladingimage.webp"

function LandingPage() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  

  return (
    <>
      <img className="imagenLandingPage" src={image} alt="imagen" />
      <div className="landing-page-header">
        <Header />
      </div>
      <div className="landing-page-body">
        <div className="landing-page-body-left-section">
          <div className="landing-page-news-section d-none d-lg-block"></div>
        </div>
        <div className="landing-page-body-right-section">
          <div className="landing-page-account-section">
            {login ? <LogIn setLogin={setLogin} setSignup={setSignup} /> : null}
            {signup ? (
              <SignUp setSignup={setSignup} setLogin={setLogin} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
