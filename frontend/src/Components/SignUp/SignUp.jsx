import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser, faEye } from "@fortawesome/free-regular-svg-icons";
import "./SignUp.css";
import InputGroup from "react-bootstrap/InputGroup";
import CustomButton from '../Shared/CustomButton/CustomButton';

class SignUp extends React.Component {
  render() {
    return (
      <div className="signup-form">
        <Form>

          <div className='pr'>
            <CustomButton name={"Log In"} setLogin={this.props.setLogin} setSignup={this.props.setSignup}/>
            <CustomButton name={"Sign Up"} setSignup={this.props.setSignup} setLogin={this.props.setLogin}/>
          </div>

          <h1 className="signup-form-title">Hello!</h1>
          <h5 className="signup-form-subtitle">
            Add your information to register.
          </h5>
          <div>
            <Form.Group>
              <Form.Label className='font-size'>
                <FontAwesomeIcon className="signup-icons" icon={faUser} />
                Your name
              </Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Your name here"
                className='responsive-text'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='font-size'>
                <FontAwesomeIcon className="signup-icons" icon={faEnvelope} />
                Email
              </Form.Label>
              <Form.Control
                size="lg"
                type="email"
                placeholder="example@mep.co.cr"
                className='responsive-text'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='font-size'>
                <FontAwesomeIcon className="signup-icons" icon={faLock} />
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  style={{ borderRightWidth: 0 }}
                  size="lg"
                  type="password"
                  placeholder="Your password"
                  className='responsive-text'
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
