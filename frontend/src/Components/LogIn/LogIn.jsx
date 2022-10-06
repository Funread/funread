import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";
import CustomButton from "../Shared/CustomButton/CustomButton";
import { useLogin } from "../../hooks/useLogin";
import { InputGroup } from "react-bootstrap";

function LogIn(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginIn } = useLogin();

  /**
   * Function tooglePassword:
   * Alterna la contraseña entre estados: oculto/mostrar.
   * Cambia el color del ícono de ojo en la contraseña según su estado: oculto/mostrar.
   */
  const togglePassword = () => {
    setShowPassword(!showPassword);
    showPassword
      ? (document.getElementById("passwordButton").style.color = "#e9e9e9")
      : (document.getElementById("passwordButton").style.color = "#42006d");
  };

  /**
   * Function handleSubmit:
   * Recibe los datos ingresados por el usuario en los campos del formulario.
   * Se ejecuta cuando se presiona el botón de Log In.
   * Las variables email y password contienen los valores ingresados por el usuario al momento de presionar el boton de Log In.
   */
  const handleSubmit = () => {
    loginIn(email, password);
  };

  /**
   * Function isEmpty:
   * @param {*} data valor ingresado por el usuario.
   * @param {*} id identificador del campo del formulario.
   *
   * Comprueba si un campo del formulario esta vacio.
   * Asigna un css distinto a los campos con información.
   */
  const isEmpty = (data, id) => {
    data !== ""
      ? (document.getElementById(id).className =
          "form-control-lg-filled form-control form-control-lg")
      : (document.getElementById(id).className =
          "form-control-lg form-control form-control-lg");
  };

  /**
   * Function useEffect:
   * Cambia el color del botón de Log In cuando los campos de email y password han sido llenados.
   */
  useEffect(() => {
    email !== "" && password !== ""
      ? (document.getElementById("submit-button").className =
          "login-form-button-filled")
      : (document.getElementById("submit-button").className =
          "login-form-button-empty");
  });

  return (
    <div className="login-form">
      <div className="account-button-container">
        <CustomButton
          name={"Log In"}
          setLogin={props.setLogin}
          setSignup={props.setSignup}
          style={"account-log-in-button button-active"}
        />
        <CustomButton
          name={"Sign Up"}
          setSignup={props.setSignup}
          setLogin={props.setLogin}
          style={"account-sign-up-button button-inactive"}
        />
      </div>
      <div className="login-form-body">
        <Form onSubmit={handleSubmit} className="login-form-content">
          <h1 className="login-form-title">Hello!</h1>
          <h5 className="login-form-subtitle">
            Add your information to Log In.
          </h5>
          <Form.Group className="form-group">
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
              className="form-control-lg"
              placeholder="example@mep.co.cr"
              required
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label className="font-size">
              <FontAwesomeIcon className="signup-icons" icon={faLock} />
              Password
            </Form.Label>
            <InputGroup className="form-input-group">
              <Form.Control
                id="passwordInput"
                size="lg"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  isEmpty(e.target.value, "passwordInput");
                }}
                style={{ borderRightWidth: 0 }}
                className="form-control-lg-empty"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                required
              />
              <InputGroup.Text className="form-input-group-text-password">
                <Button
                  id="passwordButton"
                  className="login-form-password-button"
                  onClick={togglePassword}
                >
                  <FontAwesomeIcon className="fa-xl float end" icon={faEye} />
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="form-group">
            <div className="mb-3 form-check form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMeCheck"
              />
              <label htmlFor="rememberMeCheck">Remember me</label>
            </div>
          </Form.Group>
          <Button
            id="submit-button"
            className="login-form-button-empty"
            onClick={handleSubmit}
          >
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LogIn;
