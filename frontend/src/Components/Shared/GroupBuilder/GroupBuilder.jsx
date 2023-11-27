import './GroupBuilder.css'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { newGroup } from '../../../api/group'
import { useSelector } from 'react-redux'

const initialState = {
  name: '',
  createdby: null,
  image: '',
  isactive: 1,
}

const GroupBuilder = ({ updateGroup }) => {
  const user = useSelector((state) => state.user)
  const [group, setGroup] = useState(initialState)
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    setGroup((prevData) => ({
      ...prevData,
      createdby: user.userId,
    }))
  }, [user.userId])

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
              placeholder='Id Image: 1'
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
