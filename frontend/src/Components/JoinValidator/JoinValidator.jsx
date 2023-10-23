import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./JoinValidator.sass"
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock,faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkJoin,searchCode } from "../../api"
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";

function JoinValidator(props){
    const {code} = useParams()
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [init, setInit] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const passwordLength = (pass) => {
        if(pass.length>=5){
            setPassword(password.substring(0,4))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("")

        if(user!=="" && password!==""){ // si ya creamos una invitacion no tenemos por que crear otra, si el code y password cambiaron quiere decir que ya creamos una invitacion
            checkJoin(code, password).then((res) => {

                dispatch(addUser({
                    userId: 0,
                    email: "desconocido",
                    name: user,
                    lastName: "desconocido",
                    userName: "desconocido",
                    roles: ['invitado','estudiante'], //sugerencia de los roles que podria tener un inivitado
                    jwt: res.data.jwt
            }))
                //para redireccionar se podemos eliminar el codigo de abajo y redireccionar
                let s
                if(res.data.data.classesId===null)
                    s = "al libro con id "+res.data.data.bookid
                else
                    s = "a la clase con id "+res.data.data.classesId
        
                alert("el join es correcto, ahora habria que redireccionar "+s)
                //navigate("/readView/"+res.data.data.bookid) aca redireccionamos, puse una url de ejemplo
            
            }).catch(error => {
                setError(error.response.data.detail)
            })
        }
    };

    useEffect(() => {
        if(init===false){
            searchCode(code).then().catch((error) => {
                if(error.message==="Request failed with status code 404"){
                    setShow(true)
                }
            })
            sessionStorage.clear()
            setInit(true)
        }
    })

    return(
    <div className="join-validator-center">
        <div className="join-validator-container">
            <h1>Bienvenido!</h1>
            <h6>Agrega tu nombre y la contraseña para ingresar a la actividad</h6>
            <Form onSubmit={handleSubmit} className="join-validator-content">
                <Form.Group className="form-group">
                    <Form.Label className="join-validator-font-size">
                        <FontAwesomeIcon className="join-validator-icons" icon={faUser} />
                        User
                    </Form.Label>
                    <Form.Control
                        id="userInput"
                        size="lg"
                        type="text"
                        value={user}
                        onChange={(e) => {
                        setUser(e.target.value);
                        }}
                        className="join-validator-control-lg"
                        placeholder="user1234"
                        required
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className="join-validator-font-size">
                        <FontAwesomeIcon className="join-validator-icons" icon={faLock} />
                        Password
                    </Form.Label>
                    <Form.Control
                    id="passwordInput"
                    size="lg"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        passwordLength(e.target.value);
                    }}
                    className="join-validator-control-lg"
                    type="number"
                    placeholder="Your password"
                    required
                    />
                </Form.Group>
                <Form.Label className="join-validator-font-error">
                    {error}
                </Form.Label>
                <Button className="join-validator-submit-button" type="submit">
                    Join
                </Button>
            </Form>
        </div>
        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
            <Alert show={show} variant="danger" className="join-validator-alert">
                <Alert.Heading>Oh no! Parece que tu link de invitación o código no funciona!</Alert.Heading>
                <p>
                El enlace que has utilizado no es válido o el código proporcionado es incorrecto. Por favor, verifica que estés utilizando un enlace con el formato adecuado.
                Asegúrate de que has ingresado el enlace correctamente y que el código numérico consta de exactamente 14 dígitos.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                <Button onClick={() => navigate("/")} variant="outline-danger">
                    Close me
                </Button>
                </div>
            </Alert>
        </Modal>
    </div>
    );
}

export default JoinValidator