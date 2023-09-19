import './CreateBook.css'
import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Switch } from 'antd'
import BookImage from '../BookImage/BookImage'

const CreateBook = ({ show, onHide, initialTitle, initialContent, onSave }) => {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [selectedOption, setSelectedOption] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    // Restablecer los valores cuando se abre el modal
    setTitle('')
    setContent('')
    setSelectedOption('')
    setIsChecked(false)
  }, [show, initialTitle, initialContent])

  const handleSave = () => {
    onSave(title, content, selectedOption, isChecked)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
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
          <div>
            <Form.Control
              className='custom-input'
              type='text'
              placeholder='Name of the Book'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Form.Control
              as='textarea'
              placeholder='Description'
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <Form.Control
              style={{ width: '100px' }}
              as='select'
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value=''>Class</option>
              <option value='fiction'>Fiction</option>
              <option value='non-fiction'>History</option>
              <option value='fantasy'>Fantasy</option>
            </Form.Control>
            <div>
              <Switch
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                value={isChecked}
                checkedChildren='Public'
                unCheckedChildren='Private'
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleSave}>
          Save
        </Button>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBook
