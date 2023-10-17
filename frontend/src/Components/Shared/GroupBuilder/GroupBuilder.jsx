import './GroupBuilder.css'
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useLogin } from '../../../hooks/useLogin'

const initialState = {
  name: '',
  createdby: null,
  image: 'media/2.png',
}

const GroupBuilder = ({ updateGroup }) => {
  const [group, setGroup] = useState(initialState)
  const [isEmpty, setIsEmpty] = useState(false)
  const token = sessionStorage.getItem('jwt')
  const { axiosAuth } = useLogin()

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

    if (group.name.trim() === '') {
      setIsEmpty(true)
      return
    }

    try {
      if (axiosAuth() !== null) {
        const response = await axiosAuth().post(
          'GroupsCreate/new_group/',
          group
        )
        toast.success(`${response.data.name} was created successfully`)
        updateGroup(response.data)
      }
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
                Group name required
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
