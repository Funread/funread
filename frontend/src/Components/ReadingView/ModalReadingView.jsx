import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import PageSelector from './PageSelector'

function ModalReadingView({ contentPage, onClose }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [show, setShow] = useState(true)

  const handleClose = () => {
    onClose()
    setShow(false)}
  const handleShow = () => setShow(true)

  console.log('contentPage', contentPage)

  return (
    <>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <PageSelector pageType={contentPage.type} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Back
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalReadingView
