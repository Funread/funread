import './ListGroups.sass'
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import { ListGroup, Row, Tab, Badge } from 'react-bootstrap'
import { Select } from 'antd'
import { faTrash, faEye, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { listedCreatedBy, deleteGroup } from '../../../api/group'
import { listedStudents } from '../../../api/userroles'
import {
  newStudentGroup,
  listedStudentGroups,
  deleteStudentGroup,
  studentGroupSearch,
} from '../../../api/studentGroups'
import { toast } from 'react-toastify'
import CustomMessage from '../CustomMessage/CustomMessage'

const { Option } = Select

const studentInitialState = {
  userid: null,
  isteacher: 0,
  createdby: null,
  groupscreateid: null,
}

const ListGroups = ({
  toggleSidebar,
  showGroupResume,
  newGroups,
  handleClassesComponent,
}) => {
  const user = useSelector((state) => state.user)
  const [key, setKey] = useState('#1')
  const [groups, setGroups] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [student, setStudent] = useState(studentInitialState)
  const [students, setStudents] = useState([])

  useEffect(() => {
    setStudent((prevData) => ({ ...prevData, createdby: user.userId }))
  }, [user.userId])

  //Listar los grupos
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listedCreatedBy(user.userId)
        if (response.data !== 'Archivo no encontrado') {
          const activeGroups = response.data.filter(
            (group) => group.isactive === 1
          )
          setGroups(activeGroups)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
  }, [newGroups, user.userId])

  //Se obtienen todos los estudiantes.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listedStudents()
        setStudents(response.data)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [])

  //Se obtienen los estudiantes de cada grupo
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listedStudentGroups()

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
  }, [students])

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
      console.log(updatedStudent)
      try {
        await newStudentGroup(
          updatedStudent.userid,
          updatedStudent.isteacher,
          updatedStudent.createdby,
          updatedStudent.groupscreateid
        )

        setSelectedStudents([...selectedStudents, updatedSelectedOption])

        toast.success('Student was added successfully')
      } catch (error) {
        toast.error(
          'Request Error: An error occurred while processing your request'
        )
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteGroup(id)
      toast.success('Group was deleted successfully')
      const response = await listedCreatedBy(user.userId)
      const activeGroups = response.data.filter((group) => group.isactive === 1)
      setGroups(activeGroups)
    } catch (error) {
      toast.error(
        'Request Error: An error occurred while processing your request'
      )
    }
  }

  const handleStudentDelete = async (id, userid) => {
    try {
      const response = await studentGroupSearch(id)
      console.log(response.data)
      const studentId = response.data.find(
        (student) => student.userid === userid
      )
      await deleteStudentGroup(studentId.studentsgroupsid)
      toast.success('Student was deleted successfully')
      setSelectedStudents((prevStudents) =>
        prevStudents.filter(
          (student) =>
            !(student.userid === userid && student.groupscreateid === id)
        )
      )
    } catch (error) {
      toast.error(
        'Request Error: An error occurred while processing your request'
      )
    }
  }

  return (
    <>
      <Tab.Container
        id='list-group-tabs-example'
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        {groups.length === 0 ? (
          <CustomMessage message={'No groups have been created'} />
        ) : (
          <Row>
            <Col sm={6}>
              <span className='custom-list-group-span'>Groups List</span>
              <div className='custom-group-list-container'>
                <ListGroup as="ul" className='mt-1'>
                  {groups.map(({ id, name, idimage }) => (
                    <div key={id}>
                      <ListGroup.Item
                        action
                        eventKey={'#' + id}
                        as="li"
                        className='d-flex justify-content-between align-items-start mb-1'
                      >
                        <div
                          onClick={() => showGroupResume({ id, name, idimage })}
                        >
                          Name: {name}
                        </div>
                        <div>
                          <Badge
                            bg='dark'
                            data-toggle='tooltip'
                            data-placement='bottom'
                            title='Assign Task'
                            onClick={() => handleClassesComponent(id,name)}
                          >
                            <FontAwesomeIcon icon={faListCheck} size='xl' />
                          </Badge>
                          <Badge
                            bg='dark'
                            className='mx-1'
                            data-toggle='tooltip'
                            data-placement='bottom'
                            title='Delete Group'
                            onClick={() => handleDelete(id)}
                          >
                            <FontAwesomeIcon icon={faTrash} size='xl' />
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </Col>
            <Col sm={6}>
              <span className='custom-list-group-span'>Students List</span>
              <div className='custom-group-list-container'>
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
                                className='d-flex justify-content-between align-items-start  mb-1'
                              >
                                {name + ' ' + lastname}
                                <div>
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

                                  <Badge
                                    bg='dark'
                                    className='mx-1'
                                    data-toggle='tooltip'
                                    data-placement='bottom'
                                    title='Delete Student'
                                    onClick={() =>
                                      handleStudentDelete(id, userid)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faTrash} size='xl' />
                                  </Badge>
                                </div>
                              </ListGroup.Item>
                            </div>
                          ))}
                      </ListGroup>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </div>
            </Col>
          </Row>
        )}
      </Tab.Container>
    </>
  )
}

export default ListGroups
