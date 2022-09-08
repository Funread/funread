import React from "react";
import "../../App.css";
import Header from "../Shared/Header/Header";
import SignUp from "../SignUp/SignUp";
import WelcomeFooter from "../Shared/WelcomeFooter/WelcomeFooter";
import "./LandingPage.css";
import LogIn from "../LogIn/LogIn";
import { useState } from "react";

function LandingPage() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  return (
    <div>
      <div className="background" style={{ backgroundColor: "#42006D" }}>
        <Header setLogin={setLogin} setSignup={setSignup} />
        {login ? <LogIn /> : null}
        {login ? <WelcomeFooter message={"Welcome Back!"} /> : null}
        {signup ? <SignUp /> : null}
        {signup ? <WelcomeFooter message={"Welcome!"} /> : null}
      </div>
    </div>
  );
}

export default LandingPage;
