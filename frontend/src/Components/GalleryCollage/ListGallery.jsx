import React, { useState, useEffect } from "react";
import "./GalleryImage.css";
import { list, upload } from "../../api/media";

const ImageGallery = ({ onImageSelect }) => {
  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  const getImage = "http://localhost:8000/Media/"; // Ruta base de las imágenes

  // const handleImageSelection = async (selectedImage) => {
  //   try {
  //     const uploadedImage = await upload(selectedImage.id); // Suponiendo que upload puede cargar una imagen
  //     onImageSelect(uploadedImage.data); // Pasa la imagen cargada a Widget
  //   } catch (error) {
  //     console.error("Error al cargar la imagen:", error);
  //   }
  // };

  const handleImageClick = (image) => {
    if (selectedImage === image) {
      setSelectedImage(null); // Deselecciona la imagen si se hace clic nuevamente
    } else {
      setSelectedImage(image); // Selecciona la imagen al hacer clic
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const imagesResponse = await list(); // Utiliza la función list para obtener las imágenes.

        console.log("Imágenes en la base de datos:", imagesResponse.data);

        const imagesData = imagesResponse.data;

        for (const image of imagesData) {
          const imageRoute = await upload(image.id); // Utiliza la función upload para cargar imágenes.
          console.log("Imagen cargada:", imageRoute.data);

          image.image_route = imageRoute.data.image_route; // se asigna la ruta de la imagen en Upload a la propiedad image_route de la imagen
        }

        setImages(imagesData);
      } catch (error) {
        console.error("Error al obtener las imágenes o cargarlas:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <img
          key={index}
          src={`${getImage}${image.image_route}`} // Utiliza la constante getImage
          alt={`Image ${index + 1}`}
          className={selectedImage === image ? "selected" : ""}
          onClick={() => {
            handleImageClick(image);
            onImageSelect(image); // Llama a la función de devolución de llamada con la imagen seleccionada
          }}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
