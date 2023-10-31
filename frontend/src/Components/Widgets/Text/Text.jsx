import React, { useState } from 'react';
import { useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Text.sass';


const widgetType = 'widgetType';

const Box = ({ roleMipsun, onBoxTextChange }) => {
  const [text, setText] = useState(roleMipsun);

  const [{ isDragging }, drag] = useDrag({
    type: widgetType,
    item: { type: 'Text' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onBoxTextChange(newText);
  };

  return (
    <div ref={drag} className="divStyle"> 
      <textarea
        value={text}
        onChange={handleTextChange}
        className="inputStyle" 
      />
    </div>
  );
};

const Text = () => {
  const [boxText, setBoxText] = useState('Lorem Ipsum');

  const handleBoxTextChange = (text) => {
    setBoxText(text);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Box roleMipsun={boxText} onBoxTextChange={handleBoxTextChange} />
      </div>
    </DndProvider>
  );
};

export default Text;
