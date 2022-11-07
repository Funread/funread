import React from 'react'
import "./Text.css"

function Text(props) {
  return (
    <div className='container-text'>
                <p>{props.texto}</p>
    </div>
  );
}

Text.propTypes = {}

export default Text