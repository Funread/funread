import './CreateBook.css'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Switch } from 'antd'
import BookImage from '../BookImage/BookImage'
import { useLogin } from '../../../hooks/useLogin'

const initialBookState = {
  title: '',
  category: 1,
  portrait: '',
  createdat: null,
  lastupdateat: null,
  state: 0,
  sharedbook: 0,
  createdby: 5,
  updatedby: 5,
}

const CreateBook = ({ show, onHide }) => {
  const [book, setBook] = useState(initialBookState)
  const { axiosAuth } = useLogin()

  const handleModalClose = () => {
    // Restablece los valores de book a su estado inicial cuando se cierra el modal.
    setBook(initialBookState)

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (axiosAuth() !== null) {
        const response = await axiosAuth().post('books/new-book/', book)
        if (response.status === 201) {
          // La creación del libro fue exitosa
          console.log('Libro creado exitosamente:', response.data)
        } else {
          // Maneja otros casos según sea necesario
          console.log('Error al crear el libro:', response.data)
        }
      } else {
        console.log('unAuthenticaded')
      }
    } catch (error) {
      // Maneja errores de la solicitud si ocurren
      console.error('Error en la solicitud a la API', error)
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
            <BookImage />
          </div>
          <div style={{ flex: 2, margin: '20px' }}>
            <div className='mb-3 custom-input'>
              <Form.Control
                className='custom-title'
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
    </Modal>
  )
}

export default CreateBook
