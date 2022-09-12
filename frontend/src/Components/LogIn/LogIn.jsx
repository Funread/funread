import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";
import CustomButton from "../Shared/CustomButton/CustomButton";

function LogIn(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
    showPassword
      ? (document.getElementById("passwordButton").style.color = "#e9e9e9")
      : (document.getElementById("passwordButton").style.color = "#42006d");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
  };

  const isEmpty = (data, id) => {
    data !== ""
      ? (document.getElementById(id).className =
          "form-control-lg-filled form-control form-control-lg responsive-text")
      : (document.getElementById(id).className =
          "form-control-lg form-control form-control-lg responsive-text");
  };

  useEffect(() => {
    email !== "" && password !== ""
      ? (document.getElementById("submit-button").className =
          "signup-form-button-filled")
      : (document.getElementById("submit-button").className =
          "signup-form-button-empty");
  });

  return (
    <div className="login-form">
      <div className="account-button-container">
        <CustomButton
          name={"Log In"}
          setLogin={props.setLogin}
          setSignup={props.setSignup}
        />
        <CustomButton
          name={"Sign Up"}
          setSignup={props.setSignup}
          setLogin={props.setLogin}
        />
      </div>
      <Form onSubmit={handleSubmit}>
        <h1 className="login-form-title">Hello!</h1>
        <h5 className="login-form-subtitle">Add your information to Log In.</h5>
        <Form.Group>
          <Form.Label className="font-size">
            <FontAwesomeIcon className="login-icons" icon={faEnvelope} />
            Email
          </Form.Label>
          <Form.Control
            id="emailInput"
            size="lg"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              isEmpty(e.target.value, "emailInput");
            }}
            className="form-control-lg responsive-text"
            placeholder="example@mep.co.cr"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="font-size">
            <FontAwesomeIcon className="login-icons" icon={faLock} />
            Password
          </Form.Label>
          <div>
            <Form.Control
              id="passwordInput"
              size="lg"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                isEmpty(e.target.value, "passwordInput");
              }}
              className="form-control-lg responsive-text"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              required
            />
            <Button
              id="passwordButton"
              className="password-button"
              onClick={togglePassword}
            >
              <FontAwesomeIcon className="fa-xl" icon={faEye} />
            </Button>
          </div>
        </Form.Group>
        <Form.Group>
          <div className="mb-3 form-check titles-login">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMeCheck"
            />
            <label className="form-check-label" htmlFor="rememberMeCheck">
              Remember me
            </label>
          </div>
        </Form.Group>
        <Button
          id="submit-button"
          className="login-form-button-empty"
          type="submit"
        >
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default LogIn;
