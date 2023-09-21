import './CreateBook.css'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Switch, Alert } from 'antd'
import BookImage from '../BookImage/BookImage'
import { useLogin } from '../../../hooks/useLogin'
import jwt_decode from 'jwt-decode'

const initialBookState = {
  title: '',
  category: 0,
  portrait: '',
  createdat: null,
  lastupdateat: null,
  state: 0,
  sharedbook: 0,
  createdby: null,
  updatedby: null,
}

const CreateBook = ({ show, onHide }) => {
  const [book, setBook] = useState(initialBookState)
  const [image, setImage] = useState(null)
  const [fileImage, setFileImage] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertDescription, setAlertDescription] = useState('')
  const [alertType, setAlertType] = useState('success')
  const formatFileImage = new FormData()
  formatFileImage.append('image', fileImage)
  const { axiosAuth } = useLogin()

  const token = sessionStorage.getItem('jwt')

  useEffect(() => {
    // Decodifica el JWT cuando el componente se monta
    if (token) {
      const decodedToken = jwt_decode(token)

      // Actualiza el estado del libro con la información del JWT
      setBook((prevData) => ({
        ...prevData,
        createdby: decodedToken.user_id,
        updatedby: decodedToken.user_id,
      }))
    }
  }, [token])

  const handleModalClose = () => {
    // Restablece los valores de book a su estado inicial cuando se cierra el modal.
    setBook(initialBookState)
    setImage(null)
    setShowAlert(false)

    // Cierra el modal.
    onHide()
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    setBook((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleImageSelect = (selectedImage) => {
    setFileImage(selectedImage)
  }

  const showAlertMessage = (message, description, type) => {
    setAlertMessage(message)
    setAlertDescription(description)
    setAlertType(type)
    setShowAlert(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const uploadImage = async () => {
        //Paso 1: Guarda la imagen
        const response1 = await axiosAuth().post('Media/save/', formatFileImage)
        if (!response1.data || !response1.data.name) {
          throw new Error('Error al subir la imagen')
        }
        //Paso 2: Se obtiene la ruta de la imagen según el nombre
        const imageName = response1.data.name
        const response2 = await axiosAuth().post('Media/upload/', {
          name: imageName,
        })
        if (!response2.data || !response2.data.image_route) {
          throw new Error('Error en la carga de la imagen')
        }
        return response2.data.image_route
      }
      //Paso 3: Se asigna la ruta al portrait del book
      const imageRoute = await uploadImage()
      const newBook = { ...book, portrait: imageRoute }

      //Paso 4: Se publica el libro
      const response3 = await axiosAuth().post('books/new-book/', newBook)
      if (response3.data && response3.status === 201) {
        showAlertMessage('Success', 'Book created successfully!', 'success')
      } else {
        showAlertMessage('Error', 'Unable to save the book.', 'error')
      }
    } catch (error) {
      showAlertMessage(
        'Error',
        'Request Error: An error occurred while processing your request.',
        'error'
      )
    }
  }

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <form onSubmit={handleSubmit}>
        <Modal.Body
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ flex: 1 }}>
            <div className='form-container'>
              <BookImage onImageSelect={handleImageSelect} />
            </div>
          </div>
          <div style={{ flex: 2, margin: '20px' }}>
            <div className='mb-3 custom-input'>
              <Form.Control
                className='custom-form-title'
                type='text'
                placeholder='Name of the Book'
                name='title'
                value={book.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <Form.Control
                className='custom-textArea'
                as='textarea'
                placeholder='Description'
                rows={4}
                name='content'
                // value={book.content}
                onChange={handleInputChange}
              />
            </div>
            <div className='d-flex align-items-center justify-content-between'>
              <Form.Control
                className='custom-select'
                style={{ width: '100px' }}
                as='select'
                name='category'
                value={book.category}
                onChange={handleInputChange}
              >
                <option value=''>Class</option>
                <option value={1}>Fiction</option>
                <option value={2}>History</option>
                <option value={3}>Fantasy</option>
              </Form.Control>
              <div>
                <Switch
                  checked={book.sharedbook}
                  onChange={(checked) =>
                    setBook({ ...book, sharedbook: checked })
                  }
                  checkedChildren='Public'
                  unCheckedChildren='Private'
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' type='submit'>
            Save
          </Button>
          <Button variant='secondary' onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </form>
      {showAlert && (
        <Alert
          message={alertMessage}
          description={alertDescription}
          type={alertType}
          showIcon
          closable
          onClose={() => setShowAlert(false)} // Cerrar la alerta cuando se hace clic en la "X"
        />
      )}
    </Modal>
  )
}

export default CreateBook
