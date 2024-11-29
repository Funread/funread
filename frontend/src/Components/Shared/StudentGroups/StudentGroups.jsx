import './StudentGroups.sass';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import { ListGroup, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  usersList,
  listedStudentGroups,
  newStudentGroup,
  deleteStudentGroup,
} from '../../../api';

const StudentGroups = ({ groupId, groudName, toggleSidebar }) => {
  const backend = isMobile ? TouchBackend : HTML5Backend;
  const user = useSelector((state) => state.user);

  const [students, setStudents] = useState([]); // Todos los estudiantes no asignados
  const [groupStudents, setGroupStudents] = useState([]); // Estudiantes asignados al grupo

  // Cargar estudiantes al montar el componente
  useEffect(() => {
    if (groupId) {
      fetchStudents();
    }
  }, [groupId]);
  

  const fetchStudents = async () => {
    try {
      const studentList = await usersList();
      const studentGroupList = await listedStudentGroups();
      
  
      if (!studentList.data || !studentGroupList.data) return;
  
      // Filtrar estudiantes asignados al grupo actual
      const groupStudentIds = studentGroupList.data
        .filter((sg) => sg.groupscreateid === groupId)
        .map((sg) => ({
          userid: sg.userid,
          studentsgroupsid: sg.studentsgroupsid, // Agrega el ID único del estudiante-grupo
        }));
  
      // Asocia `studentsgroupsid` con los datos de los estudiantes en el grupo
      setGroupStudents(
        studentList.data
          .filter((student) => groupStudentIds.some((g) => g.userid === student.userid))
          .map((student) => ({
            ...student,
            studentsgroupsid: groupStudentIds.find((g) => g.userid === student.userid)
              ?.studentsgroupsid, // Asocia `studentsgroupsid`
          }))
      );
  
      // Filtrar estudiantes no asignados
      setStudents(
        studentList.data.filter((student) =>
          !groupStudentIds.some((g) => g.userid === student.userid)
        )
      );

    console.log('Student Group List:', studentGroupList.data); // Verifica la estructura
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load student data');
    }
  };
  
  

  // Agregar un estudiante al grupo
  const handleDropStudent = async (student) => {
    try {
      await newStudentGroup(student.userid, 0, user.userId, groupId);
      await fetchStudents(); // Recarga las listas
      toast.success(`${student.name} was added to the group`);
    } catch (error) {
      console.error('Error adding student to group:', error);
      toast.error('Failed to add student to group');
    }
  };
  

  // Eliminar un estudiante del grupo
  const handleRemoveStudent = async (student) => {
    try {
      if (!student.studentsgroupsid) {
        throw new Error('studentsgroupsid is missing!');
      }
  
      await deleteStudentGroup(student.studentsgroupsid); // Usa el ID correcto
      await fetchStudents(); // Recarga las listas
  
      toast.success(`${student.name} was removed from the group`);
    } catch (error) {
      console.error('Error removing student from group:', error);
      toast.error('Failed to remove student from group');
    }
  };
  

  // Draggable Student
  const DraggableStudent = ({ student }) => {
    const [{ isDragging }, dragRef] = useDrag({
      type: 'STUDENT',
      item: student,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <ListGroup.Item
        ref={dragRef}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="d-flex justify-content-between align-items-center"
      >
        {student.name}
      </ListGroup.Item>
    );
  };

  // Drop Zone for Group
  const GroupDropZone = () => {
    const [, dropRef] = useDrop({
      accept: 'STUDENT',
      drop: (item) => handleDropStudent(item),
    });

    return (
      <ListGroup
        ref={dropRef}
        as="ul"
        className="mt-1"
        style={{ minHeight: '200px', backgroundColor: '#f8f9fa', padding: '10px' }}
      >
        {groupStudents.length === 0 ? (
          <p>No students in this group</p>
        ) : (
          groupStudents.map((student) => (
            <ListGroup.Item
              key={student.userid}
              className="d-flex justify-content-between align-items-center"
            >
              {student.name}
              <div>
                <Badge
                  bg="dark"
                  onClick={() =>
                    toggleSidebar({
                      userid: student.userid,
                      groupscreateid: groupId,
                      name: student.name,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faEye} size="xl" />
                </Badge>

                <Badge
                  bg="dark"
                  className="mx-1"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Delete Student"
                  onClick={() => handleRemoveStudent(student)}
                >
                  <FontAwesomeIcon icon={faTrash} size="xl" />
                </Badge>
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    );
  };

  return (
    <DndProvider backend={backend}>
      <div className="container-fluid custom-groups">
        <div className="groups-position">
          {/* Lista de todos los estudiantes */}
          <div className="card custom-groups-card">
            <h5>Student List</h5>
            <hr className="mt-0" />
            <ListGroup as="ul" className="mt-1">
              {students.length === 0 ? (
                <p>No students available</p>
              ) : (
                students.map((student) => (
                  <DraggableStudent key={student.userId} student={student} />
                ))
              )}
            </ListGroup>
          </div>

          {/* Lista de estudiantes asignados al grupo */}
          <div className="card custom-groups-card">
            <h5>Groups List {groudName}</h5>
            <hr className="mt-0" />
            <GroupDropZone />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default StudentGroups;
