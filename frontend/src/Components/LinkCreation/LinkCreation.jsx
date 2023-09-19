import React, { useState, useEffect,Component } from "react";
import { useParams, useNavigate } from "react-router-dom"
import "./LinkCreation.css"
import axios from "axios";


function LinkCreation(props){
    const [link, setLink] = useState()

  function generate(){
    let result = 'http://localhost:3000/InvitedStudent/';
    result = result + Math.floor(Math.random() * 30)
    result = result + '_'+Math.floor(Math.random() * 60)
    result = result + 'skfgbnoiHJKBNEIDGN'
    setLink(result);
  }

  return(
    <>
      <div className="linkInvitacion">
        <button onClick={generate}>Generar</button>
        <h1 className="linkInvitacion-text">Tu link generado es: {link}</h1>
      </div>
    </>
  );
}

export default LinkCreation;