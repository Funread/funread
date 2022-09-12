import React, { useState } from "react";
import "./CustomButton.css";
import { Button } from "react-bootstrap";

function CustomButton(props) {
  const [state, setState] = useState(false);

  const setName = () => {
    if (props.name === "Log In") {
      props.setLogin(true);
      props.setSignup(false);
    } else {
      props.setSignup(true);
      props.setLogin(false);
    }
  };

  const setFocus = () => {
    setState(!state);
  };

  return (
    <>
      <Button
        variant="outline-light"
        onClick={() => {
          setName();
          setFocus();
        }}
        className={"account-button " + (state ? "account-button-focused" : "")}
      >
        {props.name}
      </Button>
    </>
  );
}

export default CustomButton;
