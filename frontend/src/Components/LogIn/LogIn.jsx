import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";
import InputGroup from "react-bootstrap/InputGroup";

function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="login-form">
      <Form className="prueba" onSubmit={handleSubmit}>
        <h1 className="login-form-title">Hello!</h1>
        <h5 className="login-form-subtitle">Add your information to Log In.</h5>
        <Form.Group>
          <Form.Label>
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
            className="form-control-lg"
            placeholder="example@mep.co.cr"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <FontAwesomeIcon className="login-icons" icon={faLock} />
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
              className="form-control-lg"
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
        <Form.Group>
          <div class="mb-3 form-check titles-login">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
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
