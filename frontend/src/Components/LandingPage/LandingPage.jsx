import React from "react";
import { Row, Col } from "react-bootstrap";
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
    <div>
      <div className="background" style={{ backgroundColor: "#888888" }}>
        <Header />
        <div>
          <Routes>
            <Route exact path="/MyLibrary" element={<MyLibrary />} />
            <Route exact path="/Wizard" element={<Wizard />} />
            <Route exact path="/TestToast" element={<TestToast />} />
          </Routes>
        </div>
        {login ? <LogIn setLogin={setLogin} setSignup={setSignup} /> : null}
        {login ? <WelcomeFooter message={"Welcome Back!"} /> : null}
        {signup ? <SignUp setSignup={setSignup} setLogin={setLogin} /> : null}
        {signup ? <WelcomeFooter message={"Welcome!"} /> : null}
      </div>
    </div>
  );
}

export default LandingPage;
