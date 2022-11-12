import React from 'react'
import "./Collage.css"

function Collage(props) {
  return (
            <div className='collage-container'>
                {props.galeria.map((image, i) => (
                    <img class="image-item" key={i} src={image} alt="" />
                ))}
            </div>
            
  );
}

Collage.propTypes = {}

export default Collage