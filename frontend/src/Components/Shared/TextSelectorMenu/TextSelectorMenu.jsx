import React, { useState, useEffect, useRef } from "react";
import "./TextSelectorMenu.css"
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { google_translate } from "../../../api";
import volume_high from "./img/volume_high.ico"
import volume_medium from "./img/volume_medium.ico"
import volume_low from "./img/volume_low.ico"
import volume_silence from "./img/volume_silence.ico"


function TextSelectorMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const menuRef = useRef(null);
  const [Text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loadingSpeech, setLoadingSpeech] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [showLenguages, setShowLenguages] = useState(0);
  const voices = window.speechSynthesis.getVoices();
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [volume, setVolume] = useState(0.8);

  
      function showCustomMenu(event) {
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
              showCustomMenu(event);  // Llama a showCustomMenu con el evento
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


    const textTranslated = async () => {
      setLoadingText(true);
      google_translate(Text,"es").then(res => {
        setTranslatedText(res.data.translated_text);
        setShow(true);
        setLoadingText(false)
        setShowMenu(false)
      })
      .catch(e => {
        alert('Ha ocurrido un problema al momento de traducir\nERROR:'+e.message)
        setLoadingText(false);
      });
    }

    const textToSpeech = () => {
      setLoadingSpeech(true)
      const speech = new SpeechSynthesisUtterance(Text);
      if(selectedVoice){
        speech.voice = selectedVoice
      }
      //parseFloat
      speech.volume = volume 
      window.speechSynthesis.speak(speech);
      setLoadingSpeech(false)
    };

    const renderVoiceOptions = () => {
      return voices.map((voice) => (
        <option key={voice.name} value={voice.name}>
          {voice.name}
        </option>
      ));
    };

    const handleChangeVoice = (event) => {
      const selectedVoiceName = event.target.value;
      const voice = voices.find((v) => v.name === selectedVoiceName);
      setSelectedVoice(voice);
      const speech = new SpeechSynthesisUtterance('this is my voice');
      speech.voice = voice
      speech.volume = volume 
      window.speechSynthesis.speak(speech);
    };

    return(
      <div className="text-selector-menu-container">
        <div id="customMenu" className={showMenu?"text-selector-menu-menu-active":"text-selector-menu-menu-desactive"} ref={menuRef}>
          <div className="text-selector-menu-menu-direction"></div>
          <div className="text-selector-menu-buttons-text-to-speech">
            <button onClick={() => textToSpeech()}>
              {loadingSpeech?<Spinner animation="border" size="sm" />:''}
              Escuchar
            </button>
            <button onClick={() => {setShowLenguages(!showLenguages);}}>
              <span>...</span>
            </button>
          </div>
          <hr />
          <button onClick={() => textTranslated()}>{loadingText?<Spinner animation="border" size="sm" />:''}Traducir</button> 
        </div>
        <Overlay target={menuRef.current} show={show} placement="bottom">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              {translatedText}
            </Tooltip>
          )}
        </Overlay>
        <Modal show={showLenguages} onHide={() => {setShowLenguages(!showLenguages)}}>
            <Modal.Header closeButton>
              <Modal.Title>Selecciona una Voz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <select className="text-selector-menu-voie-selector" value={selectedVoice ? selectedVoice.name : ""} onChange={handleChangeVoice}>
              {renderVoiceOptions()}
            </select>
            <div className="text-selector-menu-voie-volume-div">
            <img src={volume>=0.7?volume_high:
                      volume>=0.35?volume_medium:
                      volume>=0.01?volume_low:
                      volume_silence}
            alt="audio" className="text-selector-menu-volume-icon" onClick={ () => {if(volume!==0){setVolume(0)}else{setVolume(0.8)}} }/>

            <input className="text-selector-menu-voice-volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => {setVolume(e.target.value)}}/>
            
            <p>{Math.round(volume * 100) + '%'}</p>
            </div>
            </Modal.Body>
          </Modal>
      </div>
    );

}

export default TextSelectorMenu;