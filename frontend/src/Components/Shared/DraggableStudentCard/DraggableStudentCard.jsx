import './DraggableStudentCard.sass'
import React from 'react'
import { useDrag } from 'react-dnd'
import { ListGroup } from 'react-bootstrap'


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
      className={`${isDragging ? 'isDraggingStyle' : ''}`}
    >
      <ListGroup.Item
        action
        eventKey={'#' + student.userid}
        as="li"
        className='d-flex justify-content-between align-items-start mb-1'>
      <div className='justify-card-content'>
        <div className='draggable-student-details single-line-text'>
          <div>
            <span>{student.name} {student.lastname}</span>
          </div>
        </div>
      </div>
      </ListGroup.Item>
    </div>
  )
}

export default DraggableStudentCard
