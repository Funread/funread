import React, { useState } from "react";
import "./Collage.css";

const images = [
  "https://picsum.photos/300/300?image=20",
  "https://picsum.photos/300/300?image=25",
  "https://picsum.photos/300/300?image=45",
  "https://picsum.photos/300/300?image=18",
  "https://picsum.photos/300/300?image=78",
  "https://picsum.photos/300/300?image=500",
  "https://picsum.photos/200/300?image=320",
  "https://picsum.photos/200/300?image=29",
  "https://picsum.photos/200/300?image=32",
  "https://picsum.photos/300/300?image=16",
  "https://picsum.photos/300/300?image=206",
  "https://picsum.photos/300/300?image=278",
  "https://picsum.photos/300/300?image=200",
];

function Collage(props) {
  const [img, setCollage] = useState(images);

  return (
    <div className="collage-container">
      {img.map((image, i) => (
        <img className="image-item" key={i} src={image} alt="" />
      ))}
    </div>
  );
}

Collage.propTypes = {};

export default Collage;
