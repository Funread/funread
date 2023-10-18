import React, { useState } from "react";
import Content from "./DoubleGridContent";

const DoubleGridHorizontalPlaceHolder = (props) => {
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
          {[...Array(2)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {[...Array(1)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    flex: 0,
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
      </div>
    </div>
  );
};
export default DoubleGridHorizontalPlaceHolder;
