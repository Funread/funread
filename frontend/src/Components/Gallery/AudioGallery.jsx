import React, { useState } from 'react';
import styled from 'styled-components';
import AudioPlayer from 'react-audio-player';

const AudioGalleryContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

const AudioItem = styled.div`
  margin: 10px;
`;

const AudioGallery = () => {
  const [audios, setAudios] = useState([]);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    const audioUrl = URL.createObjectURL(file);
    setAudios([...audios, audioUrl]);
  };

  return (
    <div>
      <h1>Agrega un audio</h1>
      <input
        type="file"
        accept="audio/*"
        onChange={handleAudioUpload}
      />

      <AudioGalleryContainer>
        {audios.map((audio, index) => (
          <AudioItem key={index}>
            <AudioPlayer
              src={audio}
              controls
            />
          </AudioItem>
        ))}
      </AudioGalleryContainer>
    </div>
  );
};

export default AudioGallery;
