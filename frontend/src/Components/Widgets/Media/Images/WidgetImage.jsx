import React, { useState } from "react";
import { Button, Modal, ModalFooter } from "react-bootstrap";
import "./WidgetImage.sass";
//import Gallery from "../../../GalleryCollage/Gallery";
import ImageGallery from "../../../GalleryCollage/ListGallery";
import { Content } from "antd/es/layout/layout";

function Widget() {
  const [showModal, setShowModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    "/imagenes/PruebaGalleria/imagen1.jpg"
  );

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleShowGallery = () => {
    setShowGallery(true);
  };
  const handleCloseGallery = () => {
    setShowGallery(false);
  };

  const handleImageChange = (newImage) => {
    setSelectedImage(newImage);
  };

  const handleSaveChanges = () => {
    console.log("Selected image saved:", selectedImage);
    setShowGallery(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Widget Images
      </Button>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Widget Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Content>
            <p>Aquí puedes agregar el contenido de tu modal.</p>
            <img
              src={selectedImage}
              alt="Descripción de la imagen"
              className="custum-imagePricipal-widget"
            />
          </Content>
          <Content className="contentTextSelectFoto">
            <p>Selecciona la imagen de encabezado</p>
            <Button
              className="custum-buttonSelectFoto-Widg"
              variant="secondary"
              onClick={handleShowGallery}
            >
              Seleccionar Foto
            </Button>
          </Content>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* Puedes agregar más botones o contenido aquí */}
        </Modal.Footer>
      </Modal>
      {showGallery && (
        <Modal
          show={handleShowGallery}
          onHide={handleCloseGallery}
          animation={false}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Galeria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ImageGallery
              mediaType="images"
              onImageSelect={handleImageChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseGallery}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Widget;
