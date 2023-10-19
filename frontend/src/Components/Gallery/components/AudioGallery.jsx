import React, { useState } from 'react';
import AudioPlayer from 'react-audio-player';


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

      <div className=' AudioGallery_AudioGalleryContainer'>
        {audios.map((audio, index) => (
          <div className=' AudioGallery_AudioItem ' key={index}>
            <AudioPlayer
              src={audio}
              controls
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioGallery;
