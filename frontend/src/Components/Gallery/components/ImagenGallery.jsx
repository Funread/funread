import React, { useState } from 'react';

const ImageGallery = () => {
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
      <h1>Selecciona una imagen</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      <div className=' ImagenGallery_GalleryContainer'>
        {images.map((image, index) => (
          <div className=' ImagenGallery_Image'
            key={index}
            src={image}
            alt={`Image ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;


