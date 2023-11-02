import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ImageGallery from "./ListGallery";

function Gallery(props) {
  const [show, setShow] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Galeria
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Galeria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageGallery mediaType={"imagen"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Gallery;
