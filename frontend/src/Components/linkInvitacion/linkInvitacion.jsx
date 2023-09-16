import React, { useState, useEffect,Component } from "react";
import { useParams, useNavigate } from "react-router-dom"
import "./linkInvitacion.css"
import axios from "axios";


function LinkInvitacion(props){
  const params = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('http://localhost:8000/users/getToken/').then((res) => {  //funcion get
      sessionStorage.setItem("jwt",res.data.jwt)
      sessionStorage.setItem("otros datos de usuario",params.datos)
      navigate("/mylibrary");
    });
  });
  return(
    <>
      <div className="linkInvitacion">
        <h1 className="linkInvitacion-text">Cargando ...</h1>
      </div>
    </>
  );
}

export default LinkInvitacion;