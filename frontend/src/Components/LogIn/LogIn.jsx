import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser, faEye } from "@fortawesome/free-regular-svg-icons";
import InputGroup from "react-bootstrap/InputGroup";
import CustomButton from '../Shared/CustomButton/CustomButton';



 class LogIn extends React.Component {
  render() {
    return (
        <div className='login-form'>
            <div className='pr'>
                <CustomButton name={"Log In"} setLogin={this.props.setLogin} setSignup={this.props.setSignup}/>
                <CustomButton name={"Sign Up"} setSignup={this.props.setSignup} setLogin={this.props.setLogin}/>
            </div>
            
            <Form>
                <h1 className="login-form-title">Hello!</h1>
                <h5 className="login-form-subtitle">
                    Add your information to Log In.
                </h5>
                
                        <Form.Group>
                            <Form.Label className='font-size'>
                                <FontAwesomeIcon className="login-icons" icon={faEnvelope} />
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
                                <FontAwesomeIcon className="login-icons" icon={faLock} />
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
                        <Form.Group>
                        <div class="mb-3 form-check titles-login">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" for="exampleCheck1" >Remember me</label>
                                </div>
                        </Form.Group>
                        <Button className="login-form-button mb-3 flex-fill" type="submit">
                            Log In
                        </Button>
                
            </Form>
            
      </div>
     
      
    )
  }
}

export default LogIn;