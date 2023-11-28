import React, { useEffect, useState } from 'react'
import { Button, Modal, FormControl } from 'react-bootstrap'
import './WidgetImage.sass'
import ImageGallery from '../../../GalleryCollage/ListGallery'
import { Content } from 'antd/es/layout/layout'
import { save_Image } from '../../../../api/media'

const getImage = 'http://localhost:8000'

const WidgetImage = ({ onWidgetChange, updateWidgetDropData }) => {
  const [showModal, setShowModal] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState()

  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleShowGallery = () => {
    setShowGallery(true)
  }
  const handleCloseGallery = () => {
    setShowGallery(false)
  }

  const handleImageSelect = (selectedImage) => {
    setSelectedImage(selectedImage) // Actualiza el estado de la imagen seleccionada
  }

  const handleSaveChanges = () => {
    console.log('Imagen seleccionada handleSave:', selectedImage)

    setShowGallery(false)
    onWidgetChange({ type: 'WidgetImage', data: selectedImage.file_route })
    updateWidgetDropData(selectedImage)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    updateWidgetDropData(file)
  }

  const SaveChangesBD = async () => {
    try {
      if (selectedFile) {
        const response = await save_Image(selectedFile)
        console.log(
          'Imagen enviada exitosamente a la base de datos:',
          response.data
        )
      } else {
        console.error('No se ha seleccionado un archivo de imagen.')
      }
    } catch (error) {
      console.error('Error al guardar la imagen:', error)
    }
    setShowGallery(false)
  }

  return (
    <div className='back-principal-ejemplo'>
      <div>
        <br />
        <Content>
          {selectedImage ? (
            <div className='image-container'>
              {/* {console.log('Imagen seleccionada:', selectedImage)} */}
              <img
                src={`${getImage}${selectedImage.file_route}`}
                alt='Descripción de la imagen de la galería'
                className='custom-imagePrincipal-widgetImage'
                //onClick={() => setSelectedImage(null)}
              />
            </div>
          ) : selectedFile ? (
            <div>
              {/* {console.log('Imagen seleccionada:', selectedFile)} */}
              <img
                src={URL.createObjectURL(selectedFile)}
                alt='Descripción de la imagen del archivo'
                className='custom-imagePrincipal-widgetFile'
                //onClick={() => setSelectedFile(null)}
              />
            </div>
          ) : (
            <div className='no-image-selected-custum'></div>
          )}
        </Content>
      </div>
      <br />
      <Button variant='primary' onClick={handleShow}>
        Widget Images
      </Button>
      {/* <Button variant="primary" onClick={handleShow}>
        Widget Images
      </Button> */}

      <Modal show={showModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Widget Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Content>
            {selectedImage ? (
              <div className='image-container'>
                {/* {console.log('Imagen seleccionada:', selectedImage)} */}
                <img
                  src={`${getImage}${selectedImage.file_route}`}
                  alt='Descripción de la imagen de la galería'
                  className='custom-imagePrincipal-widgetImage'
                  //onClick={() => setSelectedImage(null)}
                />
              </div>
            ) : selectedFile ? (
              <div>
                {/* {console.log('Imagen seleccionada:', selectedFile)} */}
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt='Descripción de la imagen del archivo'
                  className='custom-imagePrincipal-widgetFile'
                  //onClick={() => setSelectedFile(null)}
                />
              </div>
            ) : (
              <div className='no-image-selected-custum'></div>
            )}
          </Content>

          <Content className='contentTextSelectFoto'>
            <p>Selecciona la imagen de encabezado desde tu galeria</p>
            <Button
              className='custum-buttonSelectFoto-Widg'
              variant='primary'
              onClick={handleShowGallery}
            >
              Gallery
            </Button>
          </Content>
          <FormControl
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='custum-formControl-image mt-4'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='success' onClick={SaveChangesBD}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {showGallery && (
        <Modal
          show={handleShow}
          onHide={handleCloseGallery}
          animation={false}
          size='xl'
          className='bg bg-dark'
        >
          <Modal.Header closeButton>
            <Modal.Title>Galeria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ImageGallery onImageSelect={handleImageSelect} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseGallery}>
              Close
            </Button>
            <Button variant='primary' onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default WidgetImage
