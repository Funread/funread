import React, { useState } from "react";
import "./Title.sass";

function Title(props) {
  const [title, setTitle] = useState("Título de página");

  return (
    <div className="container-title">
      <p>{title}</p>
    </div>
  );
}

Title.propTypes = {};

export default Title;
