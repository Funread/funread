import React from "react";
import "../../App.css";
import Header from "../Shared/Header/Header";
import SignUp from "../SignUp/SignUp";
import WelcomeFooter from "../Shared/WelcomeFooter/WelcomeFooter";
import "./LandingPage.css";
import LogIn from "../LogIn/LogIn";
import { useState } from "react";

function LandingPage() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  return (
    <div className="landing-page-container">
      <div className="landing-page-header">
        <Header />
      </div>
      <div className="landing-page-body">
        <div className="landing-page-body-left-section">
          <div className="landing-page-news-section d-none d-lg-block"></div>
          <div className="landing-page-footer d-none d-xl-block">
            {login ? <WelcomeFooter message={"Welcome Back!"} /> : null}
            {signup ? <WelcomeFooter message={"Welcome!"} /> : null}
          </div>
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
    </div>
  );
}

export default LandingPage;
