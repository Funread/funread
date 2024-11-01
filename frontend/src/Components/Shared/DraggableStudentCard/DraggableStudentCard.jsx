import './DraggableStudentCard.sass'
import React from 'react'
import { useDrag } from 'react-dnd'


const DraggableStudentCard = ({ student, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'students',
    item: {
      student: student,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  
  const handleClick = () => {
    if (onClick) {
      onClick(student)
    }
  }

  return (
    <div
      ref={drag}
      onClick={handleClick}
      className={`card draggable-student-card ${
        isDragging ? 'isDraggingStyle' : ''
      } `}
    >
      <div className='justify-card-content'>
        
        <div className='draggable-student-details single-line-text'>
          <div>
            <span>{student.title}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraggableStudentCard
