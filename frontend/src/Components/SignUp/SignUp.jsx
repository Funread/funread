import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser, faEye } from "@fortawesome/free-regular-svg-icons";
import "./SignUp.css";
import InputGroup from "react-bootstrap/InputGroup";

class SignUp extends React.Component {
  render() {
    return (
      <div className="signup-form">
        <Form>
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
                size="lg"
                type="text"
                placeholder="Your name here"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FontAwesomeIcon className="signup-icons" icon={faEnvelope} />
                Email
              </Form.Label>
              <Form.Control
                size="lg"
                type="email"
                placeholder="example@mep.co.cr"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <FontAwesomeIcon className="signup-icons" icon={faLock} />
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  style={{ borderRightWidth: 0 }}
                  size="lg"
                  type="password"
                  placeholder="Your password"
                />
                <InputGroup.Text className="password-bg">
                  <FontAwesomeIcon className="fa-xl" icon={faEye} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
          <div>
            <Button className="signup-form-button mb-3 flex-fill" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SignUp;
