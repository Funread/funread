import React, { useState, useRef } from 'react';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioElement = useRef(null);

  const startRecording = () => {
    audioChunks.current = [];
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
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          audioElement.current.src = audioUrl;
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
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Detener Grabación' : 'Comenzar Grabación'}
      </button>
      <audio controls ref={audioElement}></audio>
    </div>
  );
}

export default AudioRecorder;