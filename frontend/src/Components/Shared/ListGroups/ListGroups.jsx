/* eslint-disable react-hooks/exhaustive-deps */
import './ListGroups.css'
import jwt_decode from 'jwt-decode'
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Col from 'react-bootstrap/Col'
import { ListGroup, Row, Tab, Badge } from 'react-bootstrap'
import { Select } from 'antd'
import { faTrash, faEye, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLogin } from '../../../hooks/useLogin'
import { useMemo } from 'react'
import { toast } from 'react-toastify'

const { Option } = Select

const initialState = {
  teacher: null,
}

const studentInitialState = {
  userid: null,
  isteacher: 0,
  createdby: null,
  groupscreateid: null,
}

const ListGroups = ({ toggleSidebar, showGroupResume, newGroups }) => {
  const [key, setKey] = useState('#1')
  const [teacher, setTeacher] = useState(initialState)
  const [groups, setGroups] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [student, setStudent] = useState(studentInitialState)
  const [students, setStudents] = useState([])
  const token = sessionStorage.getItem('jwt')
  const { axiosAuth } = useLogin()
  const axiosAuthFunction = useMemo(() => axiosAuth(), []) //Hace que axiosAuth sea una función memorizada

  //Obtener el id del usuario del storage
  useEffect(() => {
    // Decodifica el JWT cuando el componente se monta
    if (token) {
      const decodedToken = jwt_decode(token)
      const userId = decodedToken.user_id

      setTeacher({ teacher: userId })
      setStudent((prevData) => ({ ...prevData, createdby: userId }))
    }
  }, [token])

  //Listar los grupos
  useEffect(() => {
    async function fetchData() {
      const teacherId = teacher.teacher
      if (teacherId) {
        try {
          const axiosInstance = axiosAuthFunction
          const response = await axiosInstance.get(
            `GroupsCreate/listedCreateby/${teacherId}`
          )
          setGroups(response.data)
        } catch (error) {
          console.log('error', error)
        }
      }
    }

    fetchData()
  }, [axiosAuthFunction, teacher, newGroups])

  //Se obtienen todos los usuarios. Se debe cambiar por solo los usuarios estudiantes
  useEffect(() => {
    async function fetchData() {
      try {
        const axiosInstance = axiosAuthFunction
        const response = await axiosInstance.get('users/list/')
        setStudents(response.data)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [axiosAuthFunction])

  //Se obtienen los estudiantes de cada grupo
  useEffect(() => {
    async function fetchData() {
      try {
        const axiosInstance = axiosAuthFunction
        const response = await axiosInstance.get(
          'studentsgroups/studentsgroups/listAllStudentsGroups'
        )

        // Conjunto (set) de userIds
        const userIds = new Set(students.map((student) => student.userid))

        // Filtrar solo los estudiantes en grupos
        const studentsInGroup = response.data.filter((studentGroup) =>
          userIds.has(studentGroup.userid)
        )

        // Asignar el groupscreateid a los estudiantes correspondientes
        const studentsWithGroupsCreateId = studentsInGroup.map(
          (studentGroup) => ({
            ...students.find(
              (student) => student.userid === studentGroup.userid
            ),
            groupscreateid: studentGroup.groupscreateid,
          })
        )

        setSelectedStudents(studentsWithGroupsCreateId)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [axiosAuthFunction, students])

  //Añade estudiantes a los grupos
  const handleSelect = async (value, groupId) => {
    const selectedOption = students.find((student) => student.userid === value)

    if (
      !selectedStudents.some(
        (student) =>
          student.userid === selectedOption.userid &&
          student.groupscreateid === groupId
      )
    ) {
      const updatedSelectedOption = {
        ...selectedOption,
        groupscreateid: groupId,
      }

      const updatedStudent = {
        ...student,
        userid: selectedOption.userid,
        groupscreateid: groupId,
      }

      setStudent(updatedStudent)
      try {
        if (axiosAuth() !== null) {
          await axiosAuth().post(
            'studentsgroups/studentsgroups/insertnewStudentsGroups/',
            updatedStudent
          )
          setSelectedStudents([...selectedStudents, updatedSelectedOption])

          toast.success('Student was added successfully')
        }
      } catch (error) {
        toast.error(
          'Request Error: An error occurred while processing your request'
        )
      }
    }
  }

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
                <Tab.Pane eventKey={'#' + id} key={id}>
                  <Select
                    className='custom-group-view-select mt-3 mb-3'
                    placeholder='Select a student'
                    onSelect={(value) => handleSelect(value, id)}
                  >
                    {_.map(students, (student) => (
                      <Option key={student.userid} value={student.userid}>
                        {student.name + ' ' + student.lastname}
                      </Option>
                    ))}
                  </Select>
                  <ListGroup variant='flush' className='mt-1'>
                    {selectedStudents
                      .filter((student) => student.groupscreateid === id)
                      .map(({ userid, groupscreateid, name, lastname }) => (
                        <div key={userid}>
                          <ListGroup.Item
                            action
                            className='d-flex justify-content-between align-items-start'
                          >
                            {name + ' ' + lastname}
                            <Badge
                              bg='dark'
                              onClick={() =>
                                toggleSidebar({
                                  userid,
                                  groupscreateid,
                                  name,
                                  lastname,
                                })
                              }
                            >
                              <FontAwesomeIcon icon={faEye} size='xl' />
                            </Badge>
                          </ListGroup.Item>
                        </div>
                      ))}
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
