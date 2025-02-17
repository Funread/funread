import './StudentGroups.sass'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isMobile } from 'react-device-detect'
import _ from 'lodash'
import GroupsList from '../GroupsList/GroupsList'
import DraggableStudentCard from '../DraggableStudentCard/DraggableStudentCard'
import CustomMessage from '../CustomMessage/CustomMessage'
import { usersList, listedStudentGroups } from '../../../api'
import { ListGroup } from 'react-bootstrap'

const StudentGroups = ({ groupId, groudName, toggleStudentsGroup, newActivities }) => {
  const user = useSelector((state) => state.user)
  const backend = isMobile ? TouchBackend : HTML5Backend
  const [students, setStudents] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const studentList = await usersList()
        const listedStudentGroupsResponse = await listedStudentGroups()
        const students = studentList.data

        if (!studentList.data || !listedStudentGroupsResponse.data) return
        const studentsPerGroup = listedStudentGroupsResponse.data.filter(
          (student) => student.groupscreateid === groupId
        ).map(spg => spg.userid)
         
        setStudents(
          students.filter(s => !studentsPerGroup.includes(s.userid))

        )
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [user.userId, groupId])

  const RenderList = () => <GroupsList
      groupId={groupId}
      message={'Drop a student here'}
    />

  return (
    <DndProvider backend={backend}>
      <div className='container-fluid custom-groups'>
        <div className='groups-position'>
          <div className='card custom-groups-card'>
            <h5>Student list</h5>

            <hr className='mt-0' />
            <ListGroup as="ul" className='mt-1'>
            {students && students.length === 0 ? (
              <CustomMessage message={'There are no students registred'} />
            ) : (
              _.map(students, (student) => (
                <DraggableStudentCard key={student.studentId} student={student} />
              ))
            )}
            </ListGroup>
          </div>
          <div className='card custom-groups-card '>
            <div className='custom-justify-content '>
              <h5>Groups List {groudName}</h5>

            </div>
            <hr className='mt-0' />
            <ListGroup as="ul" className='mt-1'>
              <RenderList />
            </ListGroup>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default StudentGroups
