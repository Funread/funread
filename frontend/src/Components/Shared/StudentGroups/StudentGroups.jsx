import './StudentGroups.sass'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isMobile } from 'react-device-detect'
import _ from 'lodash'
import GroupsList from '../GroupsList/GroupsList'
import DraggableStudentCard from '../DraggableStudentCard/DraggableStudentCard'
import CustomMessage from '../CustomMessage/CustomMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { usersList } from '../../../api'
import ListGroups from '../ListGroups/ListGroups'

const StudentGroups = ({ groupId, groudName, toggleStudentsGroup, newActivities }) => {
  const user = useSelector((state) => state.user)
  const backend = isMobile ? TouchBackend : HTML5Backend
  const [students, setStudents] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const studentList = await usersList()
        const students = studentList.data
         
        setStudents(students)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [user.userId])

  return (
    <DndProvider backend={backend}>
      <div className='container-fluid custom-groups'>
        <div className='groups-position '>
          <div className='card custom-groups-card'>
            <h5>Student list</h5>

            <hr className='mt-0' />
            {students && students.length === 0 ? (
              <CustomMessage message={'There are no students registred'} />
            ) : (
              _.map(students, (student) => (
                <DraggableStudentCard key={student.studentId} student={student} />
              ))
            )}
          </div>
          <div className='card custom-groups-card '>
            <div className='custom-justify-content '>
              <h5>Groups List {groudName}</h5>

            </div>
            <hr className='mt-0' />
            {/* <GroupsList
              groupId={groupId}
              newActivities={newActivities}
              message={'Drop a student here'}
            /> */}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default StudentGroups
