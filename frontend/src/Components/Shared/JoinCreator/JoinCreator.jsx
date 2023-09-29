import React, { useState, useEffect } from "react";
import "./JoinCreator.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

function JoinCreator(props){
    const [show, setShow] = useState(false)
    const [code, setCode] =useState("000000")
    const [password, setPassword] = useState("123456")
    const link = "localhost:3000/demo/join/"

    const handleShow = () => {

        

        setShow(true)
    };



    const handleClose = () => setShow(false);

    const copyToClipboard = (text) => {
        const el = document.createElement('textarea');  // Create a temporary textarea element
        el.value = text;  // Set the value to the text you want to copy
        document.body.appendChild(el);  // Append the textarea to the document
        el.select();  // Select the text in the textarea
        document.execCommand('copy');  // Copy the selected text to the clipboard
        document.body.removeChild(el);  // Remove the temporary textarea
        alert('Copied to clipboard: ' + text);
    };


    

    return(
    <div className="centrado">
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
                    <button className="join-creator-data-copy" onClick={() => {copyToClipboard(link+code)}}>
                        <FontAwesomeIcon className="join-creator-icons" icon={faCopy} />
                    </button>
                </div>
                <div className="join-creator-data-div">
                    <span className="join-creator-data-tittle">Codigo de acceso</span>
                    <span className="join-creator-data-text">{code}</span>
                    <button className="join-creator-data-copy" onClick={() => {copyToClipboard(code)}} title="Copiar">
                        <FontAwesomeIcon className="join-creator-icons" icon={faCopy} />
                    </button>
                </div>
                <div className="join-creator-data-div">
                    <span className="join-creator-data-tittle">Contraseña</span>
                    <span className="join-creator-data-text">{password}</span>
                    <button className="join-creator-data-copy" onClick={() => {copyToClipboard(password)}}>
                        <FontAwesomeIcon className="join-creator-icons" icon={faCopy} />
                    </button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {copyToClipboard("Invitacion de FUNRED")}}>
                    Copiar invitacion
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
    );
}

export default JoinCreator