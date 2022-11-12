import React, {useState} from 'react'
import "./Audio.css"

function Audio(props) {

  const [audio, setAudio] = useState("https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/11/file_example_MP3_700KB.mp3");

  return (
    <div className='audio-container'>
       <audio className='audioplayer' src={audio} preload="auto" controls></audio>
    </div>
  );
}

Audio.propTypes = {}

export default Audio