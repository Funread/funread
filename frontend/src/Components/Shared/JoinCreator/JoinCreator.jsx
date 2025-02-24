import React, { useState, useEffect } from "react";
import "./JoinCreator.sass"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { new_join } from "../../../api";
import { REACT_APP_API_URL } from '../../../../../env'
function JoinCreator(props){
    //Contaremos con dos props "id" que sera el id del libro o clase, y "type" que sera la palabra clave para identificar cual foreign usar
    //utilizaremos la palabra book si es un libro o classe si es una clase
    const [show, setShow] = useState(false)
    const [code, setCode] =useState("")
    const [password, setPassword] = useState("")
    const [buttonClick, setButtonClick] = useState(0)
    const link = REACT_APP_API_URL+"join/" // este link puede ser cambio en el futuro
    const invitationText = 
    "we invite you to participate in FUNREAD, our educational platform that aims to improve English language skills.\n\n"+
    "Access the experience directly: "+link+code+"\n\n"+
    "Invitation Code: "+code+"\n"+
    "Access code: "+password+"\n\n"

    //esta funcion revisa que tiene el prop type, y coloca el id del prop si encuentra el que concuerda, si no coloca nulo
    const checkType = (type) => type===props.type? props.id : "null"

    const handleShow = () => {
        if(code!=="" && password!==""){ // si ya creamos una invitacion no tenemos por que crear otra, si el code y password cambiaron quiere decir que ya creamos una invitacion
            setShow(true)
        }else{
            new_join(checkType("book"),checkType("classe")).then((res) => {
                setCode(res.data.code)
                setPassword(res.data.password)
                setShow(true)
            })
        }
    };



    const handleClose = () => setShow(false);

    const copyToClipboard = (text,number) => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setButtonClick(number);
    };


    

    return(
    <>
        <div className="join-creator-container">
            <button className="join-creator-button" onClick={handleShow} >Crear Invitacion</button>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Invitar a otro usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="join-creator-data-div">
                    <span className="join-creator-data-tittle">Link de Invitación</span>
                    <span className="join-creator-data-text">{link+code}</span>
                    <button className="join-creator-data-copy" onClick={() => {copyToClipboard(link+code,1)}}>
                        <FontAwesomeIcon className="join-creator-icons" icon={faCopy} />
                    </button>
                    {buttonClick===1?<span className="join-creator-text-copy">Copiado!</span>:<></>}
                </div>
                <div className="join-creator-data-div">
                    <span className="join-creator-data-tittle">Codigo de acceso</span>
                    <span className="join-creator-data-text">{code}</span>
                    <button className="join-creator-data-copy" onClick={() => {copyToClipboard(code,2)}} title="Copiar">
                        <FontAwesomeIcon className="join-creator-icons" icon={faCopy} />
                    </button>
                    {buttonClick===2?<span className="join-creator-text-copy">Copiado!</span>:<></>}
                </div>
                <div className="join-creator-data-div">
                    <span className="join-creator-data-tittle">Contraseña</span>
                    <span className="join-creator-data-text">{password}</span>
                    <button className="join-creator-data-copy" onClick={() => {copyToClipboard(password,3)}}>
                        <FontAwesomeIcon className="join-creator-icons" icon={faCopy} />
                    </button>
                    {buttonClick===3?<span className="join-creator-text-copy">Copiado!</span>:<></>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="join-creator-div-reverse-elements">
                    <Button className="join-creator-button-copy-footer" variant="primary" onClick={() => {copyToClipboard(invitationText,4)}}>
                        Copiar invitacion
                    </Button>
                    {buttonClick===4?<span className="join-creator-text-copy-footer">Copiado!</span>:<></>}
                </div>
                <Button variant="danger" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default JoinCreator