import React, { useState, useEffect, useRef } from "react";
import "./TextSelectorTraslate.css"
import Modal from 'react-bootstrap/Modal';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useLogin } from "../../../hooks/useLogin";

function TextSelectorTraslate() {
  const [showMenu, setShowMenu] = useState(false)
  const [show, setShow] = useState(false);
  const menuRef = useRef(null)
  const [Text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const { axiosWithoutAuth } = useLogin()

  
      function showCustomMenu(event,text) {
        event.preventDefault();  // Evita el menú predeterminado del navegador
      
        const menu = menuRef.current;
        if(menu){
          menu.style.top = `${event.clientY}px`;
          menu.style.left = `${event.clientX}px`;
        }
        // Event listener para cerrar el menú cuando se hace clic fuera de él
        document.addEventListener('click', handleOutsideClick);
        setShowMenu(true)
      }

      function handleOutsideClick(event) {
        const menu = menuRef.current;
        if (menu && !menu.contains(event.target)) {
            setShow(false)
            setShowMenu(false)
            document.removeEventListener('click', handleOutsideClick);
        }
    }

    useEffect(() => {
      document.addEventListener('contextmenu', (event) => {
        setShow(false)
        const text = window.getSelection().toString();
          if (text) {
              setText(text)
              showCustomMenu(event,text);  // Llama a showCustomMenu con el evento
          }else{
            setShowMenu(false);
          }
      });
      
      // Limpiar el event listener cuando el componente se desmonta
      return () => {
          document.removeEventListener('contextmenu', showCustomMenu);
          document.removeEventListener('click', handleOutsideClick);
      };
    }, []);  // Solo se suscribe y cancela la suscripción en el montaje y desmontaje


    const textTranslated = () => {
      axiosWithoutAuth().post('/translate/googleTraslate/',{text:Text,target_language:"es"}).then(res => {
        setTranslatedText(res.data.translated_text);
        setShowMenu(false)
        setShow(true);
      })
    }

    const textToSpeech = () => {
      axiosWithoutAuth().post('/translate/texttospeech/',{text:Text}).then(res => {
        const audioBase64 = res.data.audio_base64;
        const audioUrl = `data:audio/mp3;base64,${audioBase64}`;
        const audio = new Audio(audioUrl);
        audio.play();
        //setShowMenu(false)
      })
      .catch(error => console.error('Error fetching audio:', error));
    };

    return(
      <div className="text-selector-translate-container">
        <div id="customMenu" className={showMenu?"text-selector-translate-menu-active":"text-selector-translate-menu-desactive"} ref={menuRef}>
            <div className="text-selector-translate-menu-direction"></div>
            <button onClick={() => textToSpeech()}>Escuchar</button>
            <hr />
            <button onClick={() => textTranslated()}>Traducir</button> 
        </div>
        <Overlay target={menuRef.current} show={show} placement="bottom">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              {translatedText}
            </Tooltip>
          )}
        </Overlay>
      </div>
    );

}

export default TextSelectorTraslate;