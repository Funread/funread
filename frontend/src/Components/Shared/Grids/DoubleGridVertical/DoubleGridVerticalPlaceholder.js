import React, { useState } from 'react'
import Content from './DoubleGridVerticalContent'




  
const DoubleGridVerticalPlaceholder = (props) => {
    const [rowCount, setRowCount] = useState(2); 
    const [userData, setUserData] = useState([]);
  
    const changeHandler = (index, data) => {
      const updatedUserData = [...userData];
      updatedUserData[index] = data;
      setUserData(updatedUserData);
    };
  
 
  
  
    return (
 
        <div style={{ display: "flex", flexDirection: "row" }}>
        
          <div style={{ flex: 1, margin: 10 }}>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[...Array(1)].map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    
                    display: "flex",
                    flexDirection: "row", 
                  }}
                >
                  {[...Array(2)].map((_, colIndex) => (
                    <div
                      key={colIndex}
                      style={{
                        
                      }}
                    >
                      <Content change={(data) => changeHandler(rowIndex * 3 + colIndex, data)} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
     
    );
  
};
  export default DoubleGridVerticalPlaceholder; 