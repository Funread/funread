import React, { useState } from 'react'
import "./Text.css"



function Text(props) {
  const [texto, setTexto] = useState("hola esto es una prueba");
  return (
    <div className='container-text'>
                <p>{texto}</p>
    </div>
  );
}

Text.propTypes = {}

export default Text