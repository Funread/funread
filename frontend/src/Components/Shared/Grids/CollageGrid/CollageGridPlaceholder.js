import React, { useState } from 'react'
import Content from './CollageGridContent'
import './CollageGridContent.css'
import { useDrag } from 'react-dnd'

const widgetType = 'widgetType'

const PlaceHolder = (props) => {
  const [rowCount, setRowCount] = useState(2)
  const [userData, setUserData] = useState({})
  const changeHandler = (index, data) => {
    setUserData({ ...userData, [index]: [...data] })
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: widgetType, // identificador
    item: { type: 'CollageGrid' },
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
        {
          // BIG GRID
        }
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '50px',
          }}
        >
          {[...Array(1)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {[...Array(1)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    flex: 1,
                  }}
                >
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

        {
          // SMALL GRIDS
        }

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[...Array(rowCount)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {[...Array(3)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    flex: 1,
                  }}
                >
                  <Content
                    change={(data) =>
                      changeHandler(rowIndex * 1 + colIndex, data)
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
export default PlaceHolder
