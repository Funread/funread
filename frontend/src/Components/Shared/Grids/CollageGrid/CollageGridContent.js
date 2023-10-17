import React, { useState } from "react";
import { ItemTypes } from "./ItemTypes";
import { useDrop } from "react-dnd";
import RGL, { WidthProvider } from "react-grid-layout";
//  import css -- IMP!!!
import "react-grid-layout/css/styles.css";

import "./CollageGridContent.css";

const ReactGridLayoutCollage = WidthProvider(RGL);

const Content = (props) => {
  const [row, setRow] = useState([]);

  const [layout, setLayout] = useState([{ i: "0", x: 0, y: 0, w: 2, h: 1 }]);

  const [resizeplotly, setResizePlotly] = useState(false);

  const onLayoutChange = () => {};

  const onResize = (layouts) => {};

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      const itemsInCurrentRow = layout.filter((item) => item.y === 0);

      if (itemsInCurrentRow.length < 24) {
        const nextX = itemsInCurrentRow.length;
        setRow((old) => {
          props.change([...old, { name: item.name, id: item.id }]);
          return [...old, { name: item.name, id: item.id }];
        });
        setLayout((oldLayout) => [
          ...oldLayout,
          {
            i: item.id,
            x: nextX,
            y: 0,
            w: 1,
            h: 1,
          },
        ]);
      } else {
        alert(
          "La fila está llena, no se pueden agregar más elementos horizontalmente."
        );
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div>
      <div ref={drop} style={{ height: "400" }}>
        <ReactGridLayoutCollage
          className="ReactGridLayoutCollage"
          compactType="horizontal"
          cols={6}
          layout={layout}
          onLayoutChange={onLayoutChange}
          draggableCancel=".MyDragCancel"
          isBounded={true}
        >
          {row.length !== 0 ? (
            row.map((ele, index) => {})
          ) : (
            <div style={{ height: "  200" }}></div>
          )}
        </ReactGridLayoutCollage>
      </div>
    </div>
  );
};

export default Content;
