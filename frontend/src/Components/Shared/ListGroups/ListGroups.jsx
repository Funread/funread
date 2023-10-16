/* eslint-disable react-hooks/exhaustive-deps */
import './ListGroups.css'
import jwt_decode from 'jwt-decode'
import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import { ListGroup, Row, Tab, Badge } from 'react-bootstrap'
import { faTrash, faEye, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLogin } from '../../../hooks/useLogin'

const initialState = {
  teacher: null,
}

const STUDENTS = [
  {
    idStudent: 1,
    idGroup: 1,
    name: 'Maria Lopez',
    image:
      'https://i.pinimg.com/564x/97/91/d7/9791d7260dee3f14f37f1e2913e659bb.jpg',
    pendingTasks: 1,
    completeTasks: 2,
  },
  {
    idStudent: 2,
    idGroup: 1,
    name: 'Luci Lopez',
    image:
      'https://pm1.aminoapps.com/7897/f7d2518c3e2086cea33d6540c3ca8a2280591d65r1-736-1003v2_uhq.jpg',
    pendingTasks: 1,
    completeTasks: 2,
  },
  {
    idStudent: 3,
    idGroup: 2,
    name: 'Eduardo Lopez',
    pendingTasks: 1,
    image:
      'https://i.pinimg.com/564x/97/91/d7/9791d7260dee3f14f37f1e2913e659bb.jpg',
    completeTasks: 2,
  },
  {
    idStudent: 4,
    idGroup: 2,
    name: 'Carlos Mata',
    pendingTasks: 1,
    image:
      'https://i.pinimg.com/564x/97/91/d7/9791d7260dee3f14f37f1e2913e659bb.jpg',
    completeTasks: 2,
  },
  {
    idStudent: 5,
    idGroup: 3,
    name: 'Juan Vega',
    image:
      'https://i.pinimg.com/564x/97/91/d7/9791d7260dee3f14f37f1e2913e659bb.jpg',
    pendingTasks: 1,
    completeTasks: 2,
  },
  {
    idStudent: 6,
    idGroup: 3,
    name: 'Marcos Lopez',
    image:
      'https://i.pinimg.com/564x/97/91/d7/9791d7260dee3f14f37f1e2913e659bb.jpg',
    pendingTasks: 1,
    completeTasks: 2,
  },
]

const ListGroups = ({ toggleSidebar, showGroupResume }) => {
  const [key, setKey] = useState('#1')
  const [teacher, setTeacher] = useState(initialState)
  const [groups, setGroups] = useState([])
  const token = sessionStorage.getItem('jwt')
  const { axiosAuth } = useLogin()

  useEffect(() => {
    // Decodifica el JWT cuando el componente se monta
    if (token) {
      const decodedToken = jwt_decode(token)
      setTeacher({ teacher: decodedToken.user_id })
    }
  }, [token])

  useEffect(() => {
    async function fetchData() {
      const teacherId = teacher.teacher
      if (teacherId) {
        try {
          if (axiosAuth() !== null) {
            const response = await axiosAuth().get(
              `GroupsCreate/listedCreateby/${teacherId}`
            )
            setGroups(response.data)
          }
        } catch (error) {
          console.log('error', error)
        }
      }
    }

    fetchData()
  }, [teacher])

  // const getStudentsByGroupId = async ({id}) => {
  //   try {
  //     if (axiosAuth() !== null) {
  //       const response = await axiosAuth().get(
  //         `GroupsCreate/listedCreateby/${teacherId}`
  //       )
  //       setGroups(response.data)
  //     }
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  return (
    <>
      <Tab.Container
        id='list-group-tabs-example'
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Row>
          <Col sm={6}>
            <span className='custom-list-group-span'>Groups List</span>
            <ListGroup variant='flush' className='mt-1'>
              {groups.map(({ id, name, idimage }) => (
                <div key={id}>
                  <ListGroup.Item
                    action
                    eventKey={'#' + id}
                    className='d-flex justify-content-between align-items-start'
                    onClick={() => showGroupResume({ id, name, idimage })}
                  >
                    Name: {name}
                    <div>
                      <Badge
                        bg='dark'
                        data-toggle='tooltip'
                        data-placement='bottom'
                        title='Assign Task'
                      >
                        <FontAwesomeIcon icon={faListCheck} size='xl' />
                      </Badge>
                      <Badge
                        bg='dark'
                        className='mx-1'
                        data-toggle='tooltip'
                        data-placement='bottom'
                        title='Delete Group'
                      >
                        <FontAwesomeIcon icon={faTrash} size='xl' />
                      </Badge>
                    </div>
                  </ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </Col>
          <Col sm={6}>
            <span className='custom-list-group-span'>Students List</span>
            <Tab.Content>
              {groups.map(({ id }) => (
                <Tab.Pane eventKey={'#' + id}>
                  <ListGroup variant='flush' className='mt-1'>
                    {STUDENTS.filter((student) => student.idGroup === id).map(
                      ({
                        idStudent,
                        idGroup,
                        image,
                        name,
                        pendingTasks,
                        completeTasks,
                      }) => (
                        <div key={idStudent}>
                          <ListGroup.Item
                            action
                            className='d-flex justify-content-between align-items-start'
                          >
                            {name}
                            <Badge
                              bg='dark'
                              onClick={() =>
                                toggleSidebar({
                                  idStudent,
                                  idGroup,
                                  image,
                                  name,
                                  pendingTasks,
                                  completeTasks,
                                })
                              }
                            >
                              <FontAwesomeIcon icon={faEye} size='xl' />
                            </Badge>
                          </ListGroup.Item>
                        </div>
                      )
                    )}
                  </ListGroup>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default ListGroups
