import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import './voice.css';
import { FaMicrophone, FaUpload } from 'react-icons/fa';

// Componente AudioPlayer
function AudioPlayer({ audioUrl }) {
  return (
    <audio className="audio-recorder-audio" controls>
      <source src={audioUrl} type="audio/wav" />
      Tu navegador no admite la reproducción de audio.
    </audio>
  );
}

function AudioRecorder() {
  // Estado para controlar si se está grabando audio
  const [recording, setRecording] = useState(false);
  // Estado para rastrear la duración de la grabación
  const [timer, setTimer] = useState(0);
  // Estado para mostrar un mensaje de error
  const [errorMessage, setErrorMessage] = useState(null);

  // Referencia al objeto MediaRecorder
  const mediaRecorder = useRef(null);
  // Almacenar fragmentos de audio
  const audioChunks = useRef([]);
  // Referencia al elemento de audio para reproducir grabaciones
  const audioElement = useRef(null);
  // Blob para la grabación de audio
  const recordedAudio = useRef(null);

  // Estado para controlar la apertura y cierre del modal de grabación
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Estado para controlar la apertura y cierre del modal de subida de audio
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);

  // Estado para el archivo de audio cargado
  const [uploadedAudio, setUploadedAudio] = useState(null);

  // Función para abrir el modal de grabación
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Función para abrir el modal de subida de audio
  const openUploadModal = () => {
    setUploadModalIsOpen(true);
  };

  // Función para cerrar el modal de grabación
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Función para cerrar el modal de subida de audio
  const closeUploadModal = () => {
    setUploadModalIsOpen(false);
  };

  // Función para manejar la subida de un archivo de audio
  const handleAudioUpload = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      // Verificar que el archivo sea de tipo "audio"
      if (file.type.startsWith('audio/')) {
        const audioUrl = URL.createObjectURL(file);
        setUploadedAudio(audioUrl);
        closeUploadModal(); // Cerrar el modal de subida de audio
      } else {
        setErrorMessage('El archivo seleccionado no es un archivo de audio válido.');
      }
    }
  };

  // Función para iniciar la grabación de audio
  const startRecording = () => {
    // Limpiar fragmentos de audio y reiniciar el temporizador
    audioChunks.current = [];
    setTimer(0);

    // Obtener acceso al micrófono
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // Inicializar el objeto MediaRecorder con el flujo de audio
        mediaRecorder.current = new MediaRecorder(stream);

        // Manejar eventos de los fragmentos de audio disponibles
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.current.push(e.data);
          }
        };

        // Manejar evento de finalización de la grabación
        mediaRecorder.current.onstop = () => {
          clearInterval(timerInterval); // Detener el temporizador
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          audioElement.current.src = audioUrl;
          setRecording(false);

          // Aquí puedes guardar el archivo de audio si es necesario.
          recordedAudio.current = audioBlob;
        };

        // Iniciar la grabación y el temporizador
        mediaRecorder.current.start();
        setRecording(true);

        const timerInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
      })
      .catch((error) => {
        console.error('Error al acceder al micrófono:', error);
        // Puedes agregar un mensaje de error en la interfaz de usuario aquí
        setErrorMessage('Error al acceder al micrófono. Asegúrate de otorgar los permisos necesarios.');
      });
  };

  // Función para detener la grabación
  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  return (
    <div className="Principal">
      <div className="botones">
        {/* Botón para abrir el modal de subida de audio */}
        <button onClick={openUploadModal}>
          <FaMicrophone size={32} />
        </button>
        {/* Modal de grabación de audio */}
        <Modal
          isOpen={uploadModalIsOpen}
          onRequestClose={closeUploadModal}
          contentLabel="Audio"
        >
          <div className="audio-recorder-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {/* Elemento de audio para reproducir grabaciones */}
            <audio className="audio-recorder-audio" controls ref={audioElement}></audio>
            <div className="timer">
              Duración de Grabación: {timer} segundos
            </div>
            {/* Botón para iniciar o detener la grabación */}
            <button className="audio-recorder-button" onClick={recording ? stopRecording : startRecording}>
              {recording ? 'Detener Grabación' : 'Comenzar Grabación'}
            </button>
            <button onClick={closeUploadModal}>Cerrar</button>
          </div>
        </Modal>

        {/* Botón para abrir el modal de subida de audio */}
        <button onClick={openModal}>
          <FaUpload size={32} />
        </button>
        {/* Modal de subida de audio */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Subir Audio"
          className="Modal"
        >
          <div className="container">
            <h2>Subir Audio</h2>
            <form>
              <label>Subir archivo de audio:</label>
              <input
                className="btn1"
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
              />
              {uploadedAudio && (
                <div className="uploaded-audio-player">
                  <h3>Audio cargado:</h3>
                  <AudioPlayer audioUrl={uploadedAudio} />
                </div>
              )}
              <div className='bot'>
              <button className='sub' type="submit">Subir</button>
              <button className='close' onClick={closeModal}>Cerrar</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AudioRecorder;
