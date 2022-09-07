import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser, faEye } from "@fortawesome/free-regular-svg-icons";
import InputGroup from "react-bootstrap/InputGroup";



 class LogIn extends React.Component {
  render() {
    return (
        <div className='login-form'>
            <Form className='prueba'>
                <h1 className="login-form-title">Hello!</h1>
                <h5 className="login-form-subtitle">
                    Add your information to Log In.
                </h5>
                
                        <Form.Group>
                            <Form.Label>
                                <FontAwesomeIcon className="login-icons" icon={faEnvelope} />
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
                                <FontAwesomeIcon className="login-icons" icon={faLock} />
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
                        <Form.Group>
                        <div class="mb-3 form-check titles-login">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" for="exampleCheck1" >Remember me</label>
                                </div>
                        </Form.Group>
                        <Button className="login-form-button" type="submit">
                            Log In
                        </Button>
                
            </Form>
            
      </div>
     
      
    )
  }
}

export default LogIn;