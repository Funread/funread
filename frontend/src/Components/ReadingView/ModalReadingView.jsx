import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Page from './Page';

function ModalReadingView() { 
  const [isModalOpen, setModalOpen] = useState(false);
  const [show, setShow] = useState(true);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <>
   

    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <div >
      <Page/> 
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Back
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  </> 
 
  );
}

export default ModalReadingView;
