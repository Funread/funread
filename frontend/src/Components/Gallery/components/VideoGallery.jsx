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

      <div className=' VideoGallery_VideoGalleryContainer '>
        {videos.map((video, index) => (
          <div className=' VideoGallery_Video'
            key={index}
            controls
          >
            <source src={video} type="video/mp4" />
            El navegador no soporta este video
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
