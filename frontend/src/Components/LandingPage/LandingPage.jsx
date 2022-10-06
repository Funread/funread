import React from "react";
import "../../App.css";
import Header from "../Shared/Header/Header";
import SignUp from "../SignUp/SignUp";
import WelcomeFooter from "../Shared/WelcomeFooter/WelcomeFooter";
import "./LandingPage.css";
import LogIn from "../LogIn/LogIn";
import { useState } from "react";

import CustomPopup from "../Shared/PopUp/PopUp";
function LandingPage() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [active, setActive] = useState(false);

  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = () => {
    setVisibility(false);
  };

  const toggle = () =>{
    setActive(!active);
  }

  return (
    <div>
      
      <button style={{
          position: 'absolute',
          top: 0,
          padding: 10,
        }} onClick={() => setVisibility(true)}>open</button>
      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
      >
      </CustomPopup>
    
      <div className="background" style={{ backgroundColor: "#888888" }}>
        <Header />
        {login ? <LogIn setLogin={setLogin} setSignup={setSignup} /> : null}
        {login ? <WelcomeFooter message={"Welcome Back!"} /> : null}
        {signup ? <SignUp setSignup={setSignup} setLogin={setLogin} /> : null}
        {signup ? <WelcomeFooter message={"Welcome!"} /> : null}
        <CustomPopup active={active} toggle={toggle}/>
      </div>
    </div>
  );
}

export default LandingPage;
