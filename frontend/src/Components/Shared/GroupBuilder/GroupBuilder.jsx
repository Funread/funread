import './GroupBuilder.css'
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { newGroup } from '../../../api/group'

const initialState = {
  name: '',
  createdby: null,
  image: '',
  isactive: true,
}

const GroupBuilder = ({ updateGroup }) => {
  const [group, setGroup] = useState(initialState)
  const [isEmpty, setIsEmpty] = useState(false)
  const token = sessionStorage.getItem('jwt')

  useEffect(() => {
    // Decodifica el JWT cuando el componente se monta
    if (token) {
      const decodedToken = jwt_decode(token)

      // Actualiza el estado del grupo con la información del JWT
      setGroup((prevData) => ({
        ...prevData,
        createdby: decodedToken.user_id,
      }))
    }
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setGroup({ ...group, [name]: value })
    if (value.trim() !== '') {
      setIsEmpty(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (group.name.trim() === '' || group.image.trim() === '') {
      setIsEmpty(true)
      return
    }

    try {
      const response = await newGroup(
        group.name,
        group.image,
        group.createdby,
        group.isactive
      )
      toast.success(`${response.data.name} was created successfully`)
      updateGroup(response.data)
      setGroup({ ...group, name: '', image: '' })
    } catch (error) {
      toast.error(
        'Request Error: An error occurred while processing your request'
      )
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h4 className='custom-group-builder-title'>Create New Group</h4>
          <Form onSubmit={handleSubmit}>
            <div className='book-image'>
              <img
                src={'/imagenes/no-image.png'}
                width={170}
                height={230}
                alt='group'
              />
            </div>
            <Form.Control
              className={`${isEmpty ? 'empty-input' : 'mb-3'}`}
              type='text'
              name='image'
              placeholder='Route Image: media/2.png'
              onChange={handleChange}
              value={group.image}
            />
            <Form.Control
              className={`${isEmpty ? 'empty-input' : 'mb-3'}`}
              type='text'
              name='name'
              placeholder='Group Name'
              onChange={handleChange}
              value={group.name}
            />
            {isEmpty && (
              <p className='custom-error-p-group-builder'>
                There are fields missing
              </p>
            )}
            <button className='custom-save-button' type='submit'>
              Save
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default GroupBuilder
