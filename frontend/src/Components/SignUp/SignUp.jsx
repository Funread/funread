import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser, faEye } from "@fortawesome/free-regular-svg-icons";
import "./SignUp.css";
import CustomButton from "../Shared/CustomButton/CustomButton";

function SignUp(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
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
    console.log(name);
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
    name !== "" && email !== "" && password !== ""
      ? (document.getElementById("submit-button").className =
          "signup-form-button-filled")
      : (document.getElementById("submit-button").className =
          "signup-form-button-empty");
  });

  return (
    <div className="signup-form">
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
        <h1 className="signup-form-title">Hello!</h1>
        <h5 className="signup-form-subtitle">
          Add your information to register.
        </h5>
        <div>
          <Form.Group>
            <Form.Label className="font-size">
              <FontAwesomeIcon className="signup-icons" icon={faUser} />
              Your name
            </Form.Label>
            <Form.Control
              id="nameInput"
              size="lg"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                isEmpty(e.target.value, "nameInput");
              }}
              className="form-control-lg responsive-text"
              placeholder="Your name here"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-size">
              <FontAwesomeIcon className="signup-icons" icon={faEnvelope} />
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
              <FontAwesomeIcon className="signup-icons" icon={faLock} />
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
                className="form-control-lg-empty"
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
        </div>
        <div>
          <Button
            id="submit-button"
            className="signup-form-button-empty mb-3 flex-fill"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
