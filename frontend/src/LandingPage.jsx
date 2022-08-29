import React from 'react'
import "./App.css";
import Header from "./Components/Header";
import Background from "./bg.jpg";

function LandingPage() {
  return (
    <div>
      <div
        className="background"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <Header />
      </div>
    </div>
  )
}


export default LandingPage
