import React from 'react'
import "./Audio.css"

function Audio(props) {
  
  return (
    <div className='audio-container'>
       <audio className='audioplayer' src={props.audio} preload="auto" controls></audio>
    </div>
  );
}

Audio.propTypes = {}

export default Audio