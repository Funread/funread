import React, { useState, useRef } from 'react';
import './voice.css';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioElement = useRef(null);
  const recordedAudio = useRef(null); // Variable para guardar la grabación

  const startRecording = () => {
    audioChunks.current = [];
    setTimer(0); // Reiniciar el temporizador
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

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

          // Guardar el archivo de audio en la variable recordedAudio
          recordedAudio.current = audioBlob;

          localStorage.setItem('grabacion_de_audio', audioUrl);
        };

        mediaRecorder.current.start();
        setRecording(true);
      })
      .catch((error) => console.error('Error al acceder al micrófono:', error));
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div className='audio-recorder-container'>
      <audio className='audio-recorder-audio' controls ref={audioElement}></audio>
      <div className='timer'>
        Duración de Grabación: {timer} segundos
      </div>
      <button className='audio-recorder-button' onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Detener Grabación' : 'Comenzar Grabación'}
      </button>
    </div>
  );
}

export default AudioRecorder;

