import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import './GalleryImage.css'
import { list, upload } from '../../api/media'

const ImageGallery = ({ onImageSelect }) => {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [galleriaType, setGalleryType] = useState([])
  const getImage = 'http://localhost:8000' // Ruta base de las imágenes
  const [selectedOption, setSelectedOption] = useState(0);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageClick = (image) => {
    if (selectedImage === image) {
      setSelectedImage(null) // Deselecciona la imagen si se hace clic nuevamente
    } else {
      setSelectedImage(image) // Selecciona la imagen al hacer clic
    }
  }

  useEffect(() => {

    if (selectedOption != 0) {
      const newGallery = images.filter((image) => image.galleryType == selectedOption)
      setGalleryType(newGallery)
    }
    else {
      setGalleryType(images)
    }
  }, [selectedOption])

  useEffect(() => {
    async function fetchData() {
      try {
        const imagesResponse = await list() // Utiliza la función list para obtener las imágenes.
        const imagesData = imagesResponse.data

        for (const image of imagesData) {
          const imageRoute = await upload(image.id) // Utiliza la función upload para cargar imágenes.
          image.file_route = imageRoute.data.file_route // se asigna la ruta de la imagen en Upload a la propiedad image_route de la imagen
        }
        setImages(imagesData)
        setGalleryType(imagesData)

      } catch (error) {
        console.error('Error al obtener las imágenes o cargarlas:', error)
      }
    }

    fetchData()
  }, [])

  return (

    <div>
      <Form className='d-flex flex-wrap justify-content-start'>
        {["All", 'User Custom', 'FunRead Gallery', 'Characters', 'Scenarios', 'Object'].map((label, index) => (
          <div key={`inline-radio-${index}`} className="mb-3">
            <Form.Check
              inline
              label={label}
              name="group1"
              type='radio'
              id={`inline-radio-${index}`}
              value={index}
              checked={selectedOption === index}
              onChange={handleRadioChange}
            />
          </div>
        ))}
      </Form>

      <div className='image-gallery'>
        {galleriaType.map((image, index) => (

          <img
            key={index}
            src={`${getImage}${image.file_route}`} // Utiliza la constante getImage
            alt={`Gallery ${index + 1}`}
            className={selectedImage === image ? 'selected' : ''}
            onClick={() => {
              handleImageClick(image)
              onImageSelect(image) // Llama a la función de devolución de llamada con la imagen seleccionada
            }}
          />

        ))}
      </div>
    </div>
  )
}

export default ImageGallery
