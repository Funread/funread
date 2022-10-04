import React from "react";
import "../../App.css";
import Wizard from "../Shared/Wizard/Wizard";
import Header from "../Shared/Header/Header";
import TestToast from "../Shared/Toast/TestToast";
import SignUp from "../SignUp/SignUp";
import MyLibrary from "../MyLibrary/MyLibrary";
import WelcomeFooter from "../Shared/WelcomeFooter/WelcomeFooter";
import "./LandingPage.css";
import LogIn from "../LogIn/LogIn";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function LandingPage() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  return (
    <div className="landing-page-container">
      <div className="landing-page-header">
        <Header />
      </div>
      <div>
        <Routes>
          <Route exact path="/MyLibrary" element={<MyLibrary />} />
          <Route exact path="/Wizard" element={<Wizard />} />
          <Route exact path="/TestToast" element={<TestToast />} />
        </Routes>
      </div>
      <div className="landing-page-body">
        <div className="landing-page-body-left-section">
          <div className="landing-page-news-section"></div>
          <div className="landing-page-footer">
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
