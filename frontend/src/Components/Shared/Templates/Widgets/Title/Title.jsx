import React, { useState } from "react";
import "./Title.css";

function Title(props) {
  const [texto, setTexto] = useState("Título de página");

  return (
    <div className="container-title">
      <p>{texto}</p>
    </div>
  );
}

Title.propTypes = {};

export default Title;
