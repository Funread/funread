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
  const { logIn,axiosAuth } = useLogin();

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

    logIn(email, password).then(() => {  //Esto debe hacerce para evitar que axiosAuth revise si el token existe antes de terminar el login
      if(axiosAuth() !== null){
        //hacer cambio de pagina
        console.log('login exitoso')
      }else{
        console.log('Contraseña o correo incorrecto')
      }
    }
    );

    // Esto es un ejemplo de como utilizar el hook useLogin, especificamente la constante axiosAuth

  // if(axiosAuth() !== null){                            -Primero hacemos un if que confirme que podemos usar axiosAuth
    //   axiosAuth().get("users/list/").then((res) => {   - Hacemos nuestra consulta, Nota: no se debe colocar toda la url, el endpoint pincipal ya esta en la instancia de axios (http://localhost:8000/) por lo que colocamos la porcion del endpoint que falta para realizar la consulta, en este caso "users/list/"
    //     console.log(res.data)                          - Obtenemos nuestros resultados, podemos usar res.data, res.headers, res.status, entre algunos mas
    //   })
    // }else{                           -Encaso de no poder usar axiosAuth, podemos hacer diferentes accioes, informar que no se puede usar, movernos a la pagina de login, lo que se necesite en el momento
    //   console.log("unAuthenticaded")
    // }
    
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

    if (id === "passwordInput") {
      data !== ""
        ? (document.getElementById("inputGroupText").style.borderColor =
            "#42006d")
        : (document.getElementById("inputGroupText").style.borderColor =
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

  const helperShow= () => {
    const element = document.getElementById("Login-Form-helper")
    if(element.className == 'Login-Form-helper-show'){
      element.className = ''
    }else{
      element.className = 'Login-Form-helper-show'
    }
  }

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
      <div className="login-account-button-container">
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
          <div id="Login-Form-helper" onClick={helperShow}>
          <h3>?</h3>
          </div>
          <div className="login-form-inputs">
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
                className="login-form-control-lg"
                placeholder="example@mep.co.cr"
                required
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="font-size">
                <FontAwesomeIcon className="login-icons" icon={faLock} />
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
                  className="login-form-control-lg"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  required
                />
                <InputGroup.Text
                  id="inputGroupText"
                  className="form-input-group-text-password"
                >
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
          </div>
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
