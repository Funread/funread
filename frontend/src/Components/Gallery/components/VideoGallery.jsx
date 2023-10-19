import React, { useState } from 'react';

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

      <div className="VideoGallery_video-gallery-container">
        {videos.map((video, index) => (
          <video
            key={index}
            controls
            className="VideoGallery_video"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;

