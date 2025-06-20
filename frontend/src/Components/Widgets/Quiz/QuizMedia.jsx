import React from 'react';

const QuizMedia = ({ media }) => {
  if (!media || !media.url) {
    console.log('QuizMedia: No media data');
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
            console.error('Error loading image:', media.url);
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
          Your browser does not support the video element.
        </video>
      );
    
    case 'audio':
      return (
        <audio 
          controls 
          className="quiz-media-audio"
        >
          <source src={media.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    
    default:
      return null;
  }
};

export default QuizMedia; 