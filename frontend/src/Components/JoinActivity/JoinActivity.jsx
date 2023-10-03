import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./JoinActivity.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faEye, faEyeSlash, faSquareCaretRight} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { InputGroup } from "react-bootstrap";

function JoinActivity(props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("")
  const { logIn, axiosAuth,axiosWithoutAuth } = useLogin();
  const navigate = useNavigate();

  /**
   * Function handleSubmit:
   * Recibe los datos ingresados por el usuario en los campos del formulario.
   * Se ejecuta cuando se presiona el botón de Log In.
   * Las variables email y password contienen los valores ingresados por el usuario al momento de presionar el boton de Log In.
   */
  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent default form submission behavior
    setError("")

    axiosWithoutAuth().get("join/search/"+code,).then( () => {
      navigate('/join/'+code);
    }).catch((error) => {
      setError("Invalid code")
    })
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
    if(code !== ""){
      document.getElementById("join-submit-button").className = "join-form-button-filled"
    }else{
      document.getElementById("join-submit-button").className = "join-form-button-empty";
    }
  });

  return (
    <div className="join-form">
      <div className="join-form-body">
        <Form onSubmit={handleSubmit} className="join-form-content">
          <h1 className="join-form-title">You have a code?!</h1>
          <h5 className="join-form-subtitle">
            Add your code to join in the activity.
          </h5>
          <div className="join-form-inputs">
            <Form.Group className="form-group">
              <Form.Label className="font-size">
                <FontAwesomeIcon className="join-icons" icon={faSquareCaretRight} />
                Code
              </Form.Label>
              <Form.Control
                id="codeInput"
                size="lg"
                type="text" // es posible que se cambio el tipo del imput
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  isEmpty(e.target.value, "codeInput");
                }}
                className="join-form-control-lg"
                placeholder="#0000000000"
                required
              />
            </Form.Group>
            <Form.Label className="join-validator-font-error">
              {error}
            </Form.Label>
          </div>
          <Button id="join-submit-button" className="join-form-button-empty" type="submit">
            Join
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default JoinActivity;
