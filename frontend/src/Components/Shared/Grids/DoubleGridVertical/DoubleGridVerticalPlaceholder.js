import React, { useState } from 'react'
import Content from './DoubleGridVerticalContent'
import { useDrag } from 'react-dnd'

const widgetType = 'widgetType'

const DoubleGridVerticalPlaceHolder = (props) => {
  const [rowCount, setRowCount] = useState(2)
  const [userData, setUserData] = useState([])

  const changeHandler = (index, data) => {
    const updatedUserData = [...userData]
    updatedUserData[index] = data
    setUserData(updatedUserData)
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: widgetType, // identificador
    item: { type: 'DoubleGridVertical' },
    //La funcion collect es opcional
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), //Ayuda a saber si se está arrastrando o no
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        display: 'flex',
        flexDirection: 'row',
        border: isDragging ? '5px solid pink' : '0px',
      }}
    >
      <div style={{ flex: 1, margin: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[...Array(1)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {[...Array(2)].map((_, colIndex) => (
                <div key={colIndex} style={{}}>
                  <Content
                    change={(data) =>
                      changeHandler(rowIndex * 3 + colIndex, data)
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default DoubleGridVerticalPlaceHolder
