import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 400px; 
  overflow-y: auto; 
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: 10px;
`;

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

      <GalleryContainer>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index}`}
          />
        ))}
      </GalleryContainer>
    </div>
  );
};

export default ImageGallery;


