import React, { useEffect, useState } from 'react'
import './MyClasses.sass'
import ClassesList from '../Shared/ClassesList/ClassesList'
import SidebarBook from '../Shared/SidebarBook/SidebarBook'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { listedStudentGroups } from '../../api'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import CustomMessage from '../Shared/CustomMessage/CustomMessage'

const MyClasses = () => {
  const user = useSelector((state) => state.user)
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(
    window.innerWidth >= 769
  )
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsGroups = await listedStudentGroups()
        const studentgroup = studentsGroups.data.filter(
          (student) => student.userid === user.userId
        )
        setGroups(studentgroup)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [user.userId])

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopOrLaptop(window.innerWidth >= 769)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container-fluid text-center group'>
        <div className='row' style={{ height: 'auto' }}>
          <div className='col-1 p-0'>
            <SidebarBook />
          </div>
          <div
            className={`col-${isDesktopOrLaptop ? '11' : '8'} my-classes-body`}
          >
<<<<<<< Updated upstream
            <h4 className='custom-title'>My Classes</h4>
=======
            <h4 className='custom-title'>My Classe</h4>

            {/* Icono para mostrar el perfil en la esquina superior derecha */}
            <div className="profile-icon">
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                onClick={() => setShowProfile(!showProfile)} // Cambia entre mostrar y ocultar el panel
                className="text-gray-600 hover:text-gray-900"
              />
            </div>

            {/* Mostrar el panel lateral cuando se haga clic en el ícono */}
            <div className={`profile-panel ${showProfile ? 'open' : ''}`}>

              {/* Contenido del perfil */}
              <KidsProfile closeProfile={() => setShowProfile(false)} />
              {/*<KidsProfile userId={userId}/> */}

            </div>

>>>>>>> Stashed changes
            <div className='card custom-classes-card'>
              {groups.length === 0 ? (
                <CustomMessage message={"You don't have assigned classes"} />
              ) : (
                _.map(groups, (group) => (
                  <ClassesList
                    key={group.studentsgroupsid}
                    groupId={group.groupscreateid}
                    message={'There are no books assigned for this class'}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default MyClasses
