import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import './voice.css';
import { FaMicrophone,FaUpload  } from 'react-icons/fa';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioElement = useRef(null);
  const recordedAudio = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const openUploadModal = () => {
    setUploadModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

    const closeUploadModal = () => {
    setUploadModalIsOpen(false);
  };

  const startRecording = () => {
    audioChunks.current = [];
    setTimer(0);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.current.push(e.data);
          }
        };

        mediaRecorder.current.onstop = () => {
          clearInterval(timerInterval); // Detener el temporizador
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          audioElement.current.src = audioUrl;
          setRecording(false);

          // Aquí puedes guardar el archivo de audio si es necesario.
          recordedAudio.current = audioBlob;
        };

        mediaRecorder.current.start();
        setRecording(true);

        // Iniciar el temporizador
        const timerInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
      })
      .catch((error) => console.error('Error al acceder al micrófono:', error));
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  return (

  <div className='Principal'>

    <div className='botones'>

   <button onClick={openUploadModal}><FaMicrophone size={32} /> </button>
    <Modal
          isOpen={uploadModalIsOpen}
          onRequestClose={closeUploadModal}
          contentLabel=" Audio"
    >
    <div className='audio-recorder-container'>
      <audio className='audio-recorder-audio' controls ref={audioElement}></audio>
      <div className='timer'>
        Duración de Grabación: {timer} segundos
      </div>
      <button className='audio-recorder-button' onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Detener Grabación' : 'Comenzar Grabación'}
      </button>
      <button onClick={closeUploadModal}>Cerrar</button>
         
    </div>


    </Modal>
    
     <button onClick={openModal}><FaUpload size={32}/></button>
     
     <Modal
     isOpen={modalIsOpen}
     onRequestClose={closeModal}
     contentLabel="Subir Audio"
     className="Modal"
   >
     <div className='container'>
       <h2>Subir Audio</h2>
       <form>
         <label>Subir archivo de audio:</label>
         <input className='btn1' type="file" accept="audio/*" />

         <label>O ingrese un enlace de YouTube:</label>
         <input type="text" placeholder="Enlace de YouTube" />

         <button type="submit">Subir</button>
         <button onClick={closeModal}>Cerrar</button>
       </form>
     </div>
   </Modal>

   </div>

   </div>







  );
}

export default AudioRecorder;
