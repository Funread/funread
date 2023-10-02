import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import "./SignUp.css";
import { useSign } from "../../hooks/useSign";
import { InputGroup } from "react-bootstrap";

function SignUp(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useSign();

  /**
   * Function tooglePassword:
   * Alterna la contraseña entre estados: oculto/mostrar.
   * Cambia el color del ícono de ojo en la contraseña según su estado: oculto/mostrar.
   */
  const togglePassword = () => {
    setShowPassword(!showPassword);
    showPassword
      ? (document.getElementById("singup-passwordButton").style.color = "#0000007b")
      : (document.getElementById("singup-passwordButton").style.color = "#42006d");
  };

  /**
   * Function handleSubmit:
   * Recibe los datos ingresados por el usuario en los campos del formulario.
   * Se ejecuta cuando se presiona el botón de Log In.
   * Las variables name, email y password contienen los valores ingresados por el usuario al momento de presionar el boton de Log In.
   */
  const handleSubmit = () => {
    let info = signUp(name, email, password);
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
      ? changeInputColor(id, "#42006d")
      : changeInputColor(id, "#e9e9e9");

    if (id === "singup-passwordInput") {
      data !== ""
        ? (document.getElementById("singup-inputGroupText").style.borderColor =
            "#42006d")
        : (document.getElementById("singup-inputGroupText").style.borderColor =
            "#e9e9e9");
    }
  };

  /**
   * Function changeInputColor:
   * @param {*} id identificador del campo del formulario.
   * @param {*} color color nuevo del campo del formulario.
   *
   * Cambia el color del borde y la letra del formulario, depende de si tiene o no datos.
   */
  const changeInputColor = (id, color) => {
    document.getElementById(id).style.borderColor = color;
    document.getElementById(id).style.color = color;
  };

  /**
   * Function useEffect:
   * Cambia el color del botón de Log In cuando los campos de email y password han sido llenados.
   */
  useEffect(() => {
    name !== "" && email !== "" && password !== ""
      ? (document.getElementById("singup-submit-button").className =
          "signup-form-button-filled")
      : (document.getElementById("singup-submit-button").className =
          "signup-form-button-empty");
  });

  return (
    <div className="signup-form">
      <div className="signup-form-body">
        <Form onSubmit={handleSubmit} className="signup-form-content">
          <h1 className="signup-form-title">Are you new?</h1>
          <h5 className="signup-form-subtitle">
            Add your information to register.
          </h5>
          <div className="signup-form-inputs">
            <Form.Group className="form-group">
              <Form.Label className="font-size">
                <FontAwesomeIcon className="signup-icons" icon={faUser} />
                Your name
              </Form.Label>
              <Form.Control
                id="singup-nameInput"
                size="lg"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  isEmpty(e.target.value, "singup-nameInput");
                }}
                className="signup-form-control-lg"
                placeholder="Your name here"
                required
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="font-size">
                <FontAwesomeIcon className="signup-icons" icon={faEnvelope} />
                Email
              </Form.Label>
              <Form.Control
                id="singup-emailInput"
                size="lg"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  isEmpty(e.target.value, "singup-emailInput");
                }}
                className="signup-form-control-lg"
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
                  id="singup-passwordInput"
                  size="lg"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    isEmpty(e.target.value, "singup-passwordInput");
                  }}
                  style={{ borderRightWidth: 0 }}
                  className="signup-form-control-lg"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  required
                />
                <InputGroup.Text  id="singup-inputGroupText" className="form-input-group-text-password">
                  <Button id="singup-passwordButton" className="signup-form-password-button" onClick={togglePassword}>
                    {showPassword?<FontAwesomeIcon className="fa-xl float end" icon={faEye}/>:<FontAwesomeIcon className="fa-xl float end" icon={faEyeSlash}/>}
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button id="singup-submit-button" className="signup-form-button-empty" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
