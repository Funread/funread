import './Group.sass'
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import SidebarBook from '../Shared/SidebarBook/SidebarBook'
import ListGroups from '../Shared/ListGroups/ListGroups'
import { Badge } from 'react-bootstrap'
import Classes from '../Shared/Classes/Classes'
import StudentGroups from '../Shared/StudentGroups/StudentGroups'
import { Tabs, Tab } from 'react-bootstrap'
import CustomMessage from '../Shared/CustomMessage/CustomMessage'

const Group = () => {
  const [groups, setGroups] = useState([])
  const [groupId, setGroupId] = useState(null)
  const [groupName, setGroupName] = useState(null)
  const [activities, setActivities] = useState([])
  const [key, setKey] = useState('group')
  const [showReturnButton, setShowReturnButton] = useState(false)
  const [activeComponent, setActiveComponent] = useState(null)

  const handleClassesComponent = (id, name) => {
    setGroupId(id)
    setGroupName(name)
    setActiveComponent('classes')
    setKey('classes')
  }

  const handleGroupsComponent = (id, name) => {
    setGroupId(id)
    setGroupName(name)
    setActiveComponent('studentsGroup')
    setKey('studentsGroup')
  }

  const handleReturn = () => {
    setActiveComponent(null)
    setShowReturnButton(false)
  }

  useEffect(() => {
    setShowReturnButton(!!activeComponent)
  }, [activeComponent])

  return (
    <div className='container-fluid text-center group'>
      <div className='row' style={{ height: 'auto' }}>
        <div className='col-1 p-0'>
          <SidebarBook />
        </div>

        <div className='sidenav col-8'>
          <div style={{ maxWidth: '1100px' }} className='mx-auto content_group'>
            <div className='mt-3 d-flex align-items-center justify-content-between'>
              <h4 className='custom-group-title'>My Groups</h4>
              <Button
                className='button-edit-library'
                variant='outline-success'
                style={{ marginLeft: '10px' }}
                data-toggle='tooltip'
                data-placement='bottom'
                title='New'
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </div>

            <Tabs
              className='section_group_Tap'
              id='controlled-tab'
              activeKey={key}
              onSelect={(k) => setKey(k)}
              fill
            >
              <Tab eventKey='group' title='My Groups' className='tab'>
                <div className='shadow p-3 bg-body rounded'>
                  <ListGroups
                    handleClassesComponent={handleClassesComponent}
                    handleGroupsComponent={handleGroupsComponent}
                    groups={groups}
                  />
                </div>
              </Tab>

              <Tab eventKey='classes' title='Classes' className='tab'>
                <div className='shadow p-3 bg-body rounded'>
                  {showReturnButton && <button onClick={handleReturn}>Return to Groups</button>}
                  {!activeComponent ? (
                    <div>
                      <Badge
                        bg='dark'
                        data-toggle='tooltip'
                        data-placement='bottom'
                        title='Assign Task'
                        onClick={() => handleClassesComponent(groupId, groupName)}
                      >
                        Assign Task
                      </Badge>
                    </div>
                  ) : (
                    <Classes
                      groupId={groupId}
                      groupName={groupName}
                      activities={activities}
                    />
                  )}
                </div>
              </Tab>

              <Tab eventKey='studentsGroup' title='Students Group' className='tab'>
                <div className='shadow p-3 bg-body rounded'>
                  {showReturnButton && <button onClick={handleReturn}>Return to Groups</button>}
                  {!activeComponent ? (
                    <div>
                      <Badge
                        bg='dark'
                        className='mx-1'
                        data-toggle='tooltip'
                        data-placement='bottom'
                        title='Add students'
                        onClick={() => handleGroupsComponent(groupId, groupName)}
                      >
                        Add students
                      </Badge>
                    </div>
                  ) : (
                    <StudentGroups
                      groupId={groupId}
                      groupName={groupName}
                    />
                  )}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Group
