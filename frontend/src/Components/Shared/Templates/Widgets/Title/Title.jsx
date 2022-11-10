import React from 'react'
import "./Title.css"

function Title(props) {
  return (
    <div className='container-title'>
                <p>{props.texto}</p>
    </div>
  );
}

Title.propTypes = {}

export default Title