import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import './voice.css';
import { FaMicrophone, FaUpload } from 'react-icons/fa';
import { useDrag } from "react-dnd";
import { save_Image } from '../../../../api/media'
import { ToastContainer, toast } from 'react-toastify'



const widgetType = "widgetType";

function AudioPlayer({ audioUrl, updateAudioDuration}) {
  const handleTimeUpdate = (e) => {
    const duration = e.target.duration;
    updateAudioDuration(duration);
  };

  return (
    <audio className='audio-recorder-audio' controls onTimeUpdate={handleTimeUpdate}>
      <source src={audioUrl} type='audio/mp3' />
      Tu navegador no admite la reproducción de audio.
    </audio>
  );
}

function AudioRecorder({ onWidgetChange }) {
  const [audioDuration, setAudioDuration] = useState(0);
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioElement = useRef(null);
  const recordedAudio = useRef(null);const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [uploadedAudio, setUploadedAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioKey, setAudioKey] = useState(0);
  const [selectedAudio,setSelectAudio] = useState()

  useEffect(() => {
    let intervalId;

    if (recording) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [recording]);

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

  const updateAudioDuration = (duration) => {
    setAudioDuration(duration);
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setSelectAudio(file);
        const audioUrl = URL.createObjectURL(file);
        setUploadedAudio(audioUrl);
        setAudioKey((prevKey) => prevKey + 1);

        closeUploadModal();
      } else {
        setErrorMessage('El archivo seleccionado no es un archivo de audio válido.');
      }
    }
  };

  const handleTimeUpdate = (e) => {
    const duration = e.target.duration;
    updateAudioDuration(duration);
  };

  const startRecording = () => {
    audioChunks.current = [];
    setTimer(0);
    setAudioUrl(null);
  
    navigator.mediaDevices
      .getUserMedia({ audio: true,video: false })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
  
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.current.push(e.data);
          }
        };
  
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp3' });
          const newAudioUrl = URL.createObjectURL(audioBlob);

          const audioFile = new File([audioBlob], 'audio.mp3',{ type: 'audio/mp3' });
          setSelectAudio(audioFile)
  
          // Comienza la carga asíncrona
          fetch(newAudioUrl)
            .then(response => response.blob())
            .then(blob => {
            
              setAudioUrl(newAudioUrl);
              audioElement.current.src = newAudioUrl;
              audioElement.current.load();
  
              audioElement.current.onloadedmetadata = () => {
                setAudioDuration(audioElement.current.duration);
              };
  
              setRecording(false);
            })
            .catch(error => {
              console.error('Error durante la carga asíncrona:', error);
              setErrorMessage('Error durante la carga asíncrona.');
            });
        };

        setRecording(true);
        mediaRecorder.current.start();
      })
      .catch((error) => {
        console.error('Error al acceder al micrófono:', error);
        setErrorMessage('Error al acceder al micrófono. Asegúrate de otorgar los permisos necesarios.');
      });
  };
  





const stopRecording = () => {
  if (mediaRecorder.current) {
    mediaRecorder.current.stop();
  }
};

const SaveChangesBD = async (event) => {
  event.preventDefault();
  try {
    if (selectedAudio) {
      const response = await save_Image(selectedAudio)
      onWidgetChange({ type: 'AudioRecorder', data: {data:response.data.file} })
      toast.success(
        'Audio enviada exitosamente a la base de datos',
      )
      closeModal();
      closeUploadModal();
    } else {
      toast.error('No se ha seleccionado un archivo de Audio.')
    }
  } catch (error) {
    toast.error('Erro al guardar el audio')
    console.error('Error al guardar el Audio:', error)
  }
}

const [{ isDragging }, drag] = useDrag(() => ({
  type: widgetType,
  item: { type: 'AudioRecorder' },
  //La funcion collect es opcional
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging(),
  }),
}))



  return (
    <div   ref={drag} style={{ border: isDragging ? '5px solid pink' : '0px' }}>
      <div className='card custom-voice-recorder-card'>
        <div className='custom-voice-recorder-body'>
          <button onClick={openUploadModal}>
            <FaMicrophone size={32} />
          </button>
          <Modal
            isOpen={uploadModalIsOpen}
            onRequestClose={closeUploadModal}
            contentLabel='Audio'
          >
            <div className='audio-recorder-container'>
              {errorMessage && <p className='error-message'>{errorMessage}</p>}
              <audio
                className='audio-recorder-audio'
                controls
                ref={audioElement}
                onTimeUpdate={handleTimeUpdate}
              ></audio>
              <div className='timer'>Tiempo: {timer} segundos</div>
              <button
                className='audio-recorder-button'
                onClick={recording ? stopRecording : startRecording}
              >
                {recording ? 'Detener Grabación' : 'Comenzar Grabación'}
              </button>
              <button onClick={SaveChangesBD}>Guardar</button>
              <button onClick={closeUploadModal}>Cerrar</button>
            </div>
          </Modal>

          <button onClick={openModal}>
            <FaUpload size={32} />
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel='Subir Audio'
            className='Modal'
          >
            <div className='voice-recorder-custom-container'>
              <h2>Subir Audio</h2>
              <form>
                <label>Subir archivo de audio:</label>
                <input
                  className='btn1'
                  type='file'
                  accept='audio/*'
                  onChange={handleAudioUpload}
                />
                {uploadedAudio && (
                  <div className='uploaded-audio-player'>
                    <h3>Audio cargado:</h3>
                    <AudioPlayer key={audioKey} audioUrl={uploadedAudio} updateAudioDuration={updateAudioDuration} />
                  </div>
                )}
              
                <div className='bot'>
                  <button className='sub' onClick={SaveChangesBD}>
                    Guardar
                  </button>
                  <button className='close' onClick={closeModal}>
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AudioRecorder;
