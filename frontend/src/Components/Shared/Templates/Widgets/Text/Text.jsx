import React, {useState} from 'react'
import "./Text.css"

function Text(props) {
  const [texto, setTexto] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas eget orci eu imperdiet. Vivamus eros ligula, ornare eu lorem sed, vehicula consectetur mi.");

  return (
    <div className='container-text'>
                <p>{texto}</p>
    </div>
  );
}

Text.propTypes = {}

export default Text