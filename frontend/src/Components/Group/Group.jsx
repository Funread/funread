import './Group.sass'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import SidebarBook from '../Shared/SidebarBook/SidebarBook'
import ListGroups from '../Shared/ListGroups/ListGroups'
import StudentCard from '../Shared/StudentCard/StudentCard'
import GroupCardProgress from '../Shared/GroupCardProgress/GroupCardProgress'
import GroupBuilder from '../Shared/GroupBuilder/GroupBuilder'
import { ToastContainer } from 'react-toastify'
import GroupView from '../Shared/GroupView/GroupView'
import Classes from '../Shared/Classes/Classes'
import ClassBuilder from '../Shared/ClassBuilder/ClassBuilder'

const Group = () => {
  const [groups, setGroups] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [groupForm, setGroupForm] = useState(false)
  const [groupClasses, setGroupClasses] = useState(false)
  const [groupId, setGroupId] = useState(null)
  const [showClasses, setShowClasses] = useState(false)

  const showGroupResume = (group) => {
    if (!selectedGroup || selectedGroup.id !== group.id) {
      setSelectedGroup(group)
    } else {
      setSelectedGroup(null)
    }

    setGroupForm(false)
    setSelectedStudent(null)
    setGroupClasses(false)
  }

  const toggleSidebar = (student) => {
    if (selectedStudent && selectedStudent.userid === student.userid) {
      setSelectedStudent(null)
    } else {
      setSelectedStudent(student)
    }

    setGroupClasses(false)
    setGroupForm(false)
    setSelectedGroup(null)
  }

  const toggleGroupForm = () => {
    setGroupClasses(false)
    setSelectedStudent(null)
    setSelectedGroup(null)
    setGroupForm(!groupForm || selectedGroup || selectedStudent)
  }

  const toggleGroupClasses = () => {
    setGroupClasses(!groupClasses)
    setGroupForm(false)
    setSelectedStudent(null)
    setSelectedGroup(null)
  }

  const handleGroupCreated = (newGroup) => {
    setGroups([...groups, newGroup])
  }

  const handleClassesComponent = (id) => {
    setGroupId(id)
    setShowClasses(!showClasses)
  }

  return (
    <div className='container-fluid text-center group'>
      <div className='row' style={{ height: 'auto' }}>
        <div className='col-1 p-0'>
          <SidebarBook />
        </div>

        <div className='sidenav col-8'>
          <div style={{ maxWidth: '1100px' }} className='mx-auto content_group'>
            <Form className='d-flex mt-1 pt-3 '>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2 custom-input-search'
                aria-label='Search'
              />
              <Button className='button-search-library' variant='outline-success'>
                <FontAwesomeIcon className='fa-magnifying-glass' icon={faSearch} />
              </Button>
              <Button className='button-edit-library' variant='outline-success' onClick={toggleGroupForm}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </Form>
            <div className='mt-3 d-flex align-items-center justify-content-between'>
              <h4 className='custom-group-title'>My Groups</h4>
            </div>
            <ListGroups
              toggleSidebar={toggleSidebar}
              showGroupResume={showGroupResume}
              newGroups={groups}
              handleClassesComponent={handleClassesComponent}
            />
            {showClasses && <Classes toggleGroupClasses={toggleGroupClasses} />}

            <GroupCardProgress></GroupCardProgress>
            <br />
          </div>
        </div>

        <div className='col-3 mobile-below-tap-group'>
          <div className='position_side shadow rounded'>
            {selectedStudent && (
              <StudentCard
                idStudent={selectedStudent?.userid}
                name={selectedStudent?.name}
                lastname={selectedStudent?.lastname}
                idGroup={selectedStudent?.groupscreateid}
              />
            )}
            {groupForm && <GroupBuilder updateGroup={handleGroupCreated} />}
            {selectedGroup && (
              <GroupView
                id={selectedGroup?.id}
                name={selectedGroup?.name}
                idimage={selectedGroup?.idimage}
              />
            )}

            {groupClasses && <ClassBuilder groupId={groupId} />}
          </div>
        </div>
      </div>
      <ToastContainer position='top-right' />
    </div>
  )
}

export default Group
