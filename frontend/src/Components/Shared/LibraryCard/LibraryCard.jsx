import { useState } from 'react';
import './LibraryCard.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MyBooks from '../../MyBooks/MyBooks';

const Library = ({title,description,portrait}) =>{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className='my-4 mx-3' style={{ width: '13rem', height: '13rem', background: 'beige' }}>
        <Card.Body>
        <Card.Img variant="top" src={portrait} style={{ width: '10rem', height: '7rem' }}/>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.Body>
        <Button variant="dark" onClick={handleShow}>See Library</Button>

      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <MyBooks></MyBooks>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Add My Library
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}
export default Library;