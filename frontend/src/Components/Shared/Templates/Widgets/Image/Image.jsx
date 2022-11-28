import React, {useState} from 'react'
import "./Image.css"

function Image(props) {
  const [img, setImage] = useState("https://picsum.photos/300/300?image=100");
  return (
    <div className='image-container'>
      <img
        className="image"
        src={img}
        alt="First slide"
      />
    </div>
  );
}

Image.propTypes = {}

export default Image