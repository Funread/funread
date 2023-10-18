import React, { useState } from 'react';
import styled from 'styled-components';

const VideoGalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 400px; 
  overflow-y: auto; 
`;

const Video = styled.video`
  max-width: 100%;
  height: auto;
  margin: 10px;
`;

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setVideos([...videos, videoUrl]);
  };

  return (
    <div>
      <h1>Agrega un video</h1>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
      />

      <VideoGalleryContainer>
        {videos.map((video, index) => (
          <Video
            key={index}
            controls
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
        ))}
      </VideoGalleryContainer>
    </div>
  );
};

export default VideoGallery;
