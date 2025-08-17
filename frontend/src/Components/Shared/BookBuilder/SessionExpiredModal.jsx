import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function SessionExpiredModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Session Expired</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Sorry, your session has expired. Please log in again.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Go to Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
