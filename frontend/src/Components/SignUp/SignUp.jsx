import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser, faEye } from "@fortawesome/free-regular-svg-icons";
import "./SignUp.css";
import InputGroup from "react-bootstrap/InputGroup";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const isEmpty = (data, id) => {
    data !== ""
      ? (document.getElementById(id).className =
          "form-control-lg-filled form-control form-control-lg")
      : (document.getElementById(id).className =
          "form-control-lg form-control form-control-lg");
  };

  return (
    <div className="signup-form">
      <Form onSubmit={handleSubmit}>
        <h1 className="signup-form-title">Hello!</h1>
        <h5 className="signup-form-subtitle">
          Add your information to register.
        </h5>
        <div>
          <Form.Group>
            <Form.Label>
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
              className="form-control-lg"
              placeholder="Your name here"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
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
              className="form-control-lg"
              placeholder="example@mep.co.cr"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FontAwesomeIcon className="signup-icons" icon={faLock} />
              Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="passwordInput"
                style={{ borderRightWidth: 0 }}
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
              <InputGroup.Text className="password-bg-empty">
                <div onClick={togglePassword}>
                  <FontAwesomeIcon className="fa-xl" icon={faEye} />
                </div>
              </InputGroup.Text>
            </InputGroup>
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
