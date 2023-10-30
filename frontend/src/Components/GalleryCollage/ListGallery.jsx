import React, { useState } from "react";
import "./GalleryImage.css";

const ImageGallery = ({ mediaType, onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onImageSelect(image);
  };

  // Ruta a las imágenes y videos en la carpeta "public"
  const mediaList = [
    "/imagenes/quiz/background1.jpg",
    "/imagenes/PruebaGalleria/imagen1.jpg",
    "/imagenes/PruebaGalleria/imagen2.jpg",
    "/imagenes/PruebaGalleria/imagen3.jpg",
    "/imagenes/PruebaGalleria/imagen4.jpg",
    "/imagenes/PruebaGalleria/imagen5.jpg",
    "/imagenes/PruebaGalleria/imagen6.jpg",
    "/imagenes/PruebaGalleria/2mayo.mp4",
  ];

  const filteredMedia = mediaList.filter((media) =>
    mediaType === "images"
      ? media.endsWith(".jpg") ||
        media.endsWith(".png") ||
        media.endsWith(".gif")
      : mediaType === "videos"
      ? media.endsWith(".mp4") || media.endsWith(".avi")
      : false
  );

  return (
    <div>
      <div className="image-gallery">
        {filteredMedia.map((listPath, index) =>
          mediaType === "images" ? (
            <img
              key={index}
              src={process.env.PUBLIC_URL + listPath}
              alt={`Imagen ${index + 1}`}
              className={selectedImage === listPath ? "selected" : ""}
              onClick={() => handleImageClick(listPath)}
            />
          ) : mediaType === "videos" ? (
            <video
              key={index}
              src={process.env.PUBLIC_URL + listPath}
              autoPlay
              muted
              className={`ListVideo ${
                selectedImage === listPath ? "selected" : ""
              }`}
              onClick={() => handleImageClick(listPath)}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
