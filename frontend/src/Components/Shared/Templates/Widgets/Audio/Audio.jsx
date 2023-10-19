import React, {useState} from 'react'
import Audio_Prueba from "./Audio_Prueba.mp3"
import "./Audio.sass"

function Audio(props) {

  const [audio, setAudio] = useState(Audio_Prueba);

  return (
    <div className='audio-container'>
       <audio className='audioplayer' src={audio} preload="auto" controls></audio>
    </div>
  );
}

Audio.propTypes = {}

export default Audio