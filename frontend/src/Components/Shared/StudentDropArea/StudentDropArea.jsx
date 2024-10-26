import './StudentDropArea.sass'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDrop } from 'react-dnd'
import DraggableStudentCard from '../DraggableStudentCard/DraggableStudentCard'
import CustomMessage from '../CustomMessage/CustomMessage'

const StudentDropArea = ({ activityId, droppedStudents, onDrop, message }) => {
  const navigate = useNavigate()
  const [, drop] = useDrop(() => ({
    accept: 'students',
    drop: (item) => {
      const droppedStudentIds = droppedStudents.map(
        (droppedStudent) => droppedStudent.studentid
      )

      // Verificar si el libro ya está en la lista antes de agregarlo
      if (!droppedStudentIds.includes(item.student.studentid)) {
        onDrop(item.student)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const handleStudentClick = (student) => {
    navigate(`/readingview/${student.studentid}`, {
      state: {
        data: student.studentid,
      },
    })
    
  }

  return (
    <div
      id={`dropArea-${activityId}`}
      ref={drop}
      className='card student-drop-area'
    >
      {droppedStudents.length === 0 ? (
        <CustomMessage message={message} />
      ) : (
        droppedStudents.map((student, index) => (
          <DraggableStudentCard
            key={index}
            student={student}
            onClick={(student) => handleStudentClick(student)}
          />
        ))
      )}
    </div>
  )
}

export default StudentDropArea
