import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function AccessDeniedModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Access Denied</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Access denied, check if you have the permissions to enter in this page or if you are logged in.<br/><br/>(Protected routes require users with roles, currently only "profesor" role is allowed)</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Go to Landing Page
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
