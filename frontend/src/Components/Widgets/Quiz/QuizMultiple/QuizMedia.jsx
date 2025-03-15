import React from 'react';

const QuizMedia = ({ media }) => {
  if (!media || !media.url) {
    console.log('QuizMedia: No hay datos de media');
    return null;
  }

  switch (media.type) {
    case 'image':
      return (
        <img 
          src={media.url} 
          alt="Quiz media" 
          className="quiz-media-image"
          onError={(e) => {
            console.error('Error cargando imagen:', media.url);
            e.target.style.display = 'none';
          }}
        />
      );
    
    case 'video':
      return (
        <video 
          controls 
          className="quiz-media-video"
        >
          <source src={media.url} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      );
    
    case 'audio':
      return (
        <audio 
          controls 
          className="quiz-media-audio"
        >
          <source src={media.url} type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      );
    
    default:
      return null;
  }
};

export default QuizMedia; 