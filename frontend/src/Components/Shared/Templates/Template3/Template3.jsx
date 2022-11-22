import React from "react";
import "./Template3.css";
import Title from "../Widgets/Title/Title";
import Collage from "../Widgets/Collage/Collage";

function Template3(props) {
  return (
    <div className="container-collage">
      <Title />
      <Collage />
    </div>
  );
}

Template3.propTypes = {};

export default Template3;
