import React from 'react'
import "./App.css";
import Header from "./Components/Shared/Header";
import Background from "./bg.jpg";
import { Button } from 'react-bootstrap';

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
