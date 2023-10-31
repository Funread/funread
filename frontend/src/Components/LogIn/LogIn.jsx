import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { InputGroup } from "react-bootstrap";
import { axiosAuth } from "../../api/axiosInstances"
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { sendMail } from "../../api";


function LogIn(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remenber, setRemenber] = useState(false);
  const [check, setCheck] = useState(true);
  const { logIn } = useLogin();
  const navigate = useNavigate();

  /**
   * Function tooglePassword:
   * Alterna la contraseña entre estados: oculto/mostrar.
   * Cambia el color del ícono de ojo en la contraseña según su estado: oculto/mostrar.
   */
  const togglePassword = () => {
    setShowPassword(!showPassword);
    showPassword
      ? (document.getElementById("passwordButton").style.color = "#0000007b")
      : (document.getElementById("passwordButton").style.color = "#42006d");
  };

  /**
   * Function handleSubmit:
   * Recibe los datos ingresados por el usuario en los campos del formulario.
   * Se ejecuta cuando se presiona el botón de Log In.
   * Las variables email y password contienen los valores ingresados por el usuario al momento de presionar el boton de Log In.
   */
  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent default form submission behavior
    sessionStorage.clear();
    try {
      if(remenber){
        localStorage.setItem('RemenberEmail',email)
      }else{
        localStorage.removeItem('RemenberEmail')
      }
    } catch (error) {
      console.log('algun error ocure')
      console.error(error)
    }
    logIn(email, password).then((res) => {  
      //Esto debe hacerce para evitar que axiosAuth revise si el token existe antes de terminar el login
      if(axiosAuth() !== null){
        sendMail("Estimado/a [Nickname],\n\n¡Te damos la más cordial bienvenida a FUNREAD! Estamos emocionados de tenerte a bordo y queremos agradecerte por unirte a nuestra comunidad de aprendizaje de inglés.\n\nTu participación en FUNREAD es fundamental, y confiamos en que te desempeñarás excepcionalmente en el(los) rol(es) que has elegido. Ya sea que seas un ayudante, estudiante, profesor, director, padre de familia o cualquier otro rol que hayas seleccionado, tu contribución será valiosa para el éxito de nuestra plataforma.\n\nEn FUNREAD, te ofrecemos una experiencia única para aprender y mejorar tus habilidades en inglés. Nuestros recursos y herramientas están diseñados para que puedas alcanzar tus metas de aprendizaje de la manera más efectiva y divertida.\n\nUna vez más, gracias por unirte a FUNREAD. Estamos seguros de que tendrás una experiencia enriquecedora con nosotros. ¡Estamos emocionados de verte alcanzar tus objetivos de aprendizaje de inglés!\n\nSi tienes alguna pregunta o necesitas asistencia, no dudes en comunicarte con nosotros. ¡Te deseamos mucho éxito en tu viaje de aprendizaje de inglés!\n\nSaludos cordiales,\nEquipo de FUNREAD",'¡Bienvenido a FUNREAD, USER!',"anthony.michael.g.s@gmail.com")
        navigate('/dashboard');
      }else{
        setPassword("")
        alert(res+'\n\n\n(cambiar esta alerta a futuro para mostrar los errores de mejor manera, LogIn.jsx:61)')
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

  /**
   * Function useEffect:
   * Cambia el color del botón de Log In cuando los campos de email y password han sido llenados.
   */
  useEffect(() => {
    if(email !== "" && password !== ""){
      document.getElementById("submit-button").className = "login-form-button-filled"
    }else{
      document.getElementById("submit-button").className = "login-form-button-empty";
    }
    if(check === true){
      setCheck(false)
      let remenberValue = localStorage.getItem('RemenberEmail')
      if(remenberValue != null){
        document.getElementById("emailInput").value = remenberValue
        setEmail(remenberValue)
        isEmpty(remenberValue,"emailInput")
        document.getElementById("rememberMeCheck").checked = true
        setRemenber(true)
      }
    }
  });

  return (
    <div className="login-form">
      <div className="login-form-body">
        <Form onSubmit={handleSubmit} className="login-form-content">
          <h1 className="login-form-title">Welcome Back!</h1>
          <h5 className="login-form-subtitle">
            Add your information to Log In.
          </h5>
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
                    {showPassword?<FontAwesomeIcon className="fa-xl float end" icon={faEye}/>:<FontAwesomeIcon className="fa-xl float end" icon={faEyeSlash}/>}
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="form-group">
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMeCheck"    
                  onChange={(e) => {
                    setRemenber(e.target.checked);
                  }}
                  />
                <label htmlFor="rememberMeCheck">Remember me</label>
              </div>
            </Form.Group>
            <Button id="submit-button" className="login-form-button-empty" type="submit">
              Log In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LogIn;
