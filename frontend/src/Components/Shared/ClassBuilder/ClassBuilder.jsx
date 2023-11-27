import './ClassBuilder.sass'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { DatePicker } from 'antd'
import { Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import { newClass } from '../../../api/classes'
import { ToastContainer, toast } from 'react-toastify'

const { RangePicker } = DatePicker

const classInitialState = {
  name: '',
  grade: '',
  teacherassigned: null,
  startdate: null,
  finishdate: null,
  groupscreateid: null,
  isactive: 1,
}

const ClassBuilder = ({ groupId, updateActivity }) => {
  const [activity, setActivity] = useState(classInitialState)
  const user = useSelector((state) => state.user)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setActivity({
      ...activity,
      [name]: value,
    })
  }

  const handleDateRangeChange = (dateStrings) => {
    const [startDate, finishDate] = dateStrings

    setActivity({
      ...activity,
      startdate: startDate,
      finishdate: finishDate,
      teacherassigned: user.userId,
      groupscreateid: groupId,
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()

    try {
      const response = await newClass(
        activity.name,
        activity.grade,
        activity.teacherassigned,
        activity.startdate,
        activity.finishdate,
        activity.groupscreateid,
        activity.isactive
      )
      toast.success('Class created successfully')
      updateActivity(response.data.data)
      setActivity(classInitialState)
    } catch (error) {
      toast.error(
        'Request Error: An error occurred while processing your request'
      )
    }
  }

  return (
    <Container className='custom-class-builder'>
      <Row>
        <Col>
          <ToastContainer position='top-right' />
          <h5 className='title'>New class</h5>
          <Form>
            <FormControl
              className='margin'
              type='text'
              name='name'
              placeholder='Name'
              value={activity.name}
              onChange={handleInputChange}
            />
            <FormControl
              className='margin'
              type='text'
              name='grade'
              placeholder='Grade'
              value={activity.grade}
              onChange={handleInputChange}
            />
            <RangePicker
              className='range-picker margin'
              showTime
              onChange={handleDateRangeChange}
            />
            <button
              className='custom-class-builder-button'
              onClick={handleSave}
            >
              Save
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ClassBuilder
