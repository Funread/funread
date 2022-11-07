import React from 'react'
import "./Image.css"

function Image(props) {
  return (
    <div className='image-container'>
      <img
        className="image"
        src={props.imagen}
        alt="First slide"
      />
    </div>
  );
}

Image.propTypes = {}

export default Image