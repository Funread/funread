import React, { useState } from "react";
import "./Collage.css";

const images = [
  "https://picsum.photos/200/300?image=1050",
  "https://picsum.photos/300/300?image=206",
  "https://picsum.photos/300/300?image=206",
  "https://picsum.photos/300/300?image=206",
  "https://picsum.photos/300/300?image=206",
  "https://picsum.photos/300/300?image=206",
  "https://picsum.photos/300/300?image=206",
  "https://picsum.photos/200/300?image=1050",
  "https://picsum.photos/200/300?image=1050",
  "https://picsum.photos/200/300?image=1050",
  "https://picsum.photos/300/300?image=206",
  "https://picsum.photos/300/300?image=206",
];

function Collage(props) {
  const [img, setTexto] = useState(images);

  return (
    <div className="collage-container">
      {img.map((image, i) => (
        <div className="collage-image-container" key={i}>
          <img className="image-item" key={i} src={image} alt="" />
        </div>
      ))}
    </div>
  );
}

Collage.propTypes = {};

export default Collage;
