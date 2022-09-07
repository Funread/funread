import React from "react";
import "../../App.css";
import Header from "../Shared/Header/Header";
import Background from "../../bg.jpg";
import SignUp from "../SignUp/SignUp";
import WelcomeFooter from "../Shared/WelcomeFooter/WelcomeFooter";
import "./LandingPage.css";
import LogIn from "../LogIn/LogIn";
import { render } from "@testing-library/react";
import { faHomeLgAlt } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react"; 



function LandingPage() {
  const[login, setLogin] = useState(false);
  const[signup, setSignup] = useState(false);
    return (
      <div>
        <div className="background" style={{ backgroundColor: "#42006D" }}>
          <Header setLogin={setLogin} setSignup={setSignup}/>
          {login ? <LogIn/>:null}
          {login ? <WelcomeFooter message={"Welcome Back!"} />:null}
          {signup ? <SignUp/>:null}
          {signup ? <WelcomeFooter message={"Welcome!"} />:null}
          
          {/* {signup ? <SignUp/>:null} */}
          {/* <SignUp /> */}
          
        </div>
      </div>
    );
  
  
}

export default LandingPage;
