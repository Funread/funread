import React, { useState } from 'react';

const ImagenGallery = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;
      setImages([...images, image]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Agregue una imagen</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      <div className="ImagenGallery_scrollable-container">
        <div className="ImagenGallery_gallery-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="ImagenGallery_image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagenGallery;


